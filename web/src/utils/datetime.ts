export const formatLocalTime = (utcTime: string): string => {
  return new Date(utcTime).toLocaleString();
};

export const formatLocalDate = (utcTime: string): string => {
  return new Date(utcTime).toLocaleDateString();
};
