import { supabase } from "@/lib/supabase/client";
import { assessmentsList, assessmentCategories } from "@/data/assessmentsData";

// Initial Demo/Fallback Users for development and offline testing
const INITIAL_DEMO_USERS = [
  {
    id: "usr_001",
    full_name: "Aryan Sharma",
    email: "aryan.sharma@campussutras.com",
    user_type: "Student",
    phone: "+91 98765 43210",
    college_name: "IIT Delhi",
    company: null,
    course: "Computer Science & Engineering",
    github_url: "https://github.com/aryan-sharma",
    linkedin_url: "https://linkedin.com/in/aryan-sharma",
    is_verified: true,
    is_admin: true,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "usr_002",
    full_name: "Sneha Patel",
    email: "sneha.patel@gujarattech.edu",
    user_type: "Student",
    phone: "+91 98223 11456",
    college_name: "Gujarat Technological University",
    company: null,
    course: "Information Technology",
    github_url: "https://github.com/sneha-patel",
    linkedin_url: "https://linkedin.com/in/sneha-patel",
    is_verified: true,
    is_admin: false,
    created_at: "2024-02-10T14:30:00Z",
  },
  {
    id: "usr_003",
    full_name: "Rohan Verma",
    email: "rohan.verma@techsolutions.com",
    user_type: "Employee",
    phone: "+91 97112 33445",
    college_name: null,
    company: "Infosys Technologies",
    course: "Full Stack Web Development Bootcamp",
    github_url: "https://github.com/rohan-verma",
    linkedin_url: "https://linkedin.com/in/rohan-verma",
    is_verified: false,
    is_admin: false,
    created_at: "2024-03-01T09:15:00Z",
  },
  {
    id: "usr_004",
    full_name: "Pooja Reddy",
    email: "pooja.reddy@vit.ac.in",
    user_type: "Student",
    phone: "+91 99887 66554",
    college_name: "VIT Vellore",
    company: null,
    course: "Data Science & AI",
    github_url: "https://github.com/pooja-reddy",
    linkedin_url: "https://linkedin.com/in/pooja-reddy",
    is_verified: true,
    is_admin: false,
    created_at: "2024-03-18T16:45:00Z",
  },
  {
    id: "usr_005",
    full_name: "Vikram Malhotra",
    email: "vikram.malhotra@cloudcorp.io",
    user_type: "Employee",
    phone: "+91 91234 56780",
    college_name: null,
    company: "CloudCorp Technologies",
    course: "Cloud Architecture & DevOps",
    github_url: "https://github.com/vikram-malhotra",
    linkedin_url: "https://linkedin.com/in/vikram-malhotra",
    is_verified: false,
    is_admin: false,
    created_at: "2024-04-05T11:20:00Z",
  }
];

function isUuid(str) {
  if (!str || typeof str !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim());
}

// Helper to get local stored custom categories
export function getCustomCategories() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("campussutras_custom_categories") || "[]");
  } catch (e) {
    return [];
  }
}

// Helper to get all categories (Supabase DB + Custom + Static fallback)
export async function getAllCategories() {
  const map = new Map();
  
  // 1. Static fallback categories
  assessmentCategories.forEach((cat) => map.set(cat.slug, cat));

  // 2. Fetch live categories from Supabase
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (data && !error && data.length > 0) {
      data.forEach((cat) => {
        const existing = map.get(cat.slug) || {};
        map.set(cat.slug, {
          ...existing,
          id: cat.id,
          slug: cat.slug,
          name: cat.name || existing.name,
          color: cat.color_code || existing.color || "#0b57d0",
          description: cat.description || existing.description,
          is_custom: false,
        });
      });
    }
  } catch (err) {
    console.warn("[AdminService] getAllCategories db error:", err);
  }

  // 3. Custom localStorage categories
  const custom = getCustomCategories();
  custom.forEach((cat) => {
    if (!map.has(cat.slug)) {
      map.set(cat.slug, { ...cat, is_custom: true });
    }
  });
  
  const list = Array.from(map.values());
  const allCat = list.find((c) => c.slug === "all") || { id: "all", slug: "all", name: "All Categories" };
  const rest = list.filter((c) => c.slug !== "all");

  return [allCat, ...rest];
}

