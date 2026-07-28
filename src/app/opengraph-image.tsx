import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;

/** Open Graph image generated at build time — no design tools needed. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.28), transparent 60%)",
          color: "#f4f4f5",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#8b5cf6",
            fontWeight: 600,
          }}
        >
          {`<${siteConfig.initials}/>`}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 28 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#a1a1aa", marginTop: 18 }}>
          {siteConfig.role}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#8b5cf6", marginTop: 48 }}>
          {siteConfig.siteUrl.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
