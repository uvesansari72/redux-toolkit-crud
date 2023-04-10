import axios from "axios";
const BASE_URL ="http://localhost:8000"

const Axiosinstance = axios.create({
    baseURL:BASE_URL
})

export default Axiosinstance;