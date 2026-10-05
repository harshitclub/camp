import { companyInfo } from "../../src/data/company.js";
import { headerNavLinks, footerQuickLinks, legalLinks } from "../../src/data/navigation.js";
import { contactChannels, contactFaqs } from "../../src/data/contact.js";

/**
 * 07 - Company Info, Navigation & Contact Channels Unit Tests
 */
export function runCompanyAndNavigationTests() {
  const results = {
    name: "Company Info, Navigation & Contact Channels",
    passed: 0,
    failed: 0,
    tests: [],
  };

  function assert(condition, testName, details = "") {
    if (condition) {
      results.passed++;
      results.tests.push({ pass: true, name: testName });
    } else {
      results.failed++;
      results.tests.push({ pass: false, name: testName, error: details });
    }
  }

  // 1. Company Information & Legal Entity
  assert(
    companyInfo.legalName === "Campussutras Private Limited",
    "Company Legal Name matches 'Campussutras Private Limited'",
    `Got "${companyInfo.legalName}"`
  );

  assert(
    companyInfo.name === "Campussutras",
    "Brand Name matches 'Campussutras'",
    `Got "${companyInfo.name}"`
  );

  assert(
    companyInfo.email === "info@campussutras.com",
    "Primary Support Email matches 'info@campussutras.com'",
    `Got "${companyInfo.email}"`
  );

  assert(
    typeof companyInfo.description === "string" && companyInfo.description.includes("50,000+"),
    "Company description accurately cites 50,000+ students trained milestone",
    `Description: ${companyInfo.description?.slice(0, 80)}...`
  );

  // 2. Canonical Internal Link Registry
  const requiredKeys = [
    "home",
    "courses",
    "about",
    "internship",
    "hire",
    "events",
    "verifyCertificate",
    "contact",
    "privacyPolicy",
    "termsAndConditions",
  ];

  let missingLinks = [];
  requiredKeys.forEach((key) => {
    if (!companyInfo.links?.[key] || !companyInfo.links[key].startsWith("/")) {
      missingLinks.push(`${key}: "${companyInfo.links?.[key]}"`);
    }
  });

  assert(
    missingLinks.length === 0,
    "All 10 Core Platform Links exist and are valid root paths",
    missingLinks.join("; ")
  );

  // 3. Header Navigation Links Structure
  assert(
    Array.isArray(headerNavLinks) && headerNavLinks.length === 4,
    "Header Navigation contains 4 top-level navigation blocks (Home, Courses, Internship, Company)",
    `Found ${headerNavLinks?.length} links`
  );

  let navErrors = [];
  headerNavLinks.forEach((nav) => {
    if (!nav.label || typeof nav.label !== "string") {
      navErrors.push(`Nav item has missing label`);
    }
    if (nav.isDropdown) {
      if (!Array.isArray(nav.children) || nav.children.length === 0) {
        navErrors.push(`Dropdown "${nav.label}" has empty children`);
      } else {
        nav.children.forEach((child) => {
          if (!child.label || !child.href || !child.href.startsWith("/")) {
            navErrors.push(`Child "${child.label}" has invalid href "${child.href}"`);
          }
        });
      }
    } else if (!nav.href || !nav.href.startsWith("/")) {
      navErrors.push(`Nav item "${nav.label}" has invalid href: "${nav.href}"`);
    }
  });

  assert(
    navErrors.length === 0,
    "All Header Navigation links and dropdown children have valid labels and root-relative hrefs",
    navErrors.join("; ")
  );

  // 4. Footer Quick Links & Legal Links
  assert(
    Array.isArray(footerQuickLinks) && footerQuickLinks.length >= 8,
    "Footer Quick Links contains at least 8 essential portal routes",
    `Found ${footerQuickLinks?.length} quick links`
  );

  assert(
    Array.isArray(legalLinks) && legalLinks.length === 3,
    "Footer Legal Links contains Privacy Policy, Terms, and Certificate Verification",
    `Found ${legalLinks?.length} legal links`
  );

  // 5. Contact Channels & FAQs
  assert(
    Array.isArray(contactChannels) && contactChannels.length >= 4,
    "Contact Channels include at least 4 communication channels",
    `Found ${contactChannels?.length} channels`
  );

  const emailChannel = contactChannels.find((c) => c.id === "email");
  assert(
    emailChannel && emailChannel.value === "info@campussutras.com" && emailChannel.href.startsWith("mailto:"),
    "Email Contact Channel is configured with info@campussutras.com and mailto link",
    `Found: ${JSON.stringify(emailChannel)}`
  );

  const verifyChannel = contactChannels.find((c) => c.id === "verification");
  assert(
    verifyChannel && verifyChannel.href === "/verify-certificate",
    "Verification Channel points directly to /verify-certificate",
    `Found: ${JSON.stringify(verifyChannel)}`
  );

  assert(
    Array.isArray(contactFaqs) && contactFaqs.length >= 4,
    "Contact Desk includes at least 4 curated FAQ items",
    `Found ${contactFaqs?.length} FAQs`
  );

  return results;
}
