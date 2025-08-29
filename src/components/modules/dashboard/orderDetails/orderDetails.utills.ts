export const validateFeedback = (value: string) => {
  if (!value || value.trim().length < 10) {
    return "Feedback should be at least 10 characters";
  }
  if (value.length > 350) {
    return "Feedback cannot exceed 350 characters";
  }
  return true;
};
