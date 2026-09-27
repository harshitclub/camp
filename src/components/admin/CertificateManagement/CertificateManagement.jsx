"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import styles from "./CertificateManagement.module.css";
import { 
  getAllCertificates, 
  createCertificate, 
  bulkUploadCertificates, 
  updateCertificate, 
  deleteCertificate 
} from "@/lib/adminService";
import { 
  Award, 
  Search, 
  Plus, 
  Upload, 
  RefreshCw, 
  Download, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Building2, 
  BookOpen, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Hash,
  ArrowRight
} from "lucide-react";
import { getPaginationRange } from "@/lib/pagination";

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

/**
 * Automatically extracts acronym from words (e.g. "Tulas Institute" -> "TI")
 */
function extractAcronym(text) {
  if (!text || typeof text !== "string") return "";
  const clean = text.trim();
  if (!clean) return "";

  const stopwords = new Set(["of", "and", "&", "the", "in", "for", "to", "at", "a", "an"]);
  const words = clean.split(/[\s\-_,]+/).filter((w) => w.length > 0 && !stopwords.has(w.toLowerCase()));

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase();
  }

  return words.map((w) => w[0]).join("").toUpperCase();
}

// Popular / common program track suggestions for datalist autocomplete
const POPULAR_PROGRAM_SUGGESTIONS = [
  "Artificial Intelligence",
  "Full Stack Development",
  "Python Programming",
  "Data Structures & Algorithms",
  "Business Data Analytics",
  "Power BI Data Analytics",
  "Modern Data Engineering",
  "Cloud Computing & DevOps",
  "Cyber Security & Ethical Hacking",
  "UI/UX Product Design",
  "Digital Marketing & Media",
  "Java Enterprise Microservices",
  "Microsoft Office 365 Suite",
  "Generative AI & LLM Engineering",
  "Embedded Systems & IoT",
  "Mobile App Development",
  "Blockchain & Web3 Development",
  "Financial Modeling & Analysis",
];

// Comprehensive catalog of Indian degrees, diplomas & professional courses
const INDIAN_COURSES = [
  { group: "General", label: "None / Not Specified", code: "" },
  { group: "General", label: "Custom / Other Degree", code: "CUSTOM" },

  // Engineering & Technology
  { group: "Engineering & Technology", label: "B.Tech - Bachelor of Technology (BT)", code: "BT" },
  { group: "Engineering & Technology", label: "B.E - Bachelor of Engineering (BE)", code: "BE" },
  { group: "Engineering & Technology", label: "M.Tech - Master of Technology (MT)", code: "MT" },
  { group: "Engineering & Technology", label: "M.E - Master of Engineering (ME)", code: "ME" },
  { group: "Engineering & Technology", label: "Diploma / Polytechnic (DIP)", code: "DIP" },
  { group: "Engineering & Technology", label: "Dual Degree B.Tech+M.Tech (DD)", code: "DD" },

  // Computer Science & IT
  { group: "Computer Science & IT", label: "BCA - Bachelor of Computer Applications (BCA)", code: "BCA" },
  { group: "Computer Science & IT", label: "MCA - Master of Computer Applications (MCA)", code: "MCA" },
  { group: "Computer Science & IT", label: "B.Sc (Computer Science) (BSCCS)", code: "BSCCS" },
  { group: "Computer Science & IT", label: "B.Sc (Information Technology) (BSCIT)", code: "BSCIT" },
  { group: "Computer Science & IT", label: "B.Sc (Data Science & AI) (BSCDS)", code: "BSCDS" },
  { group: "Computer Science & IT", label: "M.Sc (Computer Science / IT) (MSCIT)", code: "MSCIT" },

  // Management & Business
  { group: "Management & Business", label: "BBA - Bachelor of Business Administration (BBA)", code: "BBA" },
  { group: "Management & Business", label: "MBA - Master of Business Administration (MBA)", code: "MBA" },
  { group: "Management & Business", label: "BMS - Bachelor of Management Studies (BMS)", code: "BMS" },
  { group: "Management & Business", label: "BBM - Bachelor of Business Management (BBM)", code: "BBM" },
  { group: "Management & Business", label: "PGDM - Post Graduate Diploma in Management (PGDM)", code: "PGDM" },
  { group: "Management & Business", label: "Executive MBA (EMBA)", code: "EMBA" },

  // Commerce & Finance
  { group: "Commerce & Finance", label: "B.Com - Bachelor of Commerce (BCOM)", code: "BCOM" },
  { group: "Commerce & Finance", label: "B.Com (Hons) (BCOMH)", code: "BCOMH" },
  { group: "Commerce & Finance", label: "M.Com - Master of Commerce (MCOM)", code: "MCOM" },
  { group: "Commerce & Finance", label: "B.Com (Banking & Insurance) (BBI)", code: "BBI" },
  { group: "Commerce & Finance", label: "B.Com (Accounting & Finance) (BAF)", code: "BAF" },

  // Pure Sciences
  { group: "Pure Sciences", label: "B.Sc - Bachelor of Science (BSC)", code: "BSC" },
  { group: "Pure Sciences", label: "B.Sc (Hons) (BSCH)", code: "BSCH" },
  { group: "Pure Sciences", label: "M.Sc - Master of Science (MSC)", code: "MSC" },
  { group: "Pure Sciences", label: "BS-MS Dual Degree (BSMS)", code: "BSMS" },

  // Arts & Humanities
  { group: "Arts & Humanities", label: "BA - Bachelor of Arts (BA)", code: "BA" },
  { group: "Arts & Humanities", label: "BA (Hons) (BAH)", code: "BAH" },
  { group: "Arts & Humanities", label: "MA - Master of Arts (MA)", code: "MA" },
  { group: "Arts & Humanities", label: "BSW - Bachelor of Social Work (BSW)", code: "BSW" },
  { group: "Arts & Humanities", label: "MSW - Master of Social Work (MSW)", code: "MSW" },

  // Pharmacy & Healthcare
  { group: "Pharmacy & Medical", label: "B.Pharm - Bachelor of Pharmacy (BPHARM)", code: "BPHARM" },
  { group: "Pharmacy & Medical", label: "M.Pharm - Master of Pharmacy (MPHARM)", code: "MPHARM" },
  { group: "Pharmacy & Medical", label: "Pharm.D - Doctor of Pharmacy (PHARMD)", code: "PHARMD" },
  { group: "Pharmacy & Medical", label: "D.Pharm - Diploma in Pharmacy (DPHARM)", code: "DPHARM" },
  { group: "Pharmacy & Medical", label: "MBBS - Medicine & Surgery (MBBS)", code: "MBBS" },
  { group: "Pharmacy & Medical", label: "BDS - Dental Surgery (BDS)", code: "BDS" },
  { group: "Pharmacy & Medical", label: "B.Sc Nursing (NURS)", code: "NURS" },
  { group: "Pharmacy & Medical", label: "BPT - Physiotherapy (BPT)", code: "BPT" },
  { group: "Pharmacy & Medical", label: "BAMS - Ayurvedic Medicine (BAMS)", code: "BAMS" },
  { group: "Pharmacy & Medical", label: "BHMS - Homeopathic Medicine (BHMS)", code: "BHMS" },
  { group: "Pharmacy & Medical", label: "B.Sc MLT - Medical Lab Technology (MLT)", code: "MLT" },

  // Law
  { group: "Law & Legal Studies", label: "LLB - Bachelor of Laws (LLB)", code: "LLB" },
  { group: "Law & Legal Studies", label: "BA LLB (Integrated) (BALLB)", code: "BALLB" },
  { group: "Law & Legal Studies", label: "BBA LLB (Integrated) (BBALLB)", code: "BBALLB" },
  { group: "Law & Legal Studies", label: "B.Com LLB (Integrated) (BCOMLLB)", code: "BCOMLLB" },
  { group: "Law & Legal Studies", label: "B.Sc LLB (Integrated) (BSCLLB)", code: "BSCLLB" },
  { group: "Law & Legal Studies", label: "LLM - Master of Laws (LLM)", code: "LLM" },

  // Design, Media & Architecture
  { group: "Design, Media & Architecture", label: "B.Des - Bachelor of Design (BDES)", code: "BDES" },
  { group: "Design, Media & Architecture", label: "M.Des - Master of Design (MDES)", code: "MDES" },
  { group: "Design, Media & Architecture", label: "B.Arch - Bachelor of Architecture (BARCH)", code: "BARCH" },
  { group: "Design, Media & Architecture", label: "M.Arch - Master of Architecture (MARCH)", code: "MARCH" },
  { group: "Design, Media & Architecture", label: "BJMC - Journalism & Mass Comm (BJMC)", code: "BJMC" },
  { group: "Design, Media & Architecture", label: "MJMC - Master in Journalism (MJMC)", code: "MJMC" },
  { group: "Design, Media & Architecture", label: "BFA - Bachelor of Fine Arts (BFA)", code: "BFA" },
  { group: "Design, Media & Architecture", label: "B.Sc Animation & Multimedia (ANIM)", code: "ANIM" },

  // Hospitality & Tourism
  { group: "Hospitality & Tourism", label: "BHM - Bachelor of Hotel Management (BHM)", code: "BHM" },
  { group: "Hospitality & Tourism", label: "BHMCT - Hotel Mgmt & Catering Tech (BHMCT)", code: "BHMCT" },
  { group: "Hospitality & Tourism", label: "BTTM - Travel & Tourism Management (BTTM)", code: "BTTM" },

  // Education
  { group: "Education", label: "B.Ed - Bachelor of Education (BED)", code: "BED" },
  { group: "Education", label: "M.Ed - Master of Education (MED)", code: "MED" },
  { group: "Education", label: "B.P.Ed - Physical Education (BPED)", code: "BPED" },
  { group: "Education", label: "D.El.Ed - Elementary Education (DELED)", code: "DELED" },

  // Agriculture & Allied
  { group: "Agriculture & Allied", label: "B.Sc Agriculture (AGRI)", code: "AGRI" },
  { group: "Agriculture & Allied", label: "M.Sc Agriculture (MAGRI)", code: "MAGRI" },
  { group: "Agriculture & Allied", label: "B.Sc Horticulture (HORT)", code: "HORT" },
  { group: "Agriculture & Allied", label: "B.Sc Forestry (FOR)", code: "FOR" },
  { group: "Agriculture & Allied", label: "B.F.Sc - Fisheries Science (FISH)", code: "FISH" },
  { group: "Agriculture & Allied", label: "B.V.Sc & AH - Veterinary Science (VET)", code: "VET" },

  // Vocational & Research
  { group: "Vocational & Research", label: "B.Voc - Bachelor of Vocation (BVOC)", code: "BVOC" },
  { group: "Vocational & Research", label: "M.Voc - Master of Vocation (MVOC)", code: "MVOC" },
  { group: "Vocational & Research", label: "Ph.D - Doctoral Research (PHD)", code: "PHD" },
  { group: "Vocational & Research", label: "PG Diploma / Certification (PGD)", code: "PGD" },
];

