export const validateUrl = (url: string): boolean => {
  const urlRegex =
    /^((ftp|http|https):\/\/)?(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z]{1,}(\.[a-zA-Z]{1,})?(\/.*)?$/;
  return urlRegex.test(url);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/;

  return passwordRegex.test(password);
};
