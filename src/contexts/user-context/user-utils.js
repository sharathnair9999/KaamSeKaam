export const initialUserState = {
  email: "",
  name: "",
  isLoggedIn: true,
};

export const userToken =
  localStorage.getItem("authToken") ??
  JSON.parse(localStorage.getItem("authToken"));
