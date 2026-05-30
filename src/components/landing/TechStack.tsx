"use client";

/**
 * Technologies covered in the course.
 * Note: These are trademarks of their respective owners. This course is
 * independent and not affiliated with, sponsored, or endorsed by these companies.
 * Logos shown for educational/descriptive purposes (curriculum coverage).
 */

const technologies = [
  {
    name: "Claude",
    company: "Anthropic",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M4.7 15.5l4.3-2.4.07-.2-.07-.12h-.2l-.66-.04-2.26-.06-1.96-.08-1.9-.1-.48-.1L1 11.6l.05-.3.4-.27.57.05 1.27.08 1.9.13 1.38.08 2.04.22h.32l.05-.13-.1-.08-.08-.08-1.9-1.28-2.04-1.35-1.07-.78-.58-.4-.3-.36-.12-.83.54-.6.72.05.18.05 1.46 1.12 3.12 2.42.46.38.18-.13.02-.1-.2-.34-1.7-3.06-1.8-3.12-.8-1.3-.22-.77a3.5 3.5 0 01-.12-.92l.62-.83.34-.12.83.12.34.3 1.04 2.36 1.66 3.74.26.5.13.13.1-.08.07-.5.2-2.14.2-2.68.18-2.96.06-.84.3-.72.6-.4.46.23.38.54-.05.34-.22 1.46-.44 2.28-.28 1.48h.16l1-1 2.04-2.04.9-.68 1.04-.86.7-.55.92.4.34.46-.06.6-.34.62-1.46 1.86-1.2 1.56-.68.9.6-.06h.42l3.74-.78 2.04-.36 1.16-.2.55.27.06.26-.22.54-1.32.32-1.54.3-2.3.54-.03.02.03.03.46-.04 1.96-.12.18-.1h.4l2.34-.43 1.96-.36.92-.06.6.4-.04.55-.46.46-3.1.72-3.62.72-.05.04.06.06 1.62.16h.92l1.74.13 1.34.36.6.4.27.55-.1.4-1.18.6-1.6-.38-3.74-.9-1.28-.32-.18.02v.1l1.06 1.04 1.96 1.76 2.45 2.28.13.55-.32.46-.34-.05-2.2-1.66-.86-.74-1.92-1.62h-.13l.08.16 4.5 6.46-.23.55-.34.18-.4-.07-2.45-2.28-1.96-2.86-.66-1.04h-.13v.6l.07 3.06.13 3.86.07 1.06-.55.55-.92-.42-.55-1.3-.55-2.55-.46-3.12-.34-2.5h-.1l-1.27 6.1-.6 3.04-.4 1.66-.92 1.04-.83-.1-.58-.6-.06-1.3.13-1.4.4-2.7.13-1.16v-.43h-.06l-1.06 2.78-1.92 3.74-.6.86-1.04.12-.6-.66.06-1.04.34-.83 2.04-3.06 1.96-2.96 1.16-1.86v-.6l-.13.06-3.74 3.06-2.36 1.86-1.46 1.04-.92-.12-.46-.83.13-.66.6-.66 2.04-1.46.06-.05z"/>
      </svg>
    ),
    color: "text-[#D97757]",
  },
  {
    name: "OpenAI",
    company: "GPT-4",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A6.07 6.07 0 004.98 4.18a5.98 5.98 0 00-3.99 2.9 6.05 6.05 0 00.74 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.52 2.9A5.98 5.98 0 0013.26 24a6.06 6.06 0 005.77-4.21 5.99 5.99 0 003.98-2.9 6.06 6.06 0 00-.74-7.07zM13.26 22.43a4.48 4.48 0 01-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 00.39-.68v-6.74l2.02 1.17a.07.07 0 01.04.05v5.58a4.5 4.5 0 01-4.5 4.5zM3.6 18.3a4.47 4.47 0 01-.54-3.01l.14.08 4.78 2.76a.78.78 0 00.78 0l5.84-3.37v2.33a.08.08 0 01-.03.06L9.74 21.9a4.5 4.5 0 01-6.14-1.65zM2.34 7.9a4.49 4.49 0 012.35-1.97V11.6a.77.77 0 00.39.68l5.81 3.35-2.02 1.17a.08.08 0 01-.07 0l-4.83-2.79A4.5 4.5 0 012.34 7.9zm16.6 3.86l-5.84-3.39L15.12 7.2a.08.08 0 01.07 0l4.83 2.79a4.49 4.49 0 01-.68 8.1v-5.66a.79.79 0 00-.4-.68zm2.01-3.03l-.14-.09-4.77-2.78a.78.78 0 00-.79 0L9.39 9.23V6.9a.07.07 0 01.03-.06l4.83-2.79a4.5 4.5 0 016.68 4.66zM8.29 12.86l-2.02-1.17a.08.08 0 01-.04-.05V6.07a4.5 4.5 0 017.38-3.45l-.14.08-4.78 2.76a.79.79 0 00-.39.68zm1.1-2.37L12 8.99l2.6 1.5v3l-2.6 1.5-2.6-1.5z"/>
      </svg>
    ),
    color: "text-[#10A37F]",
  },
  {
    name: "Gemini",
    company: "Google",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"/>
      </svg>
    ),
    color: "text-[#4285F4]",
  },
  {
    name: "LangChain",
    company: "Framework",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" strokeLinecap="round"/>
      </svg>
    ),
    color: "text-[#1C3C3C] dark:text-emerald-400",
  },
  {
    name: "LlamaIndex",
    company: "Framework",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7 3.5-7 3.5-7-3.5 7-3.5zM4 9.3l7 3.5v7L4 16.3V9.3zm16 0v7l-7 3.5v-7l7-3.5z"/>
      </svg>
    ),
    color: "text-[#6E56CF]",
  },
  {
    name: "CrewAI",
    company: "Multi-Agent",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M12 2a3 3 0 100 6 3 3 0 000-6zM5 9a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm14 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM12 10a3 3 0 00-3 3v3h6v-3a3 3 0 00-3-3zm-7 5a2 2 0 00-2 2v2h4v-2a2 2 0 00-2-2zm14 0a2 2 0 00-2 2v2h4v-2a2 2 0 00-2-2z"/>
      </svg>
    ),
    color: "text-[#FF5A50]",
  },
  {
    name: "Python",
    company: "Language",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
      </svg>
    ),
    color: "text-[#3776AB]",
  },
  {
    name: "MCP",
    company: "Protocol",
    logo: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" strokeLinecap="round"/>
      </svg>
    ),
    color: "text-primary-600",
  },
];

export function TechStack() {
  return (
    <section className="py-16 border-y border-gray-100 dark:border-gray-800/50 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">
            Technologies You'll Master
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Build with the tools powering modern AI
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 group"
            >
              <div className={`${tech.color} group-hover:scale-110 transition-transform duration-200`}>
                {tech.logo}
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {tech.name}
                </p>
                <p className="text-xs text-gray-400">{tech.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-8 max-w-2xl mx-auto">
          All product names, logos, and brands are property of their respective owners.
          AI Agent Academy is an independent educational platform and is not affiliated with,
          sponsored by, or endorsed by these companies. Logos indicate technologies covered in the curriculum.
        </p>
      </div>
    </section>
  );
}
