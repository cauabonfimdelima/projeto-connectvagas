import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./candidatura.module.css";

function CandidaturaCandidato(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [vaga, setVaga] = useState(null);
    const [curriculo, setCurriculo] = useState(null);
    

    useEffect(()=>{

        const token = localStorage.getItem("token");
        if(!token){
            alert("É necessário estar logado");
            navigate("/login/candidato")
            return;
        }

        const buscarVaga = async ()=>{
            try{
                const response = await api.get(`/candidatura/${id}`);
                console.log("Dados da vaga:", response.data); 
                setVaga(response.data)
            }
            catch(error){
                console.error("Erro ao buscar vaga:", error);
            }
        }

        buscarVaga();
    }, [id])

    const handleUpload = (e) =>{
        setCurriculo(e.target.files[0]);
    }

    const handleCandidatar = async (e) =>{
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log("Token no frontend:", token);
        
        if(!token){
            alert("É necessário estar logado para se candidatar.");
            navigate("/login/candidato");
            return;
        }
        try{
            const response = await api.get("/usuario/tipo", {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            })

            if(response.data.tipo === "empresa"){
                alert("Apenas candidatos podem se candidatar a vagas.")
                return;
            }else if(response.data.tipo !== "candidato"){
                alert("Candidato não encontrado")
                return;
            }

        if(!curriculo){
            alert("Envie seu currículo para concluir a candidatura.")
            return;
        }

        const formData = new FormData();
        formData.append("id_vaga", id);
        formData.append("curriculo", curriculo);        

        
            await api.post(`/candidatura/${id}`, formData, {
                headers:{
                    "Content-Type": "multipart/form-data",
               "Authorization": `Bearer ${token}`,
                }
            })
            alert("Candidatura enviada com sucesso!");
            navigate("/");
        }  catch (error) {
            console.error("Erro ao enviar candidatura:", error);
            alert("Ocorreu um erro ao enviar a candidatura. Tente novamente.");
        }
    }

    if(!vaga) return <p>Carregando vaga..</p>

    return(
        <>
        <div className={styles.details}>
            <h3>Detalhes da vaga.</h3>
            <p><strong>Cargo:</strong><br></br>{vaga.cargo}</p>
            <p><strong>Descrição completa da vaga:</strong><br />
            {vaga.descricao.split("\n").map((linha, index) => (
                <span key={index}>
                    {linha}
                    <br />
                </span>
            ))}
            </p>
            <p><strong>Local:</strong> {vaga.local_vaga}</p>
            <p><strong>Tipo da Vaga:</strong> {vaga.tipo_vaga}</p>
            <p><strong>Jornada de Trabalho:</strong> {vaga.modelo_trabalho}</p>
            <p><strong>Bolsa Auxílio:</strong> R$ {vaga.bolsa_auxilio},00</p>

            <h3 className={styles.titleFile}>Envie seu currículo para essa vaga!</h3>
            <form onSubmit={handleCandidatar}>
            <div className={styles.containerFile}>
            <input className={styles.file} type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
            </div>
            <button type="submit" className={styles.enviar}>Enviar Candidatura</button>
            </form>
        </div>
        </>
    )

}

export default CandidaturaCandidato;