// Helper to save a custom category
export async function saveCustomCategory(category) {
  const slug = category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const payload = {
    ...category,
    slug,
    id: category.id || `cat_${Date.now()}`,
  };

  if (typeof window !== "undefined") {
    try {
      const existing = getCustomCategories();
      const updated = [
        payload,
        ...existing.filter((c) => c.slug !== payload.slug && c.id !== payload.id),
      ];
      localStorage.setItem("campussutras_custom_categories", JSON.stringify(updated));
    } catch (e) {
      console.error("[AdminService] saveCustomCategory localStorage error:", e);
    }

    // Try API route
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (result?.success && result?.data) {
        return result.data;
      }
    } catch (apiErr) {}
  }

  try {
    const { data } = await supabase.from("categories").upsert({
      slug: payload.slug,
      name: payload.name,
      description: payload.description,
      color_code: payload.color || payload.color_code || "#0b57d0",
    }, { onConflict: "slug" }).select().maybeSingle();

    if (data?.id) {
      payload.id = data.id;
    }
  } catch (err) {
    console.warn("[AdminService] saveCustomCategory db error:", err);
  }

  return payload;
}

// Helper to get local stored custom assessments
export function getCustomAssessments() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("campussutras_custom_assessments") || "[]");
  } catch (e) {
    return [];
  }
}

// Helper to get all assessments (Supabase DB + Static Catalog + Custom Created)
export async function getAllAssessments() {
  const map = new Map();

  // 1. Static list first as initial fallback
  assessmentsList.forEach((a) => {
    map.set(a.slug || a.id, {
      ...a,
      category_slug: a.category_id || a.category_slug,
      is_custom: false,
      is_published: a.is_published !== undefined ? a.is_published : true,
    });
  });

  // 2. Fetch live assessments from Supabase
  try {
    const [{ data: asms, error: asmErr }, { data: cats }] = await Promise.all([
      supabase.from("assessments").select("*, questions(*)").order("created_at", { ascending: true }),
      supabase.from("categories").select("*"),
    ]);

    const catIdToSlug = new Map((cats || []).map((c) => [c.id, c.slug]));
    const catNameToSlug = new Map((cats || []).map((c) => [c.name.toLowerCase().trim(), c.slug]));
    catNameToSlug.set("ai, ml & python", "ai-data");
    catNameToSlug.set("software & mobile dev", "web-software");
    catNameToSlug.set("data, cloud & security", "data-cloud");
    catNameToSlug.set("business & management", "business-management");
    catNameToSlug.set("marketing, design & career", "growth-career");

    if (asms && !asmErr && asms.length > 0) {
      asms.forEach((a) => {
        const sortedQuestions = (a.questions || []).sort(
          (x, y) => (x.question_number || 0) - (y.question_number || 0)
        );
        const fallbackAsm = map.get(a.slug) || {};
        const catSlug = 
          catIdToSlug.get(a.category_id) || 
          catNameToSlug.get((a.category_name || "").toLowerCase().trim()) || 
          fallbackAsm.category_id || 
          fallbackAsm.category_slug || 
          "all";

        map.set(a.slug || a.id, {
          ...fallbackAsm,
          ...a,
          category_slug: catSlug,
          category_id: a.category_id || catSlug,
          category_name: a.category_name || fallbackAsm.category_name,
          questions: sortedQuestions.length > 0 ? sortedQuestions : (fallbackAsm.questions || []),
          total_questions: a.total_questions || sortedQuestions.length || fallbackAsm.total_questions || 15,
          is_custom: false,
        });
      });
    }
  } catch (err) {
    console.warn("[AdminService] getAllAssessments db error:", err);
  }

  // 3. Custom list from localStorage (can override or add)
  const custom = getCustomAssessments();
  custom.forEach((a) => {
    map.set(a.slug || a.id, {
      ...a,
      is_custom: true,
      is_published: a.is_published !== undefined ? a.is_published : true,
    });
  });

  return Array.from(map.values());
}

