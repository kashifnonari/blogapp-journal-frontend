import axios from "axios";

// 🔹 Create a reusable Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // allows cookies to be sent
});

export default api;
