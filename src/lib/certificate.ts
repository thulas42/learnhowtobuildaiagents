import crypto from "crypto";

type CertificateLevel = "COMPLETION" | "DISTINCTION" | "EXCELLENCE";

/**
 * Generate a unique certificate ID in format: CERT-YYYY-AI-AGT-xxxxxxxx
 */
export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  const randomPart = crypto.randomBytes(4).toString("hex");
  return `CERT-${year}-AI-AGT-${randomPart}`;
}

/**
 * Determine certificate level based on exam and capstone scores
 */
export function determineCertificateLevel(
  examScore: number,
  capstoneScore: number
): CertificateLevel {
  if (examScore >= 95 && capstoneScore >= 95) {
    return "EXCELLENCE";
  }
  if (examScore >= 85 && capstoneScore >= 85) {
    return "DISTINCTION";
  }
  return "COMPLETION";
}

/**
 * Certificate template data for PDF generation
 */
export interface CertificateTemplateData {
  learnerName: string;
  courseTitle: string;
  level: CertificateLevel;
  date: string;
  certificateId: string;
  verificationUrl: string;
  skills: string[];
  locale: string;
}

/**
 * Get localized certificate text
 */
export function getCertificateText(locale: string) {
  const texts: Record<string, { certifies: string; completed: string; demonstrating: string }> = {
    en: {
      certifies: "This certifies that",
      completed: "has successfully completed the course",
      demonstrating: "demonstrating proficiency in designing, building, and deploying AI agents.",
    },
    es: {
      certifies: "Esto certifica que",
      completed: "ha completado exitosamente el curso",
      demonstrating: "demostrando competencia en el diseño, construcción y despliegue de agentes de IA.",
    },
    fr: {
      certifies: "Ceci certifie que",
      completed: "a complété avec succès le cours",
      demonstrating: "démontrant une maîtrise dans la conception, la construction et le déploiement d'agents IA.",
    },
    ja: {
      certifies: "以下の者が",
      completed: "以下のコースを修了したことを証明します",
      demonstrating: "AIエージェントの設計、構築、デプロイにおける能力を実証しました。",
    },
    "zh-CN": {
      certifies: "特此证明",
      completed: "已成功完成以下课程",
      demonstrating: "展示了在设计、构建和部署AI代理方面的能力。",
    },
    ar: {
      certifies: "يشهد هذا أن",
      completed: "قد أتم بنجاح الدورة التدريبية",
      demonstrating: "مما يدل على الكفاءة في تصميم وبناء ونشر وكلاء الذكاء الاصطناعي.",
    },
    hi: {
      certifies: "यह प्रमाणित करता है कि",
      completed: "ने सफलतापूर्वक पाठ्यक्रम पूरा किया है",
      demonstrating: "AI एजेंटों के डिज़ाइन, निर्माण और तैनाती में दक्षता प्रदर्शित करते हुए।",
    },
    "pt-BR": {
      certifies: "Isto certifica que",
      completed: "concluiu com sucesso o curso",
      demonstrating: "demonstrando proficiência no design, construção e implantação de agentes de IA.",
    },
    ru: {
      certifies: "Настоящим подтверждается, что",
      completed: "успешно завершил(а) курс",
      demonstrating: "продемонстрировав компетенцию в проектировании, создании и развёртывании ИИ-агентов.",
    },
    ko: {
      certifies: "이 증명서는",
      completed: "이(가) 다음 과정을 성공적으로 이수했음을 증명합니다",
      demonstrating: "AI 에이전트의 설계, 구축 및 배포에 대한 역량을 입증했습니다.",
    },
  };

  return texts[locale] || texts.en;
}

/**
 * Skills listed on the certificate
 */
export const CERTIFICATE_SKILLS = [
  "AI Agent Architecture & Design",
  "LLM Integration & Prompt Engineering",
  "Agent Implementation (Python, LangChain, LlamaIndex)",
  "Multi-Agent Systems",
  "Testing, Deployment & Production Best Practices",
];
