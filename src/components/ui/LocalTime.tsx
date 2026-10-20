"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site.config";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: siteConfig.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getTime = () => formatter.format(new Date());
/* The server can't know the visitor's render time: render a
   placeholder there and fill it in after hydration. */
const getServerTime = () => "--:--";

/** Live local time in the owner's city (HH:MM, refreshed every 15s). */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  return <time>{time}</time>;
}
