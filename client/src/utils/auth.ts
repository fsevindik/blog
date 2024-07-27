export const checkUserAuth = (): boolean => {
  const userId = localStorage.getItem("userId");
  return userId !== null;
};