// Helper to fetch a single assessment by ID or Slug (Supabase DB with Fallback)
export async function getAssessmentById(idOrSlug) {
  if (!idOrSlug) return null;
  const cleanId = String(idOrSlug).trim();
  const isTargetUuid = isUuid(cleanId);

  // 1. Query Supabase
  try {
    let query = supabase.from("assessments").select("*, questions(*)");
    if (isTargetUuid) {
      query = query.or(`slug.eq.${cleanId},id.eq.${cleanId}`);
    } else {
      query = query.eq("slug", cleanId);
    }

    const { data, error } = await query.maybeSingle();

    if (data && !error) {
      const sortedQuestions = (data.questions || []).sort(
        (a, b) => (a.question_number || 0) - (b.question_number || 0)
      );

      // If database has questions, return full assessment
      if (sortedQuestions.length > 0) {
        return {
          ...data,
          questions: sortedQuestions,
          total_questions: data.total_questions || sortedQuestions.length,
        };
      }

      // If database has assessment row but questions are missing, check static or local fallback
      const staticMatch = assessmentsList.find((a) => a.slug === cleanId || a.id === cleanId);
      if (staticMatch && staticMatch.questions?.length > 0) {
        return {
          ...data,
          questions: staticMatch.questions,
          total_questions: staticMatch.questions.length,
        };
      }

      if (typeof window !== "undefined") {
        try {
          const customList = JSON.parse(localStorage.getItem("campussutras_custom_assessments") || "[]");
          const customFound = customList.find((a) => a.id === cleanId || a.slug === cleanId);
          if (customFound && customFound.questions?.length > 0) {
            return {
              ...data,
              questions: customFound.questions,
              total_questions: customFound.questions.length,
            };
          }
        } catch (e) {}
      }

      // Return assessment even with whatever questions exist
      return {
        ...data,
        questions: sortedQuestions,
        total_questions: data.total_questions || sortedQuestions.length || 0,
      };
    }
  } catch (err) {
    console.warn("[AdminService] getAssessmentById db error:", err);
  }

  // 2. Static catalog fallback
  const staticFound = assessmentsList.find(
    (a) => a.id === cleanId || a.slug === cleanId
  );
  if (staticFound) return staticFound;

  // 3. Custom localStorage fallback
  if (typeof window !== "undefined") {
    try {
      const customList = JSON.parse(localStorage.getItem("campussutras_custom_assessments") || "[]");
      const customFound = customList.find(
        (a) => a.id === cleanId || a.slug === cleanId
      );
      if (customFound) return customFound;
    } catch (e) {}
  }

  return null;
}

