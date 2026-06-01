import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const runtime = "edge";
export const alt = "AI Agent Academy — Learn to Build AI Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #312e81 100%)",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#93c5fd",
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Learn to Build AI Agents from Scratch
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#cbd5e1",
            marginTop: 24,
            maxWidth: 800,
          }}
        >
          30+ lessons · LangChain · Claude · RAG · Certificate
        </div>
      </div>
    ),
    { ...size }
  );
}
