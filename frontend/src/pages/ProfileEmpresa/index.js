import api, {atualizarPerfil} from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./perfilEmpresa.module.css"


function ProfileEmpresa() {
  const [perfil, setPerfil] = useState(null);
  const [minhasVagas, setMinhasVagas] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [mostrarCandidatos, setMostrarCandidatos] = useState(false);
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
        const response = await api.get("/empresa/profile");
        setPerfil(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error.response ? error.response.data : error);
        alert(`Erro ao carregar perfil: ${error.response?.data?.message || "Erro desconhecido"}`);
        localStorage.removeItem("token"); 
        localStorage.removeItem("tipoUsuario")
        navigate("/login/empresa");
      }
    };

    const listarMinhasVagas = async ()=>{
      const token = localStorage.getItem("token")
      try{
        const response = await api.get("/empresa/vagas",{
          headers: {Authorization: `Bearer ${token}`}
        });
        setMinhasVagas(response.data);
      }catch(error){
        console.error("Erro ao buscar vagas:", error)
      }
    }

    InfosProfile();
    listarMinhasVagas();
  }, [navigate]);

  const editarVaga  = (id) =>{
    navigate(`/empresa/vagas/editar/${id}`);
  }


  const excluirVaga = async (id) =>{
    const token = localStorage.getItem("token");
    try{
      await api.delete(`/empresa/vagas/${id}`,{
        headers: {Authorization: `Bearer ${token}`}
      });
      setMinhasVagas((minhasVagas) => minhasVagas.filter(vagas => vagas._id !== id))
    }catch(error){
      console.error("Erro ao excluir candidatura:", error);
      alert("Erro ao excluir a candidatura. Tente novamente.");
    }
  }

  const verCandidatos = async(id)=>{
    const token = localStorage.getItem("token")
    try{
      const response = await api.get(`/empresa/vagas/${id}/candidatos`,{
        headers: {Authorization: `Bearer ${token}`},
      });
      setCandidatos(response.data)
      setMostrarCandidatos(true);

    }catch(error){
      console.error("Erro ao buscar candidatos:", error);
      alert("Não há candidatos nessa vaga.");
    }
  }

  const verCurriculo = (curriculo) =>{
    const link = document.createElement('a');  // Cria um link
    link.href = `http://localhost:3001/uploads/${curriculo}`;  // Define o caminho do arquivo
    link.target = '_blank';  // Abre em uma nova aba
    link.download = curriculo;  // Define o nome do arquivo a ser baixado
    link.click();  // Simula o clique no link para iniciar o download
  }

  if (!perfil) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <div className={styles.container}>
    <div className={styles.profileContainer}>
    <div className={styles.profileHeader}>
    <div className={styles.profileHeaderH2}><h2>{perfil.nomeEmpresa}</h2></div>
    {/* <div><img src="/assets/perfil-teste.png"></img></div> */}
    </div>

    <div className={styles.profileInfos}>
    <p>{perfil.email}</p>
    <p>CNPJ: {perfil.cnpj}</p>
    <p>CEP: {perfil.cep}</p>
    </div>

    <div className={styles.minhasVagas}>
    <h3>Minhas vagas:</h3>
      {minhasVagas.length === 0 ? (
        <p>Você não tem vagas cadastradas</p>
      ):( 
        

        <ul>
          {minhasVagas.map((vaga) =>(
            <li key={vaga._id} className={styles.vagas}>
            <div className={styles.vagasInfo}>
              <h4>{vaga.cargo}</h4>
              {/* <h4>Descrição: {vaga.descricao}</h4> */}
              {/* <h4>Bolsa: {vaga.bolsa_auxilio}</h4> */}
            </div>
            <div className={styles.buttons}>
            <button onClick={() => editarVaga(vaga._id)}>Editar</button>
            <button onClick={()=> excluirVaga(vaga._id)}>Excluir</button>
            <button onClick={()=> verCandidatos(vaga._id)}>Candidatos</button>
            </div>
            </li>
          ))}
        </ul>
      )}
    </div>

    {mostrarCandidatos && (
    <div className={styles.modal}>
    {/* <h3>Candidatos</h3> */}
    <ul>
      {candidatos.length > 0 ? (
        candidatos.map((candidato) => (
          <li key={candidato._id}>
            <p>Nome: {candidato.nome}</p>
            <p>Email: {candidato.email}</p>
            <button onClick={() => verCurriculo(candidato.curriculo)}>
                        Ver Currículo
            </button>
          </li>
        ))
      ) : (
        <p>Nenhum candidato encontrado</p>
      )}
    </ul>
    <button className={styles.btnFechar} onClick={() => setMostrarCandidatos(false)}>Fechar</button>
  </div>
  )}

    </div>
    </div>
    </>
  );
}

export default ProfileEmpresa;
