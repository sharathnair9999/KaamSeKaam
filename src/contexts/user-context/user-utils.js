export const initialUserState = {
  email: "",
  name: "",
  isLoggedIn: false,
};

export const userToken =
  localStorage.getItem("authToken") ??
  JSON.parse(localStorage.getItem("authToken"));
