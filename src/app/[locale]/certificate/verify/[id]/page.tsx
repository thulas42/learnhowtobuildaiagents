"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, XCircle, Download, Linkedin } from "lucide-react";
import { Header } from "@/components/layout/Header";

// This would fetch from API in production
const mockCertificate = {
  valid: true,
  name: "Jane Smith",
  course: "AI Agent Development: From Zero to Production",
  level: "Distinction",
  date: "17 May 2026",
  id: "CERT-2026-AI-AGT-a1b2c3d4",
  skills: [
    "AI Agent Architecture & Design",
    "LLM Integration & Prompt Engineering",
    "Agent Implementation (Python, LangChain, LlamaIndex)",
    "Multi-Agent Systems",
    "Testing, Deployment & Production Best Practices",
  ],
};

export default function CertificateVerifyPage({
  params,
}: {
  params: { id: string };
}) {
  const t = useTranslations("certificate");
  const cert = mockCertificate;

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center">
          {/* Status */}
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              cert.valid
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            {cert.valid ? (
              <CheckCircle className="h-8 w-8 text-green-600" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600" />
            )}
          </div>

          <h1 className="text-2xl font-bold mb-1">
            {cert.valid ? "✓ VERIFIED CERTIFICATE" : "✗ INVALID CERTIFICATE"}
          </h1>

          {cert.valid && (
            <>
              <div className="mt-6 space-y-3 text-start max-w-md mx-auto">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{cert.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Course</span>
                  <span className="font-medium text-end text-sm">{cert.course}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Level</span>
                  <span className="font-medium">{cert.level}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{cert.date}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-500">Certificate ID</span>
                  <span className="font-mono text-sm">{cert.id}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6 text-start max-w-md mx-auto">
                <p className="text-sm text-gray-500 mb-2">Skills Validated:</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-center gap-4">
                <button className="btn-primary gap-2">
                  <Download className="h-4 w-4" />
                  {t("download")}
                </button>
                <button className="btn-secondary gap-2">
                  <Linkedin className="h-4 w-4" />
                  {t("linkedin")}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
