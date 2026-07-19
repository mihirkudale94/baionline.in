from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import urllib.request
import urllib.parse
import json
from data.content import LEADERSHIP, STATS, CENTRES_DATA

router = APIRouter(prefix="/api", tags=["chat"])

class ChatMessage(BaseModel):
    message: str


def clean_chat_reply(reply: str) -> str:
    """Keep chatbot output readable in the plain-text frontend bubble."""
    return reply.replace("**", "")

"""
================================================================================
SUPABASE PGVECTOR DATABASE SET UP (FOR PRODUCTION / BIGROCK DEPLOYMENT)
================================================================================
Execute the following SQL queries inside your Supabase SQL Editor:

-- 1. Enable the pgvector extension to store vector embeddings
create extension if not exists vector;

-- 2. Create the documents table
create table if not exists documents (
  id bigserial primary key,
  content text not null,               -- Text chunk content
  metadata jsonb,                     -- File metadata (e.g. source, page)
  embedding vector(1536)              -- Vector embedding (match text-embedding-3-small or text-embedding-004)
);

-- 3. Create a Remote Procedure Call (RPC) database function for similarity search
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by documents.embedding <=> query_embedding
  limit match_count;
end;
$$;
================================================================================
"""

def get_embedding(text: str) -> list:
    """
    Generate a 1536-dimensional vector embedding for the query string.
    Supports Google Gemini (text-embedding-004) and OpenAI (text-embedding-3-small)
    endpoints dynamically depending on the API keys configured in .env.
    """
    openai_key = os.environ.get("OPENAI_API_KEY", "").strip()
    gemini_key = os.environ.get("GEMINI_API_KEY", "").strip()

    # 1. Fallback to OpenAI Embedding API if key is present
    if openai_key:
        try:
            url = "https://api.openai.com/v1/embeddings"
            headers = {
                "Authorization": f"Bearer {openai_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "input": text,
                "model": "text-embedding-3-small"
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                res = json.loads(response.read().decode("utf-8"))
                return res["data"][0]["embedding"]
        except Exception:
            pass

    # 2. Default to Google Gemini Embedding API
    if gemini_key:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={gemini_key}"
            headers = {"Content-Type": "application/json"}
            payload = {
                "model": "models/text-embedding-004",
                "content": {"parts": [{"text": text}]}
            }
            req = urllib.request.Request(
                url,
                data=json.dumps(payload).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                res = json.loads(response.read().decode("utf-8"))
                embedding_values = res["embedding"]["values"]
                
                # text-embedding-004 defaults to 768 dimensions. 
                # If your Supabase pgvector column is set to 1536 (standard), pad with zeros.
                if len(embedding_values) == 768:
                    embedding_values += [0.0] * 768
                return embedding_values
        except Exception:
            pass

    return None

def query_supabase_vectors(embedding: list) -> str:
    """
    Perform a Remote Procedure Call (RPC) semantic search vector lookup
    against the pgvector table in Supabase via serverless POST REST API.
    """
    sb_url = os.environ.get("SUPABASE_URL", "").strip()
    sb_key = os.environ.get("SUPABASE_KEY", "").strip()
    if not sb_url or not sb_key or not embedding:
        return None

    try:
        url = f"{sb_url}/rest/v1/rpc/match_documents"
        headers = {
            "apikey": sb_key,
            "Authorization": f"Bearer {sb_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        payload = {
            "query_embedding": embedding,
            "match_threshold": 0.35, # Cosine similarity threshold
            "match_count": 4
        }
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST"
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            documents = json.loads(response.read().decode("utf-8"))
            chunks = [doc.get("content", "") for doc in documents if doc.get("content")]
            if chunks:
                return "\n\n".join(chunks)
    except Exception:
        pass

    return None

def get_local_context(query: str) -> str:
    """
    Local keyword RAG context retriever. Searches static data in content.py 
    to retrieve relevant builders association details.
    """
    q = query.lower()
    context_parts = []
    
    # 1. Check foundation / history
    if "founded" in q or "history" in q or "1941" in q or "start" in q or "jackson" in q or "how old" in q:
        context_parts.append(
            "BAI was founded in 1941 under the guidance of Brig. C.V.S. Jackson of Military Engineering Services, Pune. "
            "It started with 250 members and 3 Centres. The office was constructured and named 'Jackson Hut', which stands today as a monument in Pune."
        )
    
    # 2. Check President / Leadership
    if "president" in q or "tyagi" in q or "who is leading" in q or "ravindra" in q or "leader" in q:
        pres = LEADERSHIP.get("president", {})
        context_parts.append(
            f"The President of BAI for 2026-27 is {pres.get('name', 'Shri Ravindra Tyagi')}. "
            "He welcomes all builders and developers. The Immediate Past President is Dr. Dharmesh Awasthi."
        )
        
    # 3. Check stats
    if "member" in q or "how many" in q or "count" in q or "statistics" in q:
      context_parts.append(
          f"BAI has more than {STATS[5]['count']} members (over 25,000 direct corporate members and 2 Lakh+ indirect members). "
          f"It has {STATS[2]['count']} Vice Presidents and {STATS[3]['count']} State Chairmen representing regional state boards."
      )
        
    # 4. Check centres
    if "centre" in q or "office" in q or "where is" in q or "location" in q or "zone" in q or "region" in q:
        context_parts.append(
            "BAI has 264+ city centres organized into 5 major zones across India: "
            "Northern Region (Delhi, Rajasthan, Haryana), Western Region (Mumbai, Pune, Gujarat), "
            "Southern Region I & II (Andhra Pradesh, Karnataka, Kerala, Tamil Nadu, Telangana), and Eastern Region (West Bengal, Jharkhand)."
        )
        
    # 5. Check publications / ICJ
    if "publication" in q or "journal" in q or "magazine" in q or "icj" in q or "construction book" in q:
        context_parts.append(
            "BAI publishes the official monthly journal 'Indian Construction' featuring cost indices, steel prices, cement price trends, "
            "and legal circular updates. Users can subscribe to print or digital versions on the Publications subpage."
        )

    # 6. Check machinery / renting / wheeling / dealing
    if "machinery" in q or "rent" in q or "jcb" in q or "equipment" in q or "wheeling" in q or "excavator" in q:
        context_parts.append(
            "BAI hosts a 'Wheeling & Dealing' machinery exchange directory where members can search for loaders, concrete pumps, "
            "cranes, and excavators, or post their own rental requirements using the member list posting forms."
        )
        
    # Default fallback context
    if not context_parts:
        context_parts.append(
            "Builders Association of India (BAI) is the apex national body of civil engineering construction companies and real estate developers, founded in 1941."
        )
        
    return " ".join(context_parts)

def generate_local_response(query: str, context: str) -> str:
    """
    Fallback high-fidelity mock LLM response generator simulating 
    Generative AI responses based on matching context.
    """
    q = query.lower()
    
    if "founded" in q or "history" in q or "1941" in q or "start" in q or "jackson" in q:
        return (
            "🏗️ **BAI History & Foundation**\n\n"
            "Builders Association of India was founded in **1941** in Pune, under the guidance of Brig. C.V.S. Jackson of the Military Engineering Services (MES). "
            "It initially began with 250 members across 3 regional centers to coordinate builder grievances. Today, its headquarters are in Mumbai, but the original "
            "'Jackson Hut' office stands in Pune as a historical monument."
        )
    elif "president" in q or "tyagi" in q or "ravindra" in q:
        return (
            "👤 **BAI Leadership Bearers**\n\n"
            "The current President of the Builders Association of India for the **2026-27 session** is **Shri Ravindra Tyagi**. "
            "Under his presidency, BAI focuses on negotiating fairer arbitration clauses, standardizing tender contracts, and expanding city center boundaries. "
            "You can contact the governing council bearing list on our **Governing Council** page."
        )
    elif "member" in q or "join" in q or "register" in q:
        return (
            "✍️ **Membership Enrollment & Stats**\n\n"
            "BAI represents over **25,000+ direct corporate members** (construction companies, developers, contractors) and **2 Lakh+ indirect members** across India. "
            "To register, you can go to our **About Page** and fill out the *Membership Enrollment Inquiry Form* directly to trigger coordination from local secretaries."
        )
    elif "centre" in q or "office" in q or "location" in q or "where is" in q:
        return (
            "📍 **Regional Offices & Centres Directory**\n\n"
            "BAI operates through more than **264+ city centres** across India. These are divided into:\n"
            "*   **Northern Region:** Delhi, Ghaziabad, Jaipur, Haryana.\n"
            "*   **Western Region:** Mumbai, Pune, Ahmedabad, Baroda.\n"
            "*   **Southern Region I & II:** Bangalore, Chennai, Hyderabad, Calicut.\n"
            "*   **Eastern Region:** Jamshedpur, Ranchi, Kolkata.\n\n"
            "You can view center lists and look up contact details on our **Centres page**!"
        )
    elif "machinery" in q or "rent" in q or "jcb" in q or "equipment" in q or "wheeling" in q:
        return (
            "🚜 **Machinery Exchange (Wheeling & Dealing)**\n\n"
            "Through our **Wheeling & Dealing** portal, BAI members can rent, hire, or list heavy machinery like JCB loaders, concrete pumps, road rollers, and excavators. "
            "Simply navigate to the *Wheeling & Dealing* tab in the header menu to browse the active rental catalog or post your own equipment listing."
        )
    elif "publication" in q or "journal" in q or "icj" in q or "magazine" in q:
        return (
            "📖 **Indian Construction Journal (ICJ)**\n\n"
            "BAI publishes the official monthly journal **'Indian Construction'**, which covers builders' cost indices, current cement/steel pricing trends, "
            "government contract updates, and technical civil engineering papers. You can download recent month issues (PDF) or fill out the print subscription card on our **Publications page**."
        )
    
    return (
        "👋 **Welcome to BAI AI Assistant!**\n\n"
        "I can assist you with:\n"
        "*   **BAI History:** Ask about our 1941 foundation by Brig. C.V.S. Jackson.\n"
        "*   **Leadership:** Ask who is the current President (Shri Ravindra Tyagi).\n"
        "*   **Centres:** Inquire about local centers and regional office addresses.\n"
        "*   **Machinery exchange:** Inquire about renting loaders and cranes on our *Wheeling & Dealing* board.\n"
        "*   **Publications:** Get monthly Indian Construction cost indices and subscription guidelines.\n\n"
        "How can I help you build today?"
    )

@router.post("/chat")
def handle_chat_query(payload: ChatMessage):
    user_query = payload.message.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Empty query message")

    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    openrouter_model = os.environ.get("OPENROUTER_MODEL", "openrouter/free").strip() or "openrouter/free"
    
    # 1. Retrieve RAG context: Try Supabase vector matching first
    context = None
    embedding = get_embedding(user_query)
    if embedding:
        context = query_supabase_vectors(embedding)
        
    # 2. Fall back to local keyword matcher if Supabase returns nothing or is not configured
    if not context:
        context = get_local_context(user_query)
        source_label = "Supabase Vector (Fallback to Local)" if embedding else "Local Keyword RAG"
    else:
        source_label = "Supabase Vector pgvector RAG"

    # 3. If OpenRouter API key is configured, perform real Generative RAG call
    if api_key:
        try:
            url = "https://openrouter.ai/api/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://baionline.in",
                "X-Title": "BAI AI Portal"
            }
            
            system_prompt = (
                "You are an AI assistant for the Builders Association of India (BAI), an apex national body "
                "representing 25,000+ construction companies founded in 1941. Use the following context to answer "
                "the user's question. If the information is not in the context, use your general knowledge but mention "
                "that it is standard industry practice. Be polite, concise, and respond in plain text. "
                "Do not use markdown bold markers or asterisks for emphasis.\n\n"
                f"Context: {context}"
            )
            
            data = {
                "model": openrouter_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_query}
                ]
            }
            
            req = urllib.request.Request(
                url, 
                data=json.dumps(data).encode("utf-8"), 
                headers=headers,
                method="POST"
            )
            
            with urllib.request.urlopen(req, timeout=8) as response:
                res_data = json.loads(response.read().decode("utf-8"))
                reply = clean_chat_reply(res_data['choices'][0]['message']['content'])
                return {"reply": reply, "source": f"OpenRouter LLM + {source_label}"}
                
        except Exception as e:
            # Fallback to local matcher on connection/API timeouts
            local_reply = clean_chat_reply(generate_local_response(user_query, context))
            return {"reply": f"{local_reply}\n\n*(Note: OpenRouter API timeout, showing localized RAG answer)*", "source": f"Local RAG (Failover from {source_label})"}

    # 4. Fallback to high-fidelity local RAG matcher
    local_reply = clean_chat_reply(generate_local_response(user_query, context))
    return {"reply": local_reply, "source": "Local RAG"}
