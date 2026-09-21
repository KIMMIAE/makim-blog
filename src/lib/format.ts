/** "2025-07-06" → "2025.07" (시안의 메타 표기) */
export function formatYearMonth(date: string): string {
  const [year, month] = date.split("-");
  return month ? `${year}.${month}` : year;
}

/** "2025-07-06" → "2025.07.06" (목록 페이지 날짜 열) */
export function formatDateDots(date: string): string {
  return date.replace(/-/g, ".");
}
