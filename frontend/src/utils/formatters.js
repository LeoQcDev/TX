export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}; 

export function formatYearAndNumber(year, number) {
  
  const formattedNumber = number.toString().padStart(4, "0");
  return `${year}${formattedNumber}`;
}