import api from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./uploadvaga.module.css";

function UploadVaga() {

    const [cargo, setCargo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [local, setLocal] = useState("");
    const [tipo, setTipo] = useState("");
    const [turno, setTurno] = useState("");
    const [modelo, setModelo] = useState("");
    const [bolsa, setBolsa] = useState("");


    const navigate = useNavigate();

    const publicarVaga = async(e)=>{
        e.preventDefault();

        try{
            const response = await api.post("/empresa/publicarVaga" ,{
                cargo,
                descricao,
                local_vaga: local,
                tipo_vaga: tipo,
                turno_vaga: turno,
                modelo_trabalho: modelo,
                bolsa_auxilio: bolsa
            })

            if(response.status === 201){
                alert("Vaga publicada com sucesso!");
                navigate("/")
            }
        }
        catch(error){
            console.log("Erro ao publicar:", error);
            alert("Erro ao publicar vaga.");
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerInfos}>
                    <div className={styles.title}><h3>Insira as informações da vaga.</h3></div>

                    <div className={styles.containerForm}>
                        <form onSubmit={publicarVaga}>
                            <input className={styles.input} 
                            placeholder="Cargo da vaga..." 
                            value={cargo}
                            onChange={(e)=> setCargo(e.target.value)}
                            />
                            <textarea className={styles.textarea} 
                            placeholder="Descrição da vaga..."
                            value={descricao}
                            onChange={(e)=> setDescricao(e.target.value)}
                            ></textarea>

                            <select className={styles.select} 
                            value={local}
                            onChange={(e) => setLocal(e.target.value)}
                            required>
                                <option value="" disabled>Selecione local...</option>
                                <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
                            </select>

                            <select className={styles.select} 
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                            required>
                                <option value="" disabled>Selecione Tipo de Vaga...</option>
                                <option value="Estágio">Estágio</option>
                                <option value="Jovem aprendiz">Jovem Aprendiz</option>
                            </select>

                            <select className={styles.select}
                            value={turno}
                            onChange={(e) => setTurno(e.target.value)}
                            required>
                                <option value="" disabled>Selecione Turno...</option>
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                                <option value="Integral">Integral</option>
                            </select>

                            <select className={styles.select} 
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required>
                                <option value="" disabled>Selecione Modelo de Trabalho...</option>
                                <option value="Presencial">Presencial</option>
                                <option value="Hibrido">Híbrido</option>
                                <option value="Remoto">Remoto</option>
                            </select>

                            <input className={styles.input}
                             placeholder="Bolsa auxílio..." 
                             value={bolsa}
                             onChange={(e)=> setBolsa(e.target.value)}
                             />

                            <button className={styles.button} type="submit">Publicar Vaga</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UploadVaga;
