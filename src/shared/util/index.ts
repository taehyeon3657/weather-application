export function formatKoreanTime(dateInput: Date | number): string {
  const date = typeof dateInput === 'number' ? new Date(dateInput) : dateInput;

  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    hour12: true,
  }).format(date);
}
