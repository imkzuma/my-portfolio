export const ParsedDateTime = (dateTime: string) => {
  const dateObj = new Date(dateTime);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // Note: Months are zero-based, so we add 1
  const day = dateObj.getDate();

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const newDateTime = `${day}/${month}/${year}, ${hours}:${minutes}`;

  return newDateTime;
}