import api, {atualizarPerfil} from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./perfilCandidato.module.css";

function ProfileCandidato() {
  const [perfil, setPerfil] = useState(null);
  const [editar, setEditar] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [candidaturas, setCandidaturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const InfosProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("Token no LocalStorage:", token);

      if (!token) {
        console.log("Nenhum token encontrado. Redirecionando para login...");
        navigate("/login/candidato"); 
        return;
      }

      try {
        const response = await api.get("/candidato/profile");
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error.response ? error.response.data : error);
        alert(`Erro ao carregar perfil: ${error.response?.data?.message || "Erro desconhecido"}`);
        localStorage.removeItem("token"); 
        localStorage.removeItem("tipoUsuario")
        navigate("/login/candidato");
      }
    };

    const vagasCandidatadas = async () =>{
      const token = localStorage.getItem("token");
      try{
        const response = await api.get("/candidato/candidaturas",{
          headers: {Authorization: `Bearer ${token}`}
        })
        setCandidaturas(response.data)
      }catch(error){
        console.error("Erro ao buscar vagas:", error)
      }
    }

    InfosProfile();
    vagasCandidatadas();
  }, [navigate]);

  const salvarEdicao = async () =>{
    const dadosAtualizados = {telefone, endereco};
    const resultado = await atualizarPerfil(dadosAtualizados);
    if(resultado){
      setPerfil(resultado);
      setEditar(false);
    }else{
      alert("Erro ao atualizar perfil.")
    }
  }

  const verDetalhes = async (idVaga)=>{
    navigate(`/candidatura/${idVaga}`)
  }

  const excluirCandidatura = async (id) =>{
    const token = localStorage.getItem("token");

    try{
      await api.delete(`candidato/candidaturas/${id}`,{
        headers: {Authorization: `Bearer ${token}`},
      });
      setCandidaturas((todasCandidaturas) => todasCandidaturas.filter(candidaturas => candidaturas._id !== id));  
    }catch(error){
      console.error("Erro ao excluir candidatura:", error);
      alert("Erro ao excluir a candidatura. Tente novamente.");
    }
  }


  if (!perfil) {
    return <div>Carregando...</div>;
  }

  return (
    <>
    <div className={styles.containerPerfil}>
    <div className={styles.profileContainer}>
    <div className={styles.profileHeader}>
    <div className={styles.profileHeaderH2}><h2>{perfil.nome}</h2></div>
    {/* <div><img src="/assets/perfil-teste.png"></img></div> */}
    </div>

    <div className={styles.profileInfos}>
    <p>{perfil.email}</p>

    {editar ? (
      <>
      <div className={styles.inputEdit}>
        <input 
        type="text"
        value={telefone}
        onChange={(e)=>setTelefone(e.target.value)}
        placeholder="Digite seu telefone"
        />

      <input
      type="text"
      value={endereco}
      onChange={(e)=>setEndereco(e.target.value)}
      placeholder="Digite seu endereço"
      />
      </div>

      <div className={styles.divButtons}>
      <button onClick={salvarEdicao}>Salvar</button>
      <button onClick={() => setEditar(false)}>Cancelar</button>
      </div>
      </>
    ) : (
      <>
              <p>Telefone: {perfil.telefone || "Não informado"}</p>
              <p>Endereço: {perfil.endereco || "Não informado"}</p>
              <div className={styles.divEdit}><button onClick={() => setEditar(true)} className={styles.btnEdit}>Editar</button></div>
      </>
    )}
    </div>
    <div className={styles.minhasCandidaturas}>
      <h3>Vagas em que me candidatei:</h3>
      {candidaturas.length === 0 ?(
        <p>Você não se candidatou a vagas</p>
          ):(
            <ul>
              {candidaturas.map((vaga) =>(
              <li key={vaga._id} className={styles.vagas}>
                 <div className={styles.vagasInfo}>
                    <h4>{vaga.id_vaga?.cargo}</h4>
                    <h4>{vaga.id_empresa?.nomeEmpresa}</h4>
                 </div>
                    <div className={styles.buttons}>
                      <button onClick={()=> verDetalhes(vaga.id_vaga?._id)}>Detalhes</button>
                    <button onClick={()=> excluirCandidatura(vaga._id)}>Excluir</button>
                </div>
              </li> 
              ))}
            </ul>
          )}
    </div>
    </div>
    </div>

    
    </>
  );
}

export default ProfileCandidato;
