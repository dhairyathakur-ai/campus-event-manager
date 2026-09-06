import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://campus-event-manager-shz9.onrender.com",
});

export default axiosInstance;