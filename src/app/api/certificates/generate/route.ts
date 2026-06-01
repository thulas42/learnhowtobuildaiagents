import { NextRequest, NextResponse } from "next/server";
import { generateCertificateId, determineCertificateLevel, CERTIFICATE_SKILLS } from "@/lib/certificate";
import { DATA_FILES, readJsonFile, writeJsonFile } from "@/lib/data-store";
import { getSessionUser, unauthorizedResponse } from "@/lib/session";

interface StoredCertificate {
  id: string;
  userId: string;
  certificateId: string;
  level: string;
  learnerName: string;
  verificationUrl: string;
  issuedAt: string;
  skills: string[];
}

function getCertificates(): StoredCertificate[] {
  return readJsonFile<StoredCertificate[]>(DATA_FILES.certificates, []);
}

function saveCertificates(certs: StoredCertificate[]) {
  writeJsonFile(DATA_FILES.certificates, certs);
}

export async function POST(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) return unauthorizedResponse();

    const { learnerName, examScore, capstoneScore } = await request.json();
    const effectiveName = learnerName || sessionUser.name;

    if (!effectiveName) {
      return NextResponse.json(
        { error: "learnerName is required" },
        { status: 400 }
      );
    }

    const certs = getCertificates();
    const existing = certs.find((c) => c.userId === sessionUser.id);
    if (existing) {
      return NextResponse.json({
        certificate: existing,
        message: "Certificate already issued",
      });
    }

    // Determine level
    const level = determineCertificateLevel(
      examScore || 70,
      capstoneScore || 70
    );

    // Generate certificate
    const certificateId = generateCertificateId();
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verificationUrl = `${baseUrl}/certificate/verify/${certificateId}`;

    const certificate: StoredCertificate = {
      id: certificateId,
      userId: sessionUser.id,
      certificateId,
      level,
      learnerName: effectiveName,
      verificationUrl,
      issuedAt: new Date().toISOString(),
      skills: CERTIFICATE_SKILLS,
    };

    certs.push(certificate);
    saveCertificates(certs);

    // In production: trigger async PDF generation and email notification
    // For now, the certificate is stored and verifiable via the verification URL

    return NextResponse.json({
      certificate,
      message: "Certificate generated successfully",
    }, { status: 201 });
  } catch (error) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/certificates/generate?id=CERT-xxx — Verify a certificate
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const certId = searchParams.get("id");

  if (!certId) {
    return NextResponse.json({ error: "Certificate ID required" }, { status: 400 });
  }

  const certs = getCertificates();
  const cert = certs.find((c) => c.certificateId === certId);

  if (!cert) {
    return NextResponse.json({ valid: false, error: "Certificate not found" }, { status: 404 });
  }

  return NextResponse.json({
    valid: true,
    name: cert.learnerName,
    course: "AI Agent Development: From Zero to Production",
    level: cert.level,
    date: new Date(cert.issuedAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    id: cert.certificateId,
    skills: cert.skills,
  });
}
