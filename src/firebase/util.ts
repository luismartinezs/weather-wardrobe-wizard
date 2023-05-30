export function getAuthError(error: {
  code: string;
  message: string;
} | string) {
  if (!error) {
    return "";
  }
  switch (typeof error === 'string' ? error : error.code) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "There was an error.";
    case "auth/user-not-found":
      return "There was an error.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Unavailable email address.";
    case "auth/operation-not-allowed":
      return "This email address is not allowed.";
    default:
      return typeof error === 'string' ? error : error.message
  }
}