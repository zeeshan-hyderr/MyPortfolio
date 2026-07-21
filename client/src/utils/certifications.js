export const formatCertificationDate = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
};

export const isPdfFile = (certification) => {
  const mimeType = certification?.certificateFile?.mimeType || "";
  const url = certification?.certificateFile?.url || "";
  return mimeType === "application/pdf" || url.toLowerCase().includes(".pdf");
};
