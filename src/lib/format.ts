/** "2025-07-06" → "2025.07" (시안의 메타 표기) */
export function formatYearMonth(date: string): string {
  const [year, month] = date.split("-");
  return month ? `${year}.${month}` : year;
}
