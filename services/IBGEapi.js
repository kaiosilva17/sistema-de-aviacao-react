import axios from "axios";

const ibgeApi = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

export const getEstadosBrasileiros = async () => {
  try {
    const response = await ibgeApi.get("/estados?orderBy=nome");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estados da API do IBGE:", error);
    return [];
  }
};
