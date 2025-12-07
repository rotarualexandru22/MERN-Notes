export function formatDate(date) {
  return date.toLocaleDateString("ro-RO", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}