// Save or Update Assessment
export async function saveAssessment(assessmentData) {
  const id = assessmentData.id || `custom_${Date.now()}`;
  const slug = assessmentData.slug || assessmentData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  
  const payload = {
    ...assessmentData,
    id,
    slug,
    total_questions: assessmentData.questions?.length || assessmentData.total_questions || 15,
    updated_at: new Date().toISOString(),
    created_at: assessmentData.created_at || new Date().toISOString(),
  };

  // 1. Save to LocalStorage for instant client responsiveness
  if (typeof window !== "undefined") {
    try {
      const existing = getCustomAssessments();
      const updated = [
        payload,
        ...existing.filter((a) => a.id !== id && a.slug !== slug),
      ];
      localStorage.setItem("campussutras_custom_assessments", JSON.stringify(updated));
    } catch (e) {
      console.warn("[AdminService] saveAssessment localStorage error:", e);
    }
  }

  // 2. Save via Backend API Route (resolves category UUID & inserts questions)
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/admin/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (result?.success && result?.data) {
        return {
          ...payload,
          db_id: result.data.id,
          category_id: result.data.category_id,
        };
      }
    } catch (apiErr) {
      console.warn("[AdminService] saveAssessment API notice:", apiErr);
    }
  }

  // 3. Direct Supabase Fallback
  try {
    let resolvedCategoryUuid = null;
    if (isUuid(payload.category_id)) {
      resolvedCategoryUuid = payload.category_id;
    } else {
      const targetSlug = payload.category_slug || payload.category_id || payload.category_name;
      const { data: matchedCat } = await supabase
        .from("categories")
        .select("*")
        .or(`slug.eq.${targetSlug},name.ilike.${payload.category_name || targetSlug}`)
        .maybeSingle();

      if (matchedCat?.id) {
        resolvedCategoryUuid = matchedCat.id;
      }
    }

    const dbPayload = {
      slug: payload.slug,
      title: payload.title,
      category_id: resolvedCategoryUuid,
      category_name: payload.category_name,
      difficulty: payload.difficulty,
      tags: payload.tags,
      description: payload.description,
      total_questions: payload.total_questions,
      duration_minutes: payload.duration_minutes,
      passing_percentage: payload.passing_percentage,
      is_published: payload.is_published,
      updated_at: payload.updated_at,
    };

    if (isUuid(payload.id)) {
      dbPayload.id = payload.id;
    }

    const { data: dbData } = await supabase
      .from("assessments")
      .upsert(dbPayload, { onConflict: "slug" })
      .select()
      .maybeSingle();

    if (dbData?.id) {
      payload.db_id = dbData.id;
      payload.category_id = dbData.category_id;

      if (Array.isArray(payload.questions) && payload.questions.length > 0) {
        await supabase.from("questions").delete().eq("assessment_id", dbData.id);
        const qsToInsert = payload.questions.map((q, idx) => ({
          assessment_id: dbData.id,
          question_number: idx + 1,
          question_text: q.question_text || "",
          code_snippet: q.code_snippet || null,
          options: Array.isArray(q.options) ? q.options : ["", "", "", ""],
          correct_option_index: Number(q.correct_option_index || 0),
          explanation: q.explanation || "",
          topic: q.topic || null,
        }));
        await supabase.from("questions").insert(qsToInsert);
      }
    }
  } catch (err) {
    console.warn("[AdminService] Direct Supabase save error:", err);
  }

  return payload;
}

// Delete Assessment
export async function deleteAssessment(idOrSlug) {
  if (!idOrSlug) return false;
  const cleanId = String(idOrSlug).trim();
  const isTargetUuid = isUuid(cleanId);

  if (typeof window !== "undefined") {
    try {
      const existing = getCustomAssessments();
      const filtered = existing.filter((a) => a.id !== cleanId && a.slug !== cleanId);
      localStorage.setItem("campussutras_custom_assessments", JSON.stringify(filtered));
    } catch (e) {
      console.warn("[AdminService] deleteAssessment error:", e);
    }

    try {
      await fetch(`/api/admin/assessments?id=${encodeURIComponent(cleanId)}`, {
        method: "DELETE",
      });
    } catch (e) {}
  }

  try {
    let query = supabase.from("assessments").delete();
    if (isTargetUuid) {
      query = query.or(`id.eq.${cleanId},slug.eq.${cleanId}`);
    } else {
      query = query.eq("slug", cleanId);
    }
    await query;
  } catch (err) {
    // Silently ignore
  }

  return true;
}

