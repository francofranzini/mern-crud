
import axios from "./axios.js";

//TODO: TIPAR USER
export const registerRequest = (user) => axios.post("/register", user);

export const loginRequest = (user) => axios.post("/login", user);

export const verifyTokenRequest = () => axios.get("/verify");

export const logoutRequest = (user) => axios.post("/logout", user)