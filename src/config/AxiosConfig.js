import axios from "axios";

const api = axios.create({
    baseURL: "aqui vai o endereço do seu backend"
});
export default api;