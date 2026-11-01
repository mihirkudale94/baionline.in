import React, { useState } from "react";
import { baiServicesData, heroSlides, submitForm } from "../services/api";
import HeroCarousel from "../components/HeroCarousel";
import "./Services.css";

/*
  Laid out the way baionline.in/services is: the banner carousel across the
  top, the page title in the coloured band under it, then a single white card
  holding the intro line, the eight numbered write-ups and the inquiry form.
*/
const Services = () => {
  const { title, intro, items, inquiry } = baiServicesData;

  const blankForm = Object.fromEntries(inquiry.fields.map((f) => [f.name, ""]));
  const [form, setForm] = useState(blankForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    submitForm("service_providers_inquiry", form)
      .then(() => {
        setSent(true);
        setForm(blankForm);
      })
      .catch(() =>
        setError("Something went wrong sending your request. Please try again.")
      )
      .finally(() => setSending(false));
  };

  return (
    <div className="services-page-wrapper">
      {/* The photographs are shown clean; the title reads in the band below. */}
      <HeroCarousel slides={heroSlides} />

      <section className="services-banner">
        <div className="container">
          <h1 className="services-banner-title">{title}</h1>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="services-card">
            <p className="services-intro">{intro}</p>

            <div className="services-list">
              {items.map((item, idx) => (
                <div className="service_list" key={item.title}>
                  <p>
                    <b>{item.title}</b>
                  </p>
                  <span>{item.description}</span>
                  <span className="number" aria-hidden="true">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>

            <p className="services-form-heading">
              <b>{inquiry.title}</b>
            </p>

            {sent ? (
              <div className="services-form-success">
                <p>{inquiry.successText}</p>
                <button
                  type="button"
                  className="services-submit"
                  onClick={() => setSent(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="services-form" onSubmit={handleSubmit}>
                {error && <p className="services-form-error">{error}</p>}
                {inquiry.fields.map((field) => (
                  <div className="services-form-group" key={field.name}>
                    <label htmlFor={`svc-${field.name}`}>{field.label}</label>
                    <input
                      id={`svc-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required
                      value={form[field.name]}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                    />
                  </div>
                ))}
                <div className="services-form-actions">
                  <button type="submit" className="services-submit" disabled={sending}>
                    {sending ? "Sending…" : inquiry.submitLabel}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
