import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./editar.module.css"
import api from "../../services/api";

function EditarVaga(){
    const {id} = useParams();
    const [vaga, setVaga] = useState({
        cargo: "",
        descricao: "",
        local_vaga: "",
        tipo_vaga: "",
        turno_vaga:"",
        modelo_trabalho:"",
        bolsa_auxilio: "",
    });
    const navigate = useNavigate();
    
    useEffect(()=>{
        const buscarVaga = async () =>{
       try{
           const response = await api.get(`/empresa/vagas/${id}`);
           const dadosVaga = response.data
           console.log(response.data);
           setVaga({
               cargo: dadosVaga.cargo,
               descricao: dadosVaga.descricao,
               local_vaga: dadosVaga.local_vaga,
               tipo_vaga: dadosVaga.tipo_vaga,
               turno_vaga: dadosVaga.turno_vaga,
               modelo_trabalho: dadosVaga.modelo_trabalho,
               bolsa_auxilio: dadosVaga.bolsa_auxilio,
           });
        }catch(error){
            console.error("Erro ao buscar dados da vaga:", error);
        }
    };

    buscarVaga();
    }, [id])

    const handleEditVaga = async (e)=>{
        e.preventDefault();
        try{
            await api.put(`/empresa/vagas/editar/${id}`, vaga);
            alert("Vaga atualizada com sucesso")
            navigate("/");
        }catch(error){
            console.error("Erro ao editar vaga:", error);
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerInfos}>
                 <div className={styles.title}><h3>Edite as informações da vaga.</h3></div>
                <div className={styles.containerForm}>
                <form onSubmit={handleEditVaga}>
                    <input className={styles.input} 
                    placeholder="Cargo da vaga..." 
                    value={vaga.cargo}
                    onChange={(e)=> setVaga({...vaga, cargo: e.target.value})}
                     />
                       <textarea className={styles.textarea} 
                        placeholder="Descrição da vaga..."
                        value={vaga.descricao}
                        onChange={(e)=> setVaga({...vaga, descricao: e.target.value})}
                        ></textarea>
                    
                    <select className={styles.select} 
                    value={vaga.local_vaga}
                    onChange={(e) => setVaga({...vaga, local_vaga: e.target.value})}
                     required>
                   <option value="" disabled>Selecione local...</option>
                    <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
                    </select>                      
                    
                    <select className={styles.select} 
                    value={vaga.tipo_vaga}
                    onChange={(e) => setVaga({...vaga, tipo_vaga: e.target.value})}
                    required>
                  <option value="" disabled>Selecione Tipo de Vaga...</option>
                  <option value="estágio">Estágio</option>
                  <option value="jovem aprendiz">Jovem Aprendiz</option>
                </select>
                    
                 <select className={styles.select}
                  value={vaga.turno_vaga}
                onChange={(e) => setVaga({...vaga, turno_vaga: e.target.value})}
                required>
                <option value="" disabled>Selecione Turno...</option>
                <option value="matutino">Matutino</option>
                <option value="vespertino">Vespertino</option>
                <option value="integral">Integral</option>
                </select>
                    
              <select className={styles.select} 
              value={vaga.modelo_trabalho}
             onChange={(e) =>setVaga({...vaga, modelo_trabalho: e.target.value})}
             required>
            <option value="" disabled>Selecione Modelo de Trabalho...</option>
            <option value="presencial">Presencial</option>
            <option value="hibrido">Híbrido</option>
            <option value="remoto">Remoto</option>
            </select>
                    
            <input className={styles.input}
            placeholder="Bolsa auxílio..." 
            value={vaga.bolsa_auxilio}
             onChange={(e)=> setVaga({...vaga, bolsa_auxilio: e.target.value})}
            />

            <button className={styles.button} type="submit">Salvar Alterações</button>
            </form>
            </div>
            </div>
            </div>
            </>
);
}

export default EditarVaga;