// Get All Users (Admin API + Local Fallback)
export async function getAllUsers() {
  const usersMap = new Map();

  // 1. Fetch from live Admin API Route (bypasses RLS with Service Role and forces fresh fetch)
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/admin/users?t=${Date.now()}`, {
        cache: "no-store",
      });
      const result = await res.json().catch(() => ({}));
      if (result?.success && Array.isArray(result?.data)) {
        result.data.forEach((u) => {
          if (u?.id) usersMap.set(u.id, u);
        });
      }
    } catch (apiErr) {
      console.warn("[AdminService] Live users API fetch error:", apiErr);
    }
  }

  // 2. Direct Supabase Fallback
  if (usersMap.size === 0) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        data.forEach((u) => {
          if (u?.id) usersMap.set(u.id, u);
        });
      }
    } catch (e) {
      console.warn("[AdminService] Supabase fetch profiles notice:", e);
    }
  }

  // 3. Aggregate from local registered users
  if (typeof window !== "undefined") {
    try {
      const localUsers = JSON.parse(localStorage.getItem("campussutras_admin_users") || "[]");
      localUsers.forEach((u) => {
        if (u?.id) {
          const existing = usersMap.get(u.id) || {};
          usersMap.set(u.id, { ...existing, ...u });
        }
      });
    } catch (e) {
      // ignore
    }
  }

  // 4. Populate initial demo users only if zero total users exist
  if (usersMap.size === 0) {
    INITIAL_DEMO_USERS.forEach((u) => usersMap.set(u.id, u));
  }

  return Array.from(usersMap.values());
}

// Update User Profile by Admin
export async function updateUserByAdmin(userId, updateData) {
  const payload = {
    ...updateData,
    updated_at: new Date().toISOString(),
  };

  // 1. Update in local storage
  if (typeof window !== "undefined") {
    try {
      const allUsers = await getAllUsers();
      const updatedList = allUsers.map((u) => (u.id === userId ? { ...u, ...payload } : u));
      localStorage.setItem("campussutras_admin_users", JSON.stringify(updatedList));
    } catch (e) {
      console.warn("[AdminService] Local user update notice:", e);
    }

    // 2. Update via Admin API Route
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, ...payload }),
      });
      const result = await res.json().catch(() => ({}));
      if (result?.success && result?.data) {
        return result.data;
      }
    } catch (apiErr) {
      console.warn("[AdminService] Update user API error:", apiErr);
    }
  }

  // 3. Direct Supabase Fallback
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", userId)
      .select()
      .maybeSingle();

    if (!error && data) return data;
  } catch (err) {
    console.warn("[AdminService] Supabase update user error:", err);
  }

  return payload;
}

// Delete User Profile and Auth by Admin
export async function deleteUserByAdmin(userId) {
  if (!userId) return false;
  const cleanId = String(userId).trim();

  // 1. Remove from local storage
  if (typeof window !== "undefined") {
    try {
      const localUsers = JSON.parse(localStorage.getItem("campussutras_admin_users") || "[]");
      const filtered = localUsers.filter((u) => u.id !== cleanId);
      localStorage.setItem("campussutras_admin_users", JSON.stringify(filtered));
    } catch (e) {
      console.warn("[AdminService] Local user delete notice:", e);
    }

    // 2. Delete via Admin API Route
    try {
      const res = await fetch(`/api/admin/users?id=${encodeURIComponent(cleanId)}`, {
        method: "DELETE",
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result?.success) {
        return true;
      }
    } catch (apiErr) {
      console.warn("[AdminService] Delete user API error:", apiErr);
    }
  }

  // 3. Direct Supabase Fallback
  try {
    await supabase.from("profiles").delete().eq("id", cleanId);
  } catch (err) {
    console.warn("[AdminService] Direct delete profile error:", err);
  }

  return true;
}

// Get All Assessment Attempts across all students for Analytics & Audits
export async function getAllAttempts() {
  const attemptsMap = new Map();

  // 1. Read from Admin API (live database via Service Role)
  if (typeof window !== "undefined") {
    try {
      const res = await fetch(`/api/admin/attempts?t=${Date.now()}`, {
        cache: "no-store",
      });
      const result = await res.json().catch(() => ({}));
      if (result?.success && Array.isArray(result?.data)) {
        result.data.forEach((att) => {
          const key = att.id || `${att.user_id}_${att.assessment_id}_${att.submitted_at}`;
          attemptsMap.set(key, att);
        });
      }
    } catch (apiErr) {
      console.warn("[AdminService] Live attempts API error:", apiErr);
    }
  }

  // 2. Direct Supabase query fallback
  if (attemptsMap.size === 0) {
    try {
      const { data, error } = await supabase
        .from("assessment_attempts")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        data.forEach((att) => {
          const key = att.id || `${att.user_id}_${att.assessment_id}_${att.submitted_at}`;
          attemptsMap.set(key, { ...attemptsMap.get(key), ...att });
        });
      }
    } catch (e) {
      console.warn("[AdminService] Supabase fetch attempts notice:", e);
    }
  }

  // 3. Read from localStorage fallbacks
  if (typeof window !== "undefined") {
    try {
      const globalAttempts = JSON.parse(localStorage.getItem("campussutras_all_attempts") || "[]");
      globalAttempts.forEach((att) => {
        if (att?.id || att?.assessment_id) {
          const key = att.id || `${att.user_id || "guest"}_${att.assessment_id || att.assessment_slug}_${att.submitted_at || Date.now()}`;
          if (!attemptsMap.has(key)) {
            attemptsMap.set(key, att);
          }
        }
      });

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("campussutras_attempts_")) {
          const userAtts = JSON.parse(localStorage.getItem(key) || "[]");
          userAtts.forEach((att) => {
            if (att?.id || att?.assessment_id) {
              const attemptKey = att.id || `${att.user_id || "guest"}_${att.assessment_id || att.assessment_slug}_${att.submitted_at || Date.now()}`;
              if (!attemptsMap.has(attemptKey)) {
                attemptsMap.set(attemptKey, att);
              }
            }
          });
        }
      }
    } catch (e) {
      console.warn("[AdminService] Local storage attempts read notice:", e);
    }
  }

  return Array.from(attemptsMap.values());
}

// --------------------------------------------------------------------------
// Form Submissions Management (Contact, Internship, Hiring, Course Enrollment)
// --------------------------------------------------------------------------

export async function getAllFormSubmissions() {
  try {
    const res = await fetch("/api/admin/forms?type=all", {
      cache: "no-store",
    });
    const result = await res.json().catch(() => ({}));
    if (result?.success && result?.data) {
      return result;
    }
  } catch (err) {
    console.warn("[AdminService] getAllFormSubmissions error:", err);
  }

  // Fallback: Query directly via Supabase browser client
  try {
    const [
      { data: contactData },
      { data: internshipData },
      { data: hireData },
      { data: courseData },
    ] = await Promise.all([
      supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("internship_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("hiring_inquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("course_registrations").select("*").order("created_at", { ascending: false }),
    ]);

    return {
      success: true,
      data: {
        contact: contactData || [],
        internship: internshipData || [],
        hire: hireData || [],
        courseEnroll: courseData || [],
      },
      counts: {
        contact: (contactData || []).length,
        internship: (internshipData || []).length,
        hire: (hireData || []).length,
        courseEnroll: (courseData || []).length,
        total:
          (contactData || []).length +
          (internshipData || []).length +
          (hireData || []).length +
          (courseData || []).length,
      },
    };
  } catch (supabaseErr) {
    console.warn("[AdminService] Supabase direct fallback error:", supabaseErr);
    return {
      success: false,
      data: { contact: [], internship: [], hire: [], courseEnroll: [] },
      counts: { contact: 0, internship: 0, hire: 0, courseEnroll: 0, total: 0 },
    };
  }
}

export async function deleteFormSubmission(type, id) {
  try {
    const res = await fetch(`/api/admin/forms?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const result = await res.json().catch(() => ({}));
    if (result?.success) return true;
  } catch (err) {
    console.warn("[AdminService] deleteFormSubmission API error:", err);
  }

  const tableMap = {
    contact: "contact_inquiries",
    internship: "internship_applications",
    hire: "hiring_inquiries",
    "course-enroll": "course_registrations",
  };

  const tableName = tableMap[type];
  if (tableName) {
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    return !error;
  }

  return false;
}

