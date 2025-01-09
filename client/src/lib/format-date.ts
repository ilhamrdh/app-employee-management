export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);

  return formattedDate.replace(', ', ' - ');
}
