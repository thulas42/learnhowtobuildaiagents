"use client";

interface CertificateTemplateProps {
  learnerName: string;
  level: "COMPLETION" | "DISTINCTION" | "EXCELLENCE";
  date: string;
  certificateId: string;
}

const levelConfig = {
  COMPLETION: { label: "Completion", color: "from-amber-600 to-amber-700", accent: "#b45309", badge: "🥉" },
  DISTINCTION: { label: "Distinction", color: "from-gray-400 to-gray-500", accent: "#6b7280", badge: "🥈" },
  EXCELLENCE: { label: "Excellence", color: "from-yellow-500 to-amber-500", accent: "#d97706", badge: "🥇" },
};

export function CertificateTemplate({ learnerName, level, date, certificateId }: CertificateTemplateProps) {
  const config = levelConfig[level];

  return (
    <div className="relative mx-auto" style={{ maxWidth: "800px", aspectRatio: "1.414/1" }}>
      {/* Certificate Card */}
      <div className="w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative">
        {/* Decorative border */}
        <div className="absolute inset-3 border-2 border-gray-200 rounded-xl pointer-events-none" />
        <div className="absolute inset-4 border border-gray-100 rounded-lg pointer-events-none" />

        {/* Corner decorations */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 rounded-tl-lg" style={{ borderColor: config.accent }} />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 rounded-tr-lg" style={{ borderColor: config.accent }} />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 rounded-bl-lg" style={{ borderColor: config.accent }} />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 rounded-br-lg" style={{ borderColor: config.accent }} />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-between py-12 px-16 text-center">
          {/* Header */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="h-8 w-8 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span className="text-lg font-bold text-gray-800 tracking-wide">AI AGENT ACADEMY</span>
            </div>
            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${config.color} text-white text-xs font-bold uppercase tracking-widest`}>
              Certificate of {config.label}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 my-6">
            <p className="text-gray-500 text-sm tracking-wide uppercase">This certifies that</p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: "Playfair Display, serif" }}>
              {learnerName}
            </h1>

            <p className="text-gray-500 text-sm tracking-wide uppercase mt-2">has successfully completed the course</p>

            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 max-w-md">
              AI Agent Development: From Zero to Production
            </h2>

            <p className="text-gray-500 text-sm max-w-lg mt-2 leading-relaxed">
              demonstrating proficiency in designing, building, and deploying AI agents
              using Python, LangChain, LlamaIndex, and multi-agent systems.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {["AI Architecture", "LLM Integration", "Python", "Multi-Agent Systems", "Production Deployment"].map((skill) => (
                <span key={skill} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="w-full">
            <div className="flex items-end justify-between w-full">
              {/* Date & ID */}
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Date of Completion</p>
                <p className="text-sm font-semibold text-gray-700">{date}</p>
                <p className="text-xs text-gray-400 mt-1 font-mono">{certificateId}</p>
              </div>

              {/* QR Code placeholder */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                  <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm11-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2zm-4 0h2v2h-2v-2z"/>
                  </svg>
                </div>
                <p className="text-xs text-gray-400 mt-1">Scan to verify</p>
              </div>

              {/* Signature */}
              <div className="text-right">
                <div className="w-24 border-b border-gray-300 mb-1" />
                <p className="text-xs text-gray-400 uppercase tracking-wider">Authorized Signature</p>
                <p className="text-sm font-semibold text-gray-700">AI Agent Academy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
