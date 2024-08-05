export const formatDate = (
  date?: number | Date | undefined,
  options: Intl.DateTimeFormatOptions | undefined = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string => {
  return new Intl.DateTimeFormat("id-ID", options).format(date);
};

export const formatTime = (date?: number | Date | undefined): string => {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatDatetime = (date?: number | Date | undefined): string => {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
