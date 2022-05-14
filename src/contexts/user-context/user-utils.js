export const userDetails = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : null;

export const initialUserState = {
  email: userDetails?.email || "",
  name: userDetails?.name || "",
  photoURL: userDetails?.photoURL || "",
  uid: userDetails?.uid || "",
  isLoggedIn: userDetails?.name  ? true : false,
};
