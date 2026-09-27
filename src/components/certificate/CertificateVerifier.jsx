"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./CertificateVerifier.module.css";
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  RotateCcw, 
  Building2, 
  User, 
  BookOpen, 
  Clock, 
  Calendar, 
  Hash, 
  Sparkles, 
  ExternalLink, 
  Award, 
  AlertCircle,
  Info,
  GraduationCap
} from "lucide-react";

/**
 * Checks if a value is missing, empty, or marked as Not Applicable ("NA", "N/A", etc.)
 */
function isNA(val) {
  if (val === null || val === undefined) return true;
  const s = String(val).trim().toLowerCase();
  return (
    s === "" ||
    s === "na" ||
    s === "n/a" ||
    s === "n.a." ||
    s === "none" ||
    s === "null" ||
    s === "undefined" ||
    s === "-" ||
    s === "--" ||
    s === "nil" ||
    s === "not applicable"
  );
}

function VerifierContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [certificateId, setCertificateId] = useState(initialId);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  // Auto-verify if ID is in URL query parameters on initial page load
  useEffect(() => {
    if (initialId && initialId.trim()) {
      verifyCertificate(initialId.trim());
    }
  }, [initialId]);

  const verifyCertificate = async (idToVerify) => {
    const cleanId = (idToVerify || certificateId).trim();
    if (!cleanId) {
      setError("Please enter a Certificate Identification Number.");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/verify-certificate?id=${encodeURIComponent(cleanId)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data.data);
        setError(null);
      } else {
        setResult(null);
        setError(data.message || `No certificate record found for ID "${cleanId}".`);
      }
    } catch (err) {
      console.error("Verification Request Error:", err);
      setResult(null);
      setError("Unable to connect to the verification server. Please check your internet connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyCertificate(certificateId);
  };

  const handleSampleClick = (sampleId) => {
    setCertificateId(sampleId);
    verifyCertificate(sampleId);
  };

  const handleCopyLink = () => {
    if (!result?.certificateNumber) return;
    const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(result.certificateNumber)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setCertificateId("");
    setResult(null);
    setError(null);
  };

  return (
    <div className={styles.verifierContainer}>
      {/* Search Bar Card */}
      <div className={styles.searchCard}>
        <div className={styles.searchHeader}>
          <div className={styles.searchEyebrow}>
            <ShieldCheck size={14} className={styles.shieldIcon} />
            <span>Official Credential Registry</span>
          </div>
          <h2 className={styles.searchTitle}>Enter Certificate ID</h2>
          <p className={styles.searchSubtitle}>
            Input the unique certificate number printed on your Campussutras document or digital PDF.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.inputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value.toUpperCase())}
              placeholder="e.g. CSAI001"
              className={styles.inputField}
              autoCapitalize="characters"
              spellCheck="false"
            />
            {certificateId && (
              <button
                type="button"
                onClick={() => setCertificateId("")}
                className={styles.clearBtn}
                title="Clear input"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn-primary ${styles.verifyBtn}`}
          >
            {isLoading ? (
              <span className={styles.spinnerWrap}>
                <span className={styles.spinner}></span>
                <span>Verifying...</span>
              </span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Verify Credential</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Sample IDs for Instant Testing */}
        <div className={styles.sampleSuggestions}>
          <span className={styles.sampleLabel}>Try Sample Certificate IDs:</span>
          <div className={styles.sampleButtons}>
            <button
              type="button"
              onClick={() => handleSampleClick("CSAI001")}
              className={styles.sampleBtn}
            >
              CSAI001
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick("CSAITIBT426001")}
              className={styles.sampleBtn}
            >
              CSAITIBT426001
            </button>
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {error && (
        <div className={styles.errorCard}>
          <div className={styles.errorIconWrap}>
            <XCircle size={28} className={styles.errorIcon} />
          </div>
          <div className={styles.errorContent}>
            <h3 className={styles.errorTitle}>Certificate Not Found</h3>
            <p className={styles.errorDesc}>{error}</p>
            <div className={styles.errorTip}>
              <strong>Tips for troubleshooting:</strong>
              <ul>
                <li>Ensure there are no leading or trailing spaces in the certificate ID.</li>
                <li>Verify you entered the complete alphanumeric ID (e.g. <code>CSAI001</code> or <code>CSAITIBT426001</code>).</li>
                <li>For support or manual verification, write to <a href="mailto:info@campussutras.com">info@campussutras.com</a>.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success / Verified Certificate Display */}
      {result && (
        <div className={styles.certificateResultCard} id="verification-result">
          {/* Certificate Top Security Ribbon */}
          <div className={styles.ribbonBar}>
            <div className={styles.ribbonLeft}>
              <div className={styles.verifiedBadge}>
                <CheckCircle2 size={16} />
                <span>OFFICIAL &amp; VERIFIED CREDENTIAL</span>
              </div>
            </div>
            <div className={styles.ribbonRight}>
              <span className={styles.certCode}>{result.certificateNumber}</span>
            </div>
          </div>

          {/* Certificate Inner Body */}
          <div className={styles.certBody}>
            <div className={styles.certHeader}>
              <div className={styles.orgBrand}>
                <img 
                  src="/media/cs-logo.png" 
                  alt="Campussutras Logo" 
                  className={styles.brandLogo}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className={styles.orgTextWrap}>
                  <h4 className={styles.orgName}>CAMPUSSUTRAS PRIVATE LIMITED</h4>
                  <span className={styles.orgSub}>Workforce &amp; Practical Technical Skill Training</span>
                </div>
              </div>

              <div className={styles.authStamp}>
                <Award size={30} className={styles.stampIcon} />
                <span className={styles.stampText}>AUTHENTIC RECORD</span>
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Candidate Honorific Announcement */}
            <div className={styles.studentSection}>
              <span className={styles.statementText}>This is to officially certify that</span>
              <h3 className={styles.studentName}>{result.studentName}</h3>
              <span className={styles.statementText}>
                has successfully completed the practical industry training program in
              </span>
              <div className={styles.programHighlight}>
                <Sparkles size={18} className={styles.sparkleIcon} />
                <span>{result.program}</span>
              </div>
            </div>

            {/* Certificate Metadata Details Grid */}
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Hash size={16} />
                </div>
                <div className={styles.detailMeta}>
                  <span className={styles.detailLabel}>Certificate Number</span>
                  <strong className={styles.detailValue}>{result.certificateNumber}</strong>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Building2 size={16} />
                </div>
                <div className={styles.detailMeta}>
                  <span className={styles.detailLabel}>College / Institute</span>
                  <strong className={styles.detailValue}>
                    {!isNA(result.collegeName) ? (
                      result.collegeName
                    ) : (
                      <span className={styles.independentPill}>
                        Direct Candidate (Independent Enrollment)
                      </span>
                    )}
                  </strong>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <User size={16} />
                </div>
                <div className={styles.detailMeta}>
                  <span className={styles.detailLabel}>College Roll / ID</span>
                  <strong className={styles.detailValue}>
                    {!isNA(result.collegeId) ? (
                      result.collegeId
                    ) : (
                      <span className={styles.naTag}>Not Applicable</span>
                    )}
                  </strong>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Clock size={16} />
                </div>
                <div className={styles.detailMeta}>
                  <span className={styles.detailLabel}>Training Duration</span>
                  <strong className={styles.detailValue}>
                    {!isNA(result.duration) ? (
                      result.duration
                    ) : (
                      <span className={styles.naTag}>Completed Program</span>
                    )}
                  </strong>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <Calendar size={16} />
                </div>
                <div className={styles.detailMeta}>
                  <span className={styles.detailLabel}>Issue Date</span>
                  <strong className={styles.detailValue}>{result.issueDate || "Verified Official"}</strong>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <ShieldCheck size={16} />
                </div>
                <div className={styles.detailMeta}>
                  <span className={styles.detailLabel}>Verification Status</span>
                  <strong className={styles.statusVerified}>✅ Active &amp; Valid</strong>
                </div>
              </div>
            </div>

            {/* Certificate Footer Notice */}
            <div className={styles.certFooter}>
              <div className={styles.securityNotice}>
                <ShieldCheck size={15} className={styles.secShield} />
                <span>
                  This credential record is cryptographically validated against the Campussutras Central Registry. It cannot be duplicated or modified.
                </span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className={styles.actionToolbar}>
            <button
              type="button"
              onClick={handleCopyLink}
              className={styles.toolBtn}
            >
              {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
              <span>{copied ? "Link Copied!" : "Copy Verification Link"}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className={styles.toolBtnSecondary}
            >
              <RotateCcw size={15} />
              <span>Verify Another</span>
            </button>
          </div>
        </div>
      )}

      {/* Minimalist Certificate ID Pattern Guide */}
      <div className={styles.idFormatCard}>
        <div className={styles.idFormatHeader}>
          <h3 className={styles.idFormatTitle}>Certificate ID Structure</h3>
          <p className={styles.idFormatSub}>
            Standard alphanumeric pattern: <span className={styles.sampleMono}>CSAITIBT426001</span>
          </p>
        </div>

        {/* Clean Segmented Ribbon */}
        <div className={styles.segmentedBar}>
          <div className={styles.segItem}>
            <span className={styles.segCode}>CS</span>
            <span className={styles.segName}>Organization</span>
            <span className={styles.segDetail}>Campussutras</span>
          </div>
          <div className={styles.segItem}>
            <span className={styles.segCode}>AI</span>
            <span className={styles.segName}>Program Track</span>
            <span className={styles.segDetail}>e.g. AI, FS, PY, DA</span>
          </div>
          <div className={styles.segItem}>
            <span className={styles.segCode}>TI</span>
            <span className={styles.segName}>College / Campus</span>
            <span className={styles.segDetail}>e.g. TI, DU, IIT</span>
          </div>
          <div className={styles.segItem}>
            <span className={styles.segCode}>BT4</span>
            <span className={styles.segName}>Degree &amp; Year</span>
            <span className={styles.segDetail}>B.Tech 4th Year</span>
          </div>
          <div className={styles.segItem}>
            <span className={styles.segCode}>26</span>
            <span className={styles.segName}>Issue Year</span>
            <span className={styles.segDetail}>2026</span>
          </div>
          <div className={styles.segItem}>
            <span className={styles.segCode}>001</span>
            <span className={styles.segName}>Student Serial</span>
            <span className={styles.segDetail}>#001 – #999</span>
          </div>
        </div>

        <p className={styles.idFormatFooter}>
          Direct cohort certificates (e.g. <code>CSAI001</code>) are also fully recognized and valid in our registry.
        </p>
      </div>

      {/* Guide & Trust Information */}
      <div className={styles.trustGuide}>
        <h3 className={styles.guideTitle}>About Credential Verification</h3>
        <div className={styles.guideGrid}>
          <div className={styles.guideCard}>
            <div className={styles.guideIconWrap}>
              <Hash size={20} />
            </div>
            <h4 className={styles.guideCardTitle}>Where is my Certificate ID?</h4>
            <p className={styles.guideCardDesc}>
              Look at the bottom-right corner or top header of your Campussutras certificate. It follows our standardized ID format (e.g., <code>CSAITIBT426001</code> or <code>CSAI001</code>).
            </p>
          </div>

          <div className={styles.guideCard}>
            <div className={styles.guideIconWrap}>
              <Building2 size={20} />
            </div>
            <h4 className={styles.guideCardTitle}>For Employers &amp; HR Desks</h4>
            <p className={styles.guideCardDesc}>
              Recruiters can use this instant lookup portal to confirm genuine candidate completion, project duration, and university affiliation.
            </p>
          </div>

          <div className={styles.guideCard}>
            <div className={styles.guideIconWrap}>
              <ShieldCheck size={20} />
            </div>
            <h4 className={styles.guideCardTitle}>Tamper-Proof Verification</h4>
            <p className={styles.guideCardDesc}>
              All certificates issued across college workshops, practical bootcamps, and internships are stored directly in our primary registry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CertificateVerifier() {
  return (
    <Suspense fallback={<div className={styles.loadingFallback}>Loading verification portal...</div>}>
      <VerifierContent />
    </Suspense>
  );
}