export async function updateFormSubmissionStatus(type, id, status) {
  try {
    const res = await fetch("/api/admin/forms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, status }),
    });
    const result = await res.json().catch(() => ({}));
    if (result?.success) return result.data || { id, status };
  } catch (err) {
    console.warn("[AdminService] updateFormSubmissionStatus API error:", err);
  }

  const tableMap = {
    contact: "contact_inquiries",
    internship: "internship_applications",
    hire: "hiring_inquiries",
    "course-enroll": "course_registrations",
  };

  const tableName = tableMap[type];
  if (tableName) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update({ status })
        .eq("id", id)
        .select();
      if (!error) return data?.[0] || { id, status };
    } catch (dbErr) {
      console.warn("[AdminService] Supabase fallback status update error:", dbErr);
    }
  }

  return null;
}

// ==============================================================================
// CERTIFICATES MANAGEMENT
// ==============================================================================

/**
 * Fetch all certificates with optional search and program filter
 */
export async function getAllCertificates({ query = "", program = "all", page = 1, limit = 1000 } = {}) {
  // 1. Try Admin API Route
  try {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (program && program !== "all") params.set("program", program);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));

    const res = await fetch(`/api/admin/certificates?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return {
          certificates: json.data,
          total: json.count || json.data.length,
          source: json.source || "supabase",
        };
      }
    }
  } catch (apiErr) {
    console.warn("[AdminService] getAllCertificates API call warn:", apiErr);
  }

  // 2. Direct Supabase Query Fallback
  try {
    let q = supabase
      .from("certificates")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (query.trim()) {
      const term = query.trim();
      q = q.or(
        `certificate_number.ilike.%${term}%,student_name.ilike.%${term}%,college_name.ilike.%${term}%,program.ilike.%${term}%`
      );
    }

    if (program && program !== "all") {
      q = q.ilike("program", `%${program.trim()}%`);
    }

    const { data, count, error } = await q;

    if (!error && data) {
      const mapped = data.map((item) => ({
        id: item.id,
        certificateNumber: item.certificate_number,
        studentName: item.student_name,
        collegeId: item.college_id,
        program: item.program,
        duration: item.duration,
        collegeName: item.college_name,
        issueDate: item.issue_date,
        completionDate: item.completion_date,
        status: item.status || "VERIFIED_AUTHENTIC",
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));

      return {
        certificates: mapped,
        total: count ?? mapped.length,
        source: "supabase",
      };
    }
  } catch (dbErr) {
    console.warn("[AdminService] getAllCertificates Supabase direct error:", dbErr);
  }

  return {
    certificates: [],
    total: 0,
    source: "empty",
  };
}

/**
 * Create a single certificate
 */
export async function createCertificate(certData) {
  try {
    const res = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(certData),
    });

    const result = await res.json().catch(() => ({}));
    if (res.ok && result.success) {
      return { success: true, data: result.data, message: result.message };
    }
    return { success: false, message: result.message || "Failed to create certificate" };
  } catch (err) {
    console.error("[AdminService] createCertificate error:", err);
    return { success: false, message: err.message || "Network error while creating certificate" };
  }
}

/**
 * Bulk upload certificates (array of objects)
 */
export async function bulkUploadCertificates(certList) {
  try {
    const res = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificates: certList }),
    });

    const result = await res.json().catch(() => ({}));
    if (res.ok && result.success) {
      return {
        success: true,
        message: result.message,
        processedCount: result.processedCount,
        warningCount: result.warningCount,
        errors: result.errors || [],
      };
    }
    return {
      success: false,
      message: result.message || "Failed to process bulk upload",
      errors: result.errors || [],
    };
  } catch (err) {
    console.error("[AdminService] bulkUploadCertificates error:", err);
    return { success: false, message: err.message || "Network error while bulk uploading" };
  }
}

/**
 * Update an existing certificate
 */
export async function updateCertificate(certData) {
  try {
    const res = await fetch("/api/admin/certificates", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(certData),
    });

    const result = await res.json().catch(() => ({}));
    if (res.ok && result.success) {
      return { success: true, data: result.data, message: result.message };
    }
    return { success: false, message: result.message || "Failed to update certificate" };
  } catch (err) {
    console.error("[AdminService] updateCertificate error:", err);
    return { success: false, message: err.message || "Network error while updating certificate" };
  }
}

/**
 * Delete a certificate
 */
export async function deleteCertificate(idOrNumber) {
  try {
    const params = new URLSearchParams();
    if (isUuid(idOrNumber)) {
      params.set("id", idOrNumber);
    } else {
      params.set("certificateNumber", idOrNumber);
    }

    const res = await fetch(`/api/admin/certificates?${params.toString()}`, {
      method: "DELETE",
    });

    const result = await res.json().catch(() => ({}));
    if (res.ok && result.success) {
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message || "Failed to delete certificate" };
  } catch (err) {
    console.error("[AdminService] deleteCertificate error:", err);
    return { success: false, message: err.message || "Network error while deleting certificate" };
  }
}
