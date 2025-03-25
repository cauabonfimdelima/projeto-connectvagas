import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:3001";

const api = axios.create({
    baseURL: API_URL,
})

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    console.log("Token enviado na requisição:", token);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//registrar candidato
export const registrarCandidato = async (dados) =>{
    try{
        const response = await api.post("/register/candidato", dados);
        return response.data;
    }catch(error){
        console.error("Erro ao registrar candidato:", error);
        return null;
    }
}

//registrar empresa
export const registrarEmpresa = async (dados) =>{
    try{
        const response = await api.post("/register/empresa", dados);
        return response.data;
    }catch(error){
        console.error("Erro ao registrar empresa:", error)
        return null;    
    }
}

//logar candidato
export const logarCandidato = async (email, senha)=>{
    try{
        const response = await api.post("/login/candidato", {email, senha});
        return response.data;
    }catch(error){
        console.error("Ocorreu um erro ao tentar logar: ", error)
        return null;
    }
}


//logar empresa
export const logarEmpresa = async (email, senha)=>{
    try{
        const response = await api.post("/login/empresa", {email, senha});
        return response.data;
    }catch(error){
        console.error("Ocorreu um erro ao tentar logar", error);
    }
}

//criar vaga
export const criarVaga = async (dados) =>{
    try{
        const response = await api.post("/publicarVaga", dados);
        return response.data;
    }catch(error){
        console.error("Ocorreu erro ao tentar publicar a vaga: ", error);
        return null;
    }
}


//lista de vagas
export const listarVagas = async ()=>{
    try{
        const response = await api.get("/");
        return response.data;
    }catch (error){
        console.error("Erro ao buscar vagas:", error);
        return null;
    }
};

//candidatar-se
export const candidatarVaga = async (id_vaga, curriculo)=>{
    try{
        const response = await api.post("/candidatar", {id_vaga, curriculo});
        return response.data;
    }catch(error){
        console.error("Erro ao se candidatar:", error);
        return null;
    }
}

//listar Candidaturas
export const listarCandidaturas = async (id_vaga) =>{
    try{
        const response = await api.get(`/candidaturas/${id_vaga}`);
        return response.data;
    }catch(error){
        console.error("Ocorreu um erro ao buscar candidaturas", error);
        return null;
    }
}

//atualizar perfil do candidato
export const atualizarPerfil = async(dados) =>{
    try{
        const response = await api.put("/candidato/profile", dados);
        return response.data;
    } catch(error){
        console.error("Erro ao atualizar perfil:", error)
        return null;
    }
}


export default api;