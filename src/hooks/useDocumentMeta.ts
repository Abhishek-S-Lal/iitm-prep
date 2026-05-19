import { useEffect } from "react";

const SITE_URL = "https://iitm-code-ai.netlify.app";
const SITE_NAME = "IITM CODE AI · 60-Day Prep";

interface Options {
  title?: string;
  description?: string;
  path?: string;
}

export function useDocumentMeta({ title, description, path }: Options) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;
    setMeta("og:title", fullTitle, "property");
    setMeta("twitter:title", fullTitle);

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, "property");
      setMeta("twitter:description", description);
    }

    if (path) {
      const url = `${SITE_URL}${path}`;
      setLink("canonical", url);
      setMeta("og:url", url, "property");
    }
  }, [title, description, path]);
}

function setMeta(key: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
