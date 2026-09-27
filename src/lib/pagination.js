/**
 * Utility to calculate smart pagination ranges with ellipsis (...).
 * Ensures clean, predictable, and responsive pagination even with hundreds of pages.
 *
 * @param {number} currentPage - Current active page number (1-indexed).
 * @param {number} totalPages - Total number of available pages.
 * @param {number} [siblingCount=1] - Number of siblings on each side of the active page.
 * @returns {Array<number|string>} Array containing page numbers and "..." ellipsis markers.
 */
export function getPaginationRange(currentPage, totalPages, siblingCount = 1) {
  const safeTotal = Math.max(1, Math.floor(Number(totalPages) || 1));
  const safeCurrent = Math.min(Math.max(1, Math.floor(Number(currentPage) || 1)), safeTotal);

  // If total pages is small (e.g. <= 7), show all page numbers
  const totalNumbersToShow = siblingCount * 2 + 5; // e.g. 1 + 2 + 1 + 2 + 1 = 7
  if (safeTotal <= totalNumbersToShow) {
    return Array.from({ length: safeTotal }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(safeCurrent - siblingCount, 1);
  const rightSiblingIndex = Math.min(safeCurrent + siblingCount, safeTotal);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < safeTotal - 2;

  // Case 1: No left dots to show, but right dots needed
  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", safeTotal];
  }

  // Case 2: No right dots to show, but left dots needed
  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => safeTotal - rightItemCount + i + 1
    );
    return [1, "...", ...rightRange];
  }

  // Case 3: Both left and right dots needed
  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "...", ...middleRange, "...", safeTotal];
  }

  return Array.from({ length: safeTotal }, (_, i) => i + 1);
}
