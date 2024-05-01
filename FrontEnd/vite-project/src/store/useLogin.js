import { create } from "zustand";

const useLogin = create((set) => ({
  username: localStorage.getItem("username") || "",
  login: (newUsername) => {
    set({ username: newUsername });
    localStorage.setItem("username", newUsername);
  },
  logout: () => {
    set({ username: "" });
    localStorage.removeItem("username");
  },
}));

export default useLogin;
