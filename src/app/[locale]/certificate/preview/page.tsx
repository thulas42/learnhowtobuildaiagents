"use client";

import { Header } from "@/components/layout/Header";
import { CertificateTemplate } from "@/components/certificate/CertificateTemplate";
import { Download, Linkedin, Share2, ExternalLink } from "lucide-react";

export default function CertificatePreviewPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Certificate Preview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            This is what your certificate will look like upon course completion.
          </p>
        </div>

        {/* Certificate */}
        <CertificateTemplate
          learnerName="Jane Smith"
          level="DISTINCTION"
          date="28 May 2026"
          certificateId="CERT-2026-AI-AGT-f7a2b9c1"
        />

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="btn-primary gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </button>
          <button className="btn-secondary gap-2">
            <Linkedin className="h-4 w-4" />
            Add to LinkedIn
          </button>
          <button className="btn-secondary gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>

        {/* Affiliation Info */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Industry Recognition & Affiliations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Linkedin className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-semibold">LinkedIn Learning</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Certificate can be added directly to your LinkedIn profile as a credential with one click.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="font-semibold">Credly Digital Badge</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earn a verified digital badge through Credly, recognized by 1000+ employers worldwide.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h3 className="font-semibold">Verifiable QR Code</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every certificate has a unique QR code linking to a public verification page that employers can check.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <h3 className="font-semibold">JSON-LD Credential</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Machine-readable credential format recognized by search engines and HR platforms.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
