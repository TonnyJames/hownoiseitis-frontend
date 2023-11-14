import AxiosConfig from "@/config/AxiosConfig";

export const buscarMedicoes = async () =>
    AxiosConfig.get("/consultar-medicoes/inicial/")
        .then( async (response=> response.data.json())).then(res => {
            return res
        })
