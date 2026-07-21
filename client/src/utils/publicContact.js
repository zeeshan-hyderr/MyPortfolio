export const PUBLIC_EMAIL = "hyderzeeshan94@gmail.com";

export const resolvePublicEmail = (email) => {
  const trimmed = email?.trim();
  if (!trimmed) return PUBLIC_EMAIL;
  if (trimmed === "hyderzeshan94@gmail.com") return PUBLIC_EMAIL;
  return trimmed;
};