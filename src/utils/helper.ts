export function generateRoyalId() {
  // 9-digit random number
  const randomNum = Math.floor(100000000 + Math.random() * 900000000);
  return `RA${randomNum}`;
}

export function splitNameFromEmail(email: string) {
  const username = email.split("@")[0];
  const namePart = username.replace(/[._-]/g, " "); // Use a regex to replace all . _ and -
  // Capitalize the first letter of each word
  const name = namePart.replace(/\b\w/g, (char) => char.toUpperCase());
  return name;
}
