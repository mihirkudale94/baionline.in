import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";

/* Shared by the footer and the floating social bar so both render the same
   set. Platforms without an entry here are skipped. */
const icons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn
};

export const socialLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  linkedin: "LinkedIn"
};

export const getSocialIcon = (platform) => {
  const Icon = icons[platform];
  return Icon ? <Icon /> : null;
};

export default getSocialIcon;