const YEAR_PRESETS = [
  { label: "None / Not Specified", code: "" },
  { label: "1st Year (1)", code: "1" },
  { label: "2nd Year (2)", code: "2" },
  { label: "3rd Year (3)", code: "3" },
  { label: "4th Year (4)", code: "4" },
  { label: "5th Year (5)", code: "5" },
  { label: "Passout (P)", code: "P" },
];

export default function CertificateManagement() {
  const [certificates, setCertificates] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showIdGenModal, setShowIdGenModal] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [deletingCert, setDeletingCert] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Single form data
  const [singleForm, setSingleForm] = useState({
    certificateNumber: "",
    studentName: "",
    program: "",
    collegeName: "",
    collegeId: "",
    duration: "50 Hrs.",
  });

  // Certificate ID Generator State
  const currentYearCode = new Date().getFullYear().toString().slice(-2);
  const [idGenForm, setIdGenForm] = useState({
    programName: "Artificial Intelligence",
    programCode: "AI",
    collegeName: "Tulas Institute",
    collegeCode: "TI",
    courseCode: "BT",
    customCourseName: "",
    courseYear: "4",
    issueYear: currentYearCode,
    startSeq: 1,
    count: 1,
    padding: 3,
    separator: "",
    duration: "50 Hrs.",
  });
  const [genCopied, setGenCopied] = useState(false);

  // Bulk Upload state
  const [bulkTab, setBulkTab] = useState("file"); // "file" | "paste"
  const [bulkJsonText, setBulkJsonText] = useState("");
  const [bulkParsedPreview, setBulkParsedPreview] = useState([]);
  const [bulkError, setBulkError] = useState(null);
  const fileInputRef = useRef(null);

  // Load certificates from API / Supabase
  const loadData = async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const res = await getAllCertificates({
        query: searchQuery,
        program: selectedProgram,
        page: 1,
        limit: 2000,
      });

      setCertificates(res.certificates || []);
      setTotalCount(res.total || 0);
    } catch (err) {
      console.error("[CertificateManagement] loadData error:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedProgram]);

  // Extract unique programs list for dropdown
  const uniquePrograms = useMemo(() => {
    const set = new Set();
    certificates.forEach((c) => {
      if (c.program) set.add(c.program.trim());
    });
    return Array.from(set);
  }, [certificates]);

  // Extract unique colleges count
  const uniqueCollegesCount = useMemo(() => {
    const set = new Set();
    certificates.forEach((c) => {
      if (c.collegeName && !isNA(c.collegeName)) set.add(c.collegeName.trim());
    });
    return set.size;
  }, [certificates]);

  // Filtered dataset
  const filteredCertificates = useMemo(() => {
    return certificates.filter((c) => {
      const matchesProgram = selectedProgram === "all" || c.program === selectedProgram;
      if (!matchesProgram) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        (c.certificateNumber && c.certificateNumber.toLowerCase().includes(q)) ||
        (c.studentName && c.studentName.toLowerCase().includes(q)) ||
        (c.collegeName && c.collegeName.toLowerCase().includes(q)) ||
        (c.collegeId && String(c.collegeId).toLowerCase().includes(q)) ||
        (c.program && c.program.toLowerCase().includes(q))
      );
    });
  }, [certificates, selectedProgram, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCertificates.length / pageSize) || 1;
  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCertificates.slice(start, start + pageSize);
  }, [filteredCertificates, currentPage, pageSize]);

  // ID Generator computation helpers
  const generatedIdData = useMemo(() => {
    const prefix = "CS";
    const prog = (idGenForm.programCode || "").trim().toUpperCase();
    const col = (idGenForm.collegeCode || "").trim().toUpperCase();
    
    // Resolve course code (either preset or custom acronym)
    const effectiveCourseCode = idGenForm.courseCode === "CUSTOM"
      ? extractAcronym(idGenForm.customCourseName || "")
      : (idGenForm.courseCode || "");
    const course = effectiveCourseCode.trim().toUpperCase();
    
    const cYear = (idGenForm.courseYear || "").trim();
    const iYear = (idGenForm.issueYear || "").trim();
    const padding = Math.max(1, Math.min(6, parseInt(idGenForm.padding, 10) || 3));
    const startSeq = Math.max(1, parseInt(idGenForm.startSeq, 10) || 1);
    const count = Math.max(1, Math.min(500, parseInt(idGenForm.count, 10) || 1));
    const sep = idGenForm.separator || "";

    const courseSegment = course && cYear ? `${course}${cYear}` : course || cYear;

    const buildSingle = (seqNumber) => {
      const seqStr = String(seqNumber).padStart(padding, "0");
      const segments = [prefix];
      if (prog) segments.push(prog);
      if (col) segments.push(col);
      if (courseSegment) segments.push(courseSegment);
      if (iYear) segments.push(iYear);
      segments.push(seqStr);
      return segments.join(sep);
    };

    const firstId = buildSingle(startSeq);
    const idList = [];
    for (let i = 0; i < count; i++) {
      idList.push(buildSingle(startSeq + i));
    }

    return {
      prefix,
      prog,
      col,
      courseSegment,
      iYear,
      seqSample: String(startSeq).padStart(padding, "0"),
      firstId,
      idList,
    };
  }, [idGenForm]);

  // Handle single certificate submit
  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!singleForm.certificateNumber.trim() || !singleForm.studentName.trim() || !singleForm.program.trim()) {
      setStatusMessage({ type: "error", text: "Please fill all required fields (*)." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const payload = {
      certificateNumber: singleForm.certificateNumber.trim().toUpperCase(),
      studentName: singleForm.studentName.trim().toUpperCase(),
      program: singleForm.program.trim(),
      collegeName: singleForm.collegeName ? singleForm.collegeName.trim() : null,
      collegeId: singleForm.collegeId ? String(singleForm.collegeId).trim() : null,
      duration: singleForm.duration ? singleForm.duration.trim() : null,
      status: "VERIFIED_AUTHENTIC",
    };

    const res = await createCertificate(payload);
    setIsSubmitting(false);

    if (res.success) {
      setShowAddModal(false);
      setSingleForm({
        certificateNumber: "",
        studentName: "",
        program: "",
        collegeName: "",
        collegeId: "",
        duration: "50 Hrs.",
      });
      loadData(true);
      setStatusMessage({ type: "success", text: res.message || "Certificate created successfully!" });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: "error", text: res.message || "Failed to create certificate." });
    }
  };

  // Transfer generated ID directly to Add Certificate modal
  const handleUseGeneratedId = (idToUse) => {
    setShowIdGenModal(false);
    setSingleForm({
      certificateNumber: idToUse,
      studentName: "",
      program: idGenForm.programName || "",
      collegeName: idGenForm.collegeName || "",
      collegeId: "",
      duration: idGenForm.duration || "50 Hrs.",
    });
    setShowAddModal(true);
  };

  // Copy generated ID(s)
  const handleCopyGenerated = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setGenCopied(true);
    setTimeout(() => setGenCopied(false), 2000);
  };

  // Export Generated IDs into an Excel/CSV Template ready for Bulk Upload
  const handleExportGeneratedExcel = () => {
    if (!generatedIdData.idList || generatedIdData.idList.length === 0) return;

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const s = String(val).replace(/"/g, '""');
      return `"${s}"`;
    };

    // Standard schema headers matching Admin Bulk Upload
    const headers = ["certificateNumber", "studentName", "program", "collegeName", "collegeId", "duration"];
    const rows = [headers.join(",")];

    generatedIdData.idList.forEach((certId) => {
      const row = [
        escapeCsv(certId),
        escapeCsv(""), // studentName left blank for admin to fill in Excel
        escapeCsv(idGenForm.programName || ""),
        escapeCsv(idGenForm.collegeName || ""),
        escapeCsv(""), // collegeId / roll number left blank
        escapeCsv(idGenForm.duration || "50 Hrs."),
      ];
      rows.push(row.join(","));
    });

    // \uFEFF UTF-8 BOM ensures Microsoft Excel properly parses characters and columns
    const csvContent = "\uFEFF" + rows.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const progSlug = (idGenForm.programCode || "BATCH").toLowerCase();
    a.download = `campussutras_certificates_template_${progSlug}_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage({
      type: "success",
      text: `✓ Excel Template exported with ${generatedIdData.idList.length} certificate IDs. You can fill student names and upload this file in Bulk Upload!`,
    });
    setTimeout(() => setStatusMessage(null), 6000);
  };

  // Download Blank .CSV Template (Headers only)
  const handleDownloadCsvTemplate = () => {
    const csvContent = "\uFEFFcertificateNumber,studentName,program,collegeName,collegeId,duration\r\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campussutras_certificates_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage({
      type: "success",
      text: "✓ Blank .CSV Template downloaded! Add your certificate data and upload.",
    });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  // Download Blank .JSON Template (Schema columns skeleton only)
  const handleDownloadJsonTemplate = () => {
    const sampleData = [
      {
        certificateNumber: "",
        studentName: "",
        program: "",
        collegeName: "",
        collegeId: "",
        duration: "",
      },
    ];

    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campussutras_certificates_template.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setStatusMessage({
      type: "success",
      text: "✓ Blank .JSON Template downloaded! Add your certificate data and upload.",
    });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  // Robust CSV Parser supporting quotes, commas, and header variations
  const parseCsvToRecords = (csvText) => {
    if (!csvText || !csvText.trim()) return [];

    const rows = [];
    let currentRow = [];
    let currentField = "";
    let insideQuotes = false;

    // Strip UTF-8 BOM if present
    const text = csvText.replace(/^\uFEFF/, "");

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (insideQuotes) {
        if (char === '"' && nextChar === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else if (char === '"') {
          insideQuotes = false;
        } else {
          currentField += char;
        }
      } else {
        if (char === '"') {
          insideQuotes = true;
        } else if (char === ',') {
          currentRow.push(currentField.trim());
          currentField = "";
        } else if (char === '\n' || char === '\r') {
          if (char === '\r' && nextChar === '\n') i++; // CRLF
          currentRow.push(currentField.trim());
          if (currentRow.some((f) => f.length > 0)) {
            rows.push(currentRow);
          }
          currentRow = [];
          currentField = "";
        } else {
          currentField += char;
        }
      }
    }

    if (currentField || currentRow.length > 0) {
      currentRow.push(currentField.trim());
      if (currentRow.some((f) => f.length > 0)) {
        rows.push(currentRow);
      }
    }

    if (rows.length < 2) return [];

    // Map column aliases accurately
    const mapHeader = (raw) => {
      if (!raw) return "";
      const h = raw.toLowerCase().trim().replace(/[\s_\-\/\\]+/g, "");

      // 1. Certificate ID / Number
      if (
        h === "certificatenumber" ||
        h === "certificate_number" ||
        h === "certificateid" ||
        h === "certid" ||
        h === "certno" ||
        h === "certnumber" ||
        h === "id"
      ) {
        return "certificateNumber";
      }

      // 2. College Name / Institute (Must check BEFORE studentName to avoid 'collegename' matching 'name')
      if (
        h === "collegename" ||
        h === "college_name" ||
        h === "college" ||
        h === "institutename" ||
        h === "institute" ||
        h === "universityname" ||
        h === "university" ||
        h === "schoolname"
      ) {
        return "collegeName";
      }

      // 3. Student Name / Candidate Name / Full Name
      if (
        h === "studentname" ||
        h === "student_name" ||
        h === "name" ||
        h === "student" ||
        h === "candidatename" ||
        h === "candidate" ||
        h === "fullname" ||
        h === "full_name"
      ) {
        return "studentName";
      }

      // 4. College ID / Roll Number
      if (
        h === "collegeid" ||
        h === "college_id" ||
        h === "rollnumber" ||
        h === "rollno" ||
        h === "roll" ||
        h === "roll_no" ||
        h === "studentid" ||
        h === "enrollmentno" ||
        h === "regno"
      ) {
        return "collegeId";
      }

      // 5. Training Program / Course Track
      if (
        h === "program" ||
        h === "programname" ||
        h === "track" ||
        h === "course" ||
        h === "coursename" ||
        h === "trainingprogram"
      ) {
        return "program";
      }

      // 6. Duration / Hours
      if (
        h === "duration" ||
        h === "courseduration" ||
        h === "hours" ||
        h === "durationhours"
      ) {
        return "duration";
      }

      // Secondary substring fallbacks (ordered strictly)
      if (h.includes("cert")) return "certificateNumber";
      if (h.includes("college") || h.includes("inst") || h.includes("univ")) {
        if (h.includes("id") || h.includes("roll")) return "collegeId";
        return "collegeName";
      }
      if (h.includes("roll")) return "collegeId";
      if (h.includes("student") || h.includes("candidate")) return "studentName";
      if (h === "name") return "studentName";
      if (h.includes("prog") || h.includes("track")) return "program";
      if (h.includes("dur") || h.includes("hour")) return "duration";

      return raw;
    };

    const cleanHeaders = rows[0].map(mapHeader);
    const results = [];

    for (let r = 1; r < rows.length; r++) {
      const rowValues = rows[r];
      const obj = {
        certificateNumber: "",
        studentName: "",
        program: "",
        collegeName: "",
        collegeId: "",
        duration: "50 Hrs.",
      };

      cleanHeaders.forEach((colKey, colIdx) => {
        const val = (rowValues[colIdx] || "").trim();
        if (colKey === "certificateNumber") obj.certificateNumber = val;
        else if (colKey === "studentName") obj.studentName = val;
        else if (colKey === "program") obj.program = val;
        else if (colKey === "collegeName") obj.collegeName = val;
        else if (colKey === "collegeId") obj.collegeId = val;
        else if (colKey === "duration") obj.duration = val || "50 Hrs.";
        else if (colKey) obj[colKey] = val;
      });

      // Valid if has at least certificate number or student name
      if (obj.certificateNumber || obj.studentName) {
        results.push(obj);
      }
    }

    return results;
  };

  // Handle update certificate
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingCert) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const res = await updateCertificate(editingCert);
    setIsSubmitting(false);

    if (res.success) {
      setEditingCert(null);
      loadData(true);
      setStatusMessage({ type: "success", text: "Certificate record updated." });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: "error", text: res.message || "Failed to update certificate." });
    }
  };

  // Handle delete certificate
  const handleConfirmDeleteCert = async () => {
    if (!deletingCert) return;
    setIsDeleting(true);

    const certNum = deletingCert.certificateNumber || deletingCert.certificate_number;
    try {
      const res = await deleteCertificate(deletingCert.id || certNum);
      if (res.success) {
        setCertificates((prev) =>
          prev.filter((c) => c.id !== deletingCert.id && (c.certificateNumber || c.certificate_number) !== certNum)
        );
        setTotalCount((prev) => Math.max(0, prev - 1));
        setStatusMessage({ type: "success", text: `Certificate "${certNum}" deleted successfully.` });
        setDeletingCert(null);
        setTimeout(() => setStatusMessage(null), 3500);
      } else {
        setStatusMessage({ type: "error", text: res.message || "Failed to delete certificate." });
      }
    } catch (err) {
      console.error("[CertificateManagement] delete error:", err);
      setStatusMessage({ type: "error", text: "Error deleting certificate record." });
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk Upload File Parse (JSON or CSV / Excel Template)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBulkError(null);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const text = evt.target?.result;
        if (file.name.endsWith(".json")) {
          const parsed = JSON.parse(text);
          if (!Array.isArray(parsed)) {
            throw new Error("JSON file must contain an Array of certificate objects.");
          }
          setBulkParsedPreview(parsed);
          setBulkJsonText(JSON.stringify(parsed, null, 2));
        } else if (
          file.name.endsWith(".csv") ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".tsv")
        ) {
          const records = parseCsvToRecords(text);
          if (records.length === 0) {
            throw new Error("No certificate records found. Ensure CSV has column headers: certificateNumber, studentName, program, etc.");
          }
          setBulkParsedPreview(records);
          setBulkJsonText(JSON.stringify(records, null, 2));
        } else {
          throw new Error("Unsupported format. Please upload a .csv, .json, or Excel CSV template.");
        }
      } catch (err) {
        setBulkError(err.message || "Failed to parse file.");
        setBulkParsedPreview([]);
      }
    };

    reader.readAsText(file);
  };

  // Realtime JSON text change in bulk paste tab
  const handleBulkTextChange = (text) => {
    setBulkJsonText(text);
    setBulkError(null);
    if (!text.trim()) {
      setBulkParsedPreview([]);
      return;
    }
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        setBulkParsedPreview(parsed);
      } else {
        setBulkError("Input must be a JSON Array [...]");
        setBulkParsedPreview([]);
      }
    } catch (e) {
      setBulkError("Invalid JSON syntax: " + e.message);
      setBulkParsedPreview([]);
    }
  };

  // Submit Bulk Upload
  const handleBulkSubmit = async () => {
    if (!bulkParsedPreview || bulkParsedPreview.length === 0) {
      setBulkError("Please provide valid certificate data to upload.");
      return;
    }

    setIsSubmitting(true);
    setBulkError(null);

    const res = await bulkUploadCertificates(bulkParsedPreview);
    setIsSubmitting(false);

    if (res.success) {
      setShowBulkModal(false);
      setBulkJsonText("");
      setBulkParsedPreview([]);
      loadData(true);
      setStatusMessage({
        type: "success",
        text: `✓ Bulk Upload Complete: ${res.processedCount} certificates synced to Supabase.`,
      });
      setTimeout(() => setStatusMessage(null), 5000);
    } else {
      setBulkError(res.message || "Failed to bulk upload records.");
    }
  };

  // Copy Verification Link
  const handleCopy = (certNumber) => {
    const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(certNumber)}`;
    navigator.clipboard.writeText(url);
    setCopiedId(certNumber);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export to CSV or JSON
  const handleExport = (format) => {
    if (filteredCertificates.length === 0) return;

    if (format === "json") {
      const blob = new Blob([JSON.stringify(filteredCertificates, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `campussutras_certificates_${Date.now()}.json`;
      a.click();
    } else {
      const headers = ["certificateNumber", "studentName", "collegeId", "program", "duration", "collegeName"];
      const csvRows = [headers.join(",")];

      filteredCertificates.forEach((c) => {
        const row = [
          `"${(c.certificateNumber || "").replace(/"/g, '""')}"`,
          `"${(c.studentName || "").replace(/"/g, '""')}"`,
          `"${(c.collegeId || "").replace(/"/g, '""')}"`,
          `"${(c.program || "").replace(/"/g, '""')}"`,
          `"${(c.duration || "").replace(/"/g, '""')}"`,
          `"${(c.collegeName || "").replace(/"/g, '""')}"`,
        ];
        csvRows.push(row.join(","));
      });

      const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `campussutras_certificates_${Date.now()}.csv`;
      a.click();
    }
  };

  return (
    <div className={styles.container}>
      {/* 1. Top Header */}
      <div className={styles.topHeader}>
        <div>
          <div className={styles.headerTag}>
            <Sparkles size={13} />
            <span>CREDENTIAL &amp; VERIFICATION REGISTRY</span>
          </div>
          <h1 className={styles.pageTitle}>Certificate Management</h1>
          <p className={styles.pageSubtitle}>
            Issue, manage, and verify authenticated student certificates stored in Supabase PostgreSQL.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => loadData(true)}
            className={styles.actionBtnSecondary}
            disabled={isLoading || isRefreshing}
            title="Refresh from Database"
          >
            <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
            <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowIdGenModal(true)}
            className={styles.actionBtnSecondary}
            title="Generate custom or batch Certificate IDs based on Program, College & Year"
          >
            <Hash size={15} />
            <span>Generate ID</span>
          </button>

          <button
            type="button"
            onClick={() => setShowBulkModal(true)}
            className={styles.actionBtnSecondary}
          >
            <Upload size={15} />
            <span>Bulk Upload</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className={styles.actionBtnPrimary}
          >
            <Plus size={16} />
            <span>Add Certificate</span>
          </button>
        </div>
      </div>

      {/* Global notification banner */}
      {statusMessage && (
        <div className={statusMessage.type === "error" ? styles.errorBanner : styles.successBanner}>
          {statusMessage.type === "error" ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 2. KPI Metrics Banner - Clean 3 Balanced Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: "#eff6ff", color: "#0b57d0" }}>
            <Award size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Total Certificates</span>
            <span className={styles.statValue}>{certificates.length}</span>
            <span className={styles.statSub}>Authentic Records</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: "#ecfdf5", color: "#059669" }}>
            <BookOpen size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Active Programs</span>
            <span className={styles.statValue}>{uniquePrograms.length || 1}</span>
            <span className={styles.statSub}>Skill Tracks</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconWrap} style={{ background: "#fef3c7", color: "#d97706" }}>
            <Building2 size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statLabel}>Partner Colleges</span>
            <span className={styles.statValue}>{uniqueCollegesCount || 1}</span>
            <span className={styles.statSub}>Institutions</span>
          </div>
        </div>
      </div>

      {/* 3. Main Data Card */}
      <div className={styles.contentCard}>
        {/* Filter controls */}
        <div className={styles.controlsBar}>
          <div className={styles.searchWrap}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Cert ID, Student name, College, or Program..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterGroup}>
            <select
              value={selectedProgram}
              onChange={(e) => {
                setSelectedProgram(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.selectInput}
            >
              <option value="all">All Programs ({certificates.length})</option>
              {uniquePrograms.map((prog) => (
                <option key={prog} value={prog}>{prog}</option>
              ))}
            </select>

            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className={styles.selectInput}
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>

            <button
              type="button"
              onClick={() => handleExport("csv")}
              className={styles.actionBtnSecondary}
              title="Download filtered dataset as CSV"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>

            <span className={styles.countBadge}>
              Showing {filteredCertificates.length} Records
            </span>
          </div>
        </div>

        {/* Table View */}
        <div className={styles.tableResponsive}>
          {isLoading ? (
            <div className={styles.emptyState}>
              <RefreshCw size={28} className={`${styles.emptyIcon} animate-spin`} />
              <div className={styles.emptyTitle}>Loading Certificates from Supabase...</div>
            </div>
          ) : paginatedCertificates.length === 0 ? (
            <div className={styles.emptyState}>
              <Award size={36} className={styles.emptyIcon} />
              <div className={styles.emptyTitle}>No Certificates Found</div>
              <p className={styles.emptyText}>
                {searchQuery || selectedProgram !== "all"
                  ? "No certificate records matched your search criteria."
                  : "No certificates stored yet. Click 'Add Certificate' or 'Bulk Upload' to add records."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedProgram("all");
                }}
                className={styles.actionBtnSecondary}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: "150px" }}>Certificate ID</th>
                  <th style={{ minWidth: "280px" }}>Student &amp; College</th>
                  <th style={{ minWidth: "220px" }}>Program / Course</th>
                  <th style={{ width: "120px" }}>Duration</th>
                  <th style={{ width: "110px" }}>Status</th>
                  <th style={{ width: "120px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCertificates.map((cert) => {
                  const certNumber = cert.certificateNumber || cert.certificate_number;
                  const collegeNameVal = cert.collegeName || cert.college_name;
                  const collegeIdVal = cert.collegeId || cert.college_id;

                  return (
                    <tr key={cert.id || certNumber}>
                      <td>
                        <div className={styles.certBadgeWrap}>
                          <span className={styles.certIdBadge}>{certNumber}</span>
                          <button
                            type="button"
                            onClick={() => handleCopy(certNumber)}
                            className={styles.copyBtn}
                            title="Copy Public Verification Link"
                          >
                            {copiedId === certNumber ? <Check size={14} color="#15803d" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className={styles.studentCell}>
                          <div className={styles.studentName}>
                            {cert.studentName || cert.student_name}
                          </div>
                          <div className={styles.collegeSub}>
                            <span>
                              {!isNA(collegeNameVal)
                                ? collegeNameVal
                                : "Direct Candidate (Independent)"}
                            </span>
                            {!isNA(collegeIdVal) && (
                              <span className={styles.rollNumberText}> &bull; Roll: {collegeIdVal}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.programCell}>{cert.program}</span>
                      </td>
                      <td>
                        <span className={styles.durationText}>
                          {!isNA(cert.duration) ? cert.duration : "Standard"}
                        </span>
                      </td>
                      <td>
                        <span className={styles.statusPillVerified}>
                          <ShieldCheck size={12} />
                          <span>Verified</span>
                        </span>
                      </td>
                      <td>
                        <div className={styles.actionsCell}>
                          <a
                            href={`/verify-certificate?id=${encodeURIComponent(certNumber)}`}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.actionIconBtn}
                            title="Open Public Verification Page"
                          >
                            <ExternalLink size={14} />
                          </a>

                          <button
                            type="button"
                            onClick={() => setEditingCert(cert)}
                            className={styles.actionIconBtn}
                            title="Edit Certificate Details"
                          >
                            <Edit3 size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingCert(cert)}
                            className={`${styles.actionIconBtn} ${styles.actionIconBtnDelete}`}
                            title="Delete Certificate"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Bar */}
        {filteredCertificates.length > 0 && (
          <div className={styles.paginationBar}>
            <div className={styles.pageInfo}>
              Page {currentPage} of {totalPages} &bull; Total {filteredCertificates.length} records
            </div>

            <div className={styles.pageButtons}>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                <ChevronLeft size={14} />
                <span>Prev</span>
              </button>

              {getPaginationRange(currentPage, totalPages).map((item, idx) => {
                if (typeof item !== "number" || item === "...") {
                  return (
                    <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>
                      &hellip;
                    </span>
                  );
                }

                const isPageActive = currentPage === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    className={`${styles.pageBtn} ${isPageActive ? styles.pageBtnActive : ""}`}
                    aria-current={isPageActive ? "page" : undefined}
                    aria-label={`Page ${item}`}
                  >
                    {item}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. MODAL: Certificate ID Generator */}
      {showIdGenModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowIdGenModal(false)}>
          <div className={`${styles.modalCard} ${styles.modalCardLarge}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <Hash className={styles.modalIcon} size={20} />
                <h3 className={styles.modalTitle}>Certificate ID Generator</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowIdGenModal(false)}
                className={styles.modalCloseBtn}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Formula & Live Preview Box */}
              <div className={styles.genPreviewBox}>
                <div className={styles.genPreviewHeader}>
                  <span>Pattern Structure Breakdown</span>
                  <span style={{ color: "#0b57d0" }}>CS + Program + College + Course/Year + Year + Seq</span>
                </div>

                <div className={styles.genFormulaGrid}>
                  <div className={styles.genFormulaChip}>
                    <span className={styles.genChipLabel}>Brand</span>
                    <span className={styles.genChipValue}>CS</span>
                  </div>

                  <span className={styles.genFormulaPlus}>+</span>

                  <div className={styles.genFormulaChip}>
                    <span className={styles.genChipLabel}>Program</span>
                    <span className={styles.genChipValue}>{generatedIdData.prog || "--"}</span>
                  </div>

                  <span className={styles.genFormulaPlus}>+</span>

                  <div className={`${styles.genFormulaChip} ${!generatedIdData.col ? styles.genFormulaChipOmitted : ""}`}>
                    <span className={styles.genChipLabel}>College</span>
                    <span className={styles.genChipValue}>{generatedIdData.col || "Omitted"}</span>
                  </div>

                  <span className={styles.genFormulaPlus}>+</span>

                  <div className={`${styles.genFormulaChip} ${!generatedIdData.courseSegment ? styles.genFormulaChipOmitted : ""}`}>
                    <span className={styles.genChipLabel}>Course/Year</span>
                    <span className={styles.genChipValue}>{generatedIdData.courseSegment || "Omitted"}</span>
                  </div>

                  <span className={styles.genFormulaPlus}>+</span>

                  <div className={styles.genFormulaChip}>
                    <span className={styles.genChipLabel}>Issue Year</span>
                    <span className={styles.genChipValue}>{generatedIdData.iYear || "--"}</span>
                  </div>

                  <span className={styles.genFormulaPlus}>+</span>

                  <div className={styles.genFormulaChip}>
                    <span className={styles.genChipLabel}>Sequence</span>
                    <span className={styles.genChipValue}>{generatedIdData.seqSample}</span>
                  </div>
                </div>

                <div className={styles.genResultBar}>
                  <div>
                    <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                      Live Generated ID {generatedIdData.idList.length > 1 ? `(1 of ${generatedIdData.idList.length})` : ""}
                    </span>
                    <span className={styles.genResultCode}>{generatedIdData.firstId}</span>
                  </div>

                  <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={handleExportGeneratedExcel}
                      className={styles.actionBtnExcel}
                      title="Export pre-filled Excel template (.csv) with these IDs for Bulk Upload"
                    >
                      <Download size={14} />
                      <span>Export Excel Template</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyGenerated(generatedIdData.firstId)}
                      className={styles.actionBtnSecondary}
                      style={{ height: "32px", fontSize: "0.78rem", padding: "0 0.65rem" }}
                    >
                      {genCopied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                      <span>{genCopied ? "Copied!" : "Copy"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUseGeneratedId(generatedIdData.firstId)}
                      className={styles.actionBtnPrimary}
                      style={{ height: "32px", fontSize: "0.78rem", padding: "0 0.75rem" }}
                      title="Use this ID directly in the Add Certificate form"
                    >
                      <span>Use in Add Form</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Configuration Inputs */}
              <div className={styles.formGrid}>
                {/* 1. Program Name & Code (Free / Open Input with Autocomplete Suggestions) */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Training Program Name *</label>
                  <input
                    type="text"
                    required
                    list="idGenProgramSuggestions"
                    value={idGenForm.programName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIdGenForm({
                        ...idGenForm,
                        programName: val,
                        programCode: extractAcronym(val),
                      });
                    }}
                    placeholder="e.g. Artificial Intelligence or Full Stack"
                    className={styles.formInput}
                  />
                  <datalist id="idGenProgramSuggestions">
                    {Array.from(new Set([...uniquePrograms, ...POPULAR_PROGRAM_SUGGESTIONS])).map((p) => (
                      <option key={p} value={p} />
                    ))}
                  </datalist>
                  <span className={styles.formHint}>Open text &mdash; automatically calculates program code.</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Program Code (Editable)</label>
                  <input
                    type="text"
                    required
                    value={idGenForm.programCode}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, programCode: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. AI or FS"
                    className={styles.formInput}
                    style={{ textTransform: "uppercase", fontFamily: "monospace", fontWeight: "700" }}
                  />
                  <span className={styles.formHint}>e.g. Artificial Intelligence &rarr; AI</span>
                </div>

                {/* 2. College Name & Code (Optional) */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>College / Institute (Optional)</label>
                  <input
                    type="text"
                    value={idGenForm.collegeName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIdGenForm({
                        ...idGenForm,
                        collegeName: val,
                        collegeCode: extractAcronym(val),
                      });
                    }}
                    placeholder="e.g. Tulas Institute (leave blank if none)"
                    className={styles.formInput}
                  />
                  <span className={styles.formHint}>Auto-generates acronym, or leave blank if omitted.</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>College Code (Optional)</label>
                  <input
                    type="text"
                    value={idGenForm.collegeCode}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, collegeCode: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g. TI or AIMT"
                    className={styles.formInput}
                    style={{ textTransform: "uppercase", fontFamily: "monospace", fontWeight: "700" }}
                  />
                  <span className={styles.formHint}>e.g. Tulas Institute &rarr; TI</span>
                </div>

                {/* 3. Course / Degree (Comprehensive Indian Courses) & Year */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Course / Degree (Optional)</label>
                  <select
                    value={idGenForm.courseCode}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, courseCode: e.target.value })
                    }
                    className={styles.formSelect}
                  >
                    {Array.from(new Set(INDIAN_COURSES.map((c) => c.group))).map((groupName) => (
                      <optgroup key={groupName} label={groupName}>
                        {INDIAN_COURSES.filter((c) => c.group === groupName).map((c) => (
                          <option key={c.label} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {idGenForm.courseCode === "CUSTOM" && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Custom Degree Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master of Data Science"
                      value={idGenForm.customCourseName}
                      onChange={(e) =>
                        setIdGenForm({ ...idGenForm, customCourseName: e.target.value })
                      }
                      className={styles.formInput}
                    />
                    <span className={styles.formHint}>Acronym will be auto-derived for ID.</span>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Course Year (Optional)</label>
                  <select
                    value={idGenForm.courseYear}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, courseYear: e.target.value })
                    }
                    className={styles.formSelect}
                  >
                    {YEAR_PRESETS.map((y) => (
                      <option key={y.label} value={y.code}>
                        {y.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Issue Year, Start Sequence & Count */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Issue Year (2 Digits)</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={idGenForm.issueYear}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, issueYear: e.target.value })
                    }
                    placeholder="26"
                    className={styles.formInput}
                    style={{ fontFamily: "monospace", fontWeight: "700" }}
                  />
                  <span className={styles.formHint}>2026 &rarr; 26</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Starting Number</label>
                  <input
                    type="number"
                    min={1}
                    value={idGenForm.startSeq}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, startSeq: parseInt(e.target.value, 10) || 1 })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Quantity to Generate</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={idGenForm.count}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, count: parseInt(e.target.value, 10) || 1 })
                    }
                    className={styles.formInput}
                  />
                  <span className={styles.formHint}>Generate 1 ID or batch series (e.g. 50 IDs)</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Duration (for Excel Template)</label>
                  <input
                    type="text"
                    value={idGenForm.duration}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, duration: e.target.value })
                    }
                    placeholder="e.g. 50 Hrs. or 90 Days"
                    className={styles.formInput}
                  />
                  <span className={styles.formHint}>Default duration exported in spreadsheet.</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Separator Format</label>
                  <select
                    value={idGenForm.separator}
                    onChange={(e) =>
                      setIdGenForm({ ...idGenForm, separator: e.target.value })
                    }
                    className={styles.formSelect}
                  >
                    <option value="">Compact (e.g. {generatedIdData.firstId})</option>
                    <option value="-">Hyphen Separated (e.g. CS-AI-TI-BT4-26-001)</option>
                  </select>
                </div>
              </div>

              {/* Batch list preview if count > 1 */}
              {generatedIdData.idList.length > 1 && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>
                      Batch Series Output ({generatedIdData.idList.length} IDs)
                    </span>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      <button
                        type="button"
                        onClick={handleExportGeneratedExcel}
                        className={styles.actionBtnExcel}
                        style={{ height: "28px", fontSize: "0.75rem", padding: "0 0.65rem" }}
                      >
                        <Download size={13} />
                        <span>Export All {generatedIdData.idList.length} to Excel</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopyGenerated(generatedIdData.idList.join("\n"))}
                        className={styles.actionBtnSecondary}
                        style={{ height: "28px", fontSize: "0.75rem", padding: "0 0.6rem" }}
                      >
                        <Copy size={13} />
                        <span>Copy All IDs</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.genMultiList}>
                    {generatedIdData.idList.map((idVal, idx) => (
                      <div key={idx} className={styles.genMultiItem}>
                        <span>#{idx + 1}: <strong>{idVal}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleUseGeneratedId(idVal)}
                          className={styles.actionBtnSecondary}
                          style={{ height: "26px", fontSize: "0.72rem", padding: "0 0.5rem" }}
                        >
                          Use in Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowIdGenModal(false)}
                className={styles.actionBtnSecondary}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleExportGeneratedExcel}
                className={styles.actionBtnExcel}
              >
                <Download size={14} />
                <span>Export Excel Template (.csv)</span>
              </button>
              <button
                type="button"
                onClick={() => handleUseGeneratedId(generatedIdData.firstId)}
                className={styles.actionBtnPrimary}
              >
                <span>Use &ldquo;{generatedIdData.firstId}&rdquo; in Add Form</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: Add Single Certificate */}
      {showAddModal && (
        <div className={styles.modalBackdrop} onClick={() => !isSubmitting && setShowAddModal(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <Award className={styles.modalIcon} size={20} />
                <h3 className={styles.modalTitle}>Issue &amp; Register Certificate</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSingleSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <label className={styles.formLabel}>Certificate ID / Number *</label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddModal(false);
                          setShowIdGenModal(true);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#0b57d0",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          padding: 0,
                          textDecoration: "underline",
                        }}
                      >
                        Generate ID &rarr;
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CSAITIBT426001"
                      value={singleForm.certificateNumber}
                      onChange={(e) =>
                        setSingleForm({ ...singleForm, certificateNumber: e.target.value.toUpperCase() })
                      }
                      className={styles.formInput}
                      style={{ textTransform: "uppercase", fontFamily: "monospace", fontWeight: "700" }}
                    />
                    <span className={styles.formHint}>Unique identifier printed on the credential.</span>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ARMANDEEP SINGH"
                      value={singleForm.studentName}
                      onChange={(e) =>
                        setSingleForm({ ...singleForm, studentName: e.target.value.toUpperCase() })
                      }
                      className={styles.formInput}
                      style={{ textTransform: "uppercase" }}
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGridFull}`}>
                    <label className={styles.formLabel}>Program / Course Track *</label>
                    <input
                      type="text"
                      required
                      list="addCertProgramSuggestions"
                      placeholder="e.g. Artificial Intelligence or Full Stack Web Development"
                      value={singleForm.program}
                      onChange={(e) => setSingleForm({ ...singleForm, program: e.target.value })}
                      className={styles.formInput}
                    />
                    <datalist id="addCertProgramSuggestions">
                      {Array.from(new Set([...uniquePrograms, ...POPULAR_PROGRAM_SUGGESTIONS])).map((p) => (
                        <option key={p} value={p} />
                      ))}
                    </datalist>
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGridFull}`}>
                    <label className={styles.formLabel}>College / University / Institute Name</label>
                    <input
                      type="text"
                      placeholder="Leave blank or enter NA if Independent / Direct Trainee"
                      value={singleForm.collegeName}
                      onChange={(e) => setSingleForm({ ...singleForm, collegeName: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>College ID / Roll Number</label>
                    <input
                      type="text"
                      placeholder="Leave blank or enter NA if Not Applicable"
                      value={singleForm.collegeId}
                      onChange={(e) => setSingleForm({ ...singleForm, collegeId: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Duration / Hours</label>
                    <input
                      type="text"
                      placeholder="e.g. 50 Hrs. or 90 Days"
                      value={singleForm.duration}
                      onChange={(e) => setSingleForm({ ...singleForm, duration: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={styles.actionBtnSecondary}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.actionBtnPrimary}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin" />
                      <span>Saving to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Save &amp; Publish Certificate</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: Bulk Upload Certificates */}
      {showBulkModal && (
        <div className={styles.modalBackdrop} onClick={() => !isSubmitting && setShowBulkModal(false)}>
          <div className={`${styles.modalCard} ${styles.modalCardLarge}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <Upload className={styles.modalIcon} size={20} />
                <h3 className={styles.modalTitle}>Bulk Certificate Synchronization</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Template Download Bar */}
              <div className={styles.templateDownloadBar}>
                <div className={styles.templateDownloadLabel}>
                  <Download size={15} style={{ color: "#0b57d0" }} />
                  <span>Download Blank / Sample Templates:</span>
                </div>
                <div className={styles.templateDownloadBtns}>
                  <button
                    type="button"
                    onClick={handleDownloadCsvTemplate}
                    className={styles.actionBtnExcel}
                    style={{ height: "30px", fontSize: "0.76rem" }}
                    title="Download pre-formatted .CSV / Excel template with all required columns"
                  >
                    <Download size={13} />
                    <span>Download .CSV Template</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadJsonTemplate}
                    className={styles.actionBtnSecondary}
                    style={{ height: "30px", fontSize: "0.76rem" }}
                    title="Download pre-formatted .JSON template with schema sample"
                  >
                    <Download size={13} />
                    <span>Download .JSON Template</span>
                  </button>
                </div>
              </div>

              <div className={styles.tabNav}>
                <button
                  type="button"
                  onClick={() => setBulkTab("file")}
                  className={`${styles.tabBtn} ${bulkTab === "file" ? styles.tabBtnActive : ""}`}
                >
                  Upload JSON / CSV File
                </button>
                <button
                  type="button"
                  onClick={() => setBulkTab("paste")}
                  className={`${styles.tabBtn} ${bulkTab === "paste" ? styles.tabBtnActive : ""}`}
                >
                  Paste JSON Array
                </button>
              </div>

              {bulkTab === "file" ? (
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".json,.csv,.txt,.tsv"
                    style={{ display: "none" }}
                    onChange={handleFileUpload}
                  />
                  <div
                    className={styles.dropZone}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={32} className={styles.dropZoneIcon} />
                    <div className={styles.dropZoneTitle}>Click or drop your Excel (.csv) or .json certificate file here</div>
                    <div className={styles.dropZoneSub}>
                      Matches template columns: certificateNumber, studentName, program, collegeName, collegeId, duration
                    </div>
                  </div>
                  <div style={{ marginTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Need pre-generated IDs in an Excel template?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setShowBulkModal(false);
                        setShowIdGenModal(true);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0b57d0",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                        textDecoration: "underline",
                      }}
                    >
                      Generate IDs &amp; Export Excel Template &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.formGroup}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                    <label className={styles.formLabel} style={{ margin: 0 }}>Paste raw JSON Array of certificates:</label>
                    <button
                      type="button"
                      onClick={() => {
                        const sample = [
                          {
                            certificateNumber: "",
                            studentName: "",
                            program: "",
                            collegeName: "",
                            collegeId: "",
                            duration: ""
                          }
                        ];
                        handleBulkTextChange(JSON.stringify(sample, null, 2));
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#0b57d0",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                        textDecoration: "underline"
                      }}
                    >
                      Load Blank JSON Skeleton
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={bulkJsonText}
                    onChange={(e) => handleBulkTextChange(e.target.value)}
                    placeholder={`[\n  {\n    \"certificateNumber\": \"\",\n    \"studentName\": \"\",\n    \"program\": \"\",\n    \"collegeName\": \"\",\n    \"collegeId\": \"\",\n    \"duration\": \"\"\n  }\n]`}
                    className={styles.formTextarea}
                  />
                </div>
              )}

              {bulkError && (
                <div className={styles.errorBanner}>
                  <AlertCircle size={16} />
                  <span>{bulkError}</span>
                </div>
              )}

              {/* Realtime parsed preview box */}
              {bulkParsedPreview.length > 0 && (
                <div className={styles.previewBox}>
                  <div className={styles.previewHeader}>
                    <span>Preview &bull; {bulkParsedPreview.length} Records Found</span>
                    <span style={{ color: "#059669" }}>✓ Valid Format</span>
                  </div>
                  {bulkParsedPreview.slice(0, 5).map((row, idx) => (
                    <div key={idx} className={styles.previewItem}>
                      #{idx + 1}: {row.certificateNumber || row.certificate_number} &bull; {row.studentName || row.student_name} &bull; {row.program}
                    </div>
                  ))}
                  {bulkParsedPreview.length > 5 && (
                    <div className={styles.previewItem} style={{ color: "#64748b" }}>
                      ... and {bulkParsedPreview.length - 5} more records ready for Supabase sync.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className={styles.actionBtnSecondary}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkSubmit}
                disabled={isSubmitting || bulkParsedPreview.length === 0}
                className={styles.actionBtnPrimary}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Syncing {bulkParsedPreview.length} to Supabase...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Upload &amp; Sync {bulkParsedPreview.length} Certificates</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. MODAL: Edit Certificate */}
      {editingCert && (
        <div className={styles.modalBackdrop} onClick={() => !isSubmitting && setEditingCert(null)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitleGroup}>
                <Edit3 className={styles.modalIcon} size={20} />
                <h3 className={styles.modalTitle}>
                  Edit Certificate #{editingCert.certificateNumber || editingCert.certificate_number}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Certificate ID (Read Only)</label>
                    <input
                      type="text"
                      disabled
                      value={editingCert.certificateNumber || editingCert.certificate_number || ""}
                      className={styles.formInput}
                      style={{ background: "#f1f5f9", fontFamily: "monospace", fontWeight: "700" }}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Student Full Name *</label>
                    <input
                      type="text"
                      required
                      value={editingCert.studentName || editingCert.student_name || ""}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, studentName: e.target.value.toUpperCase(), student_name: e.target.value.toUpperCase() })
                      }
                      className={styles.formInput}
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGridFull}`}>
                    <label className={styles.formLabel}>Program / Track *</label>
                    <input
                      type="text"
                      required
                      value={editingCert.program || ""}
                      onChange={(e) => setEditingCert({ ...editingCert, program: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={`${styles.formGroup} ${styles.formGridFull}`}>
                    <label className={styles.formLabel}>College / University Name</label>
                    <input
                      type="text"
                      value={editingCert.collegeName || editingCert.college_name || ""}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, collegeName: e.target.value, college_name: e.target.value })
                      }
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>College ID / Roll No</label>
                    <input
                      type="text"
                      value={editingCert.collegeId || editingCert.college_id || ""}
                      onChange={(e) =>
                        setEditingCert({ ...editingCert, collegeId: e.target.value, college_id: e.target.value })
                      }
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Duration</label>
                    <input
                      type="text"
                      value={editingCert.duration || ""}
                      onChange={(e) => setEditingCert({ ...editingCert, duration: e.target.value })}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className={styles.actionBtnSecondary}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.actionBtnPrimary}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: Delete Certificate Confirmation Modal */}
      {deletingCert && (
        <div className={styles.modalBackdrop}>
          <div className={styles.deleteModalCard}>
            <div className={styles.deleteModalHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <div className={styles.deleteIconWrap}>
                  <Trash2 size={18} />
                </div>
                <div>
                  <h3 className={styles.deleteModalTitle}>Delete Certificate Record</h3>
                  <p className={styles.deleteModalSubtitle}>This action is permanent and cannot be undone.</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setDeletingCert(null)}
                className={styles.modalCloseBtn}
                disabled={isDeleting}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.deleteModalBody}>
              <div className={styles.deleteCertDetail}>
                <div><strong>Certificate ID:</strong> <span style={{ fontFamily: "monospace", color: "#002255", fontWeight: 700 }}>{deletingCert.certificateNumber || deletingCert.certificate_number}</span></div>
                <div><strong>Student Name:</strong> {deletingCert.studentName || deletingCert.student_name}</div>
                <div><strong>Program / Course:</strong> {deletingCert.program}</div>
                <div><strong>Institution / College:</strong> {deletingCert.collegeName || deletingCert.college_name || "Direct Candidate (Independent)"}</div>
                {!isNA(deletingCert.collegeId || deletingCert.college_id) && (
                  <div><strong>Roll / College ID:</strong> {deletingCert.collegeId || deletingCert.college_id}</div>
                )}
              </div>

              <div className={styles.deleteWarningBox}>
                ⚠️ Deleting this certificate will permanently invalidate its verification URL and remove the credential from the Supabase registry.
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                onClick={() => setDeletingCert(null)}
                className={styles.actionBtnSecondary}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteCert}
                className={styles.btnDanger}
                disabled={isDeleting}
              >
                <Trash2 size={14} />
                <span>{isDeleting ? "Deleting..." : "Permanently Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
