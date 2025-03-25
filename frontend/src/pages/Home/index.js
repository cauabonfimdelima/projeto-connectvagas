import { useEffect, useState } from 'react';
import {listarVagas} from '../../services/api'
import './home.css'
import { useNavigate } from 'react-router-dom';


function Home(){


    const [vagas, setVagas] = useState([]);
    const [searchCargo, setSearchCargo] = useState("");
    const [searchLocal, setSearchLocal] = useState("");
    const [vagasFiltradas, setVagasFiltradas] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        console.log("Chamando API")
        const loadVagas = async ()=>{
            const data = await listarVagas();
            if(data) {
                setVagas(data);
                setVagasFiltradas(data);
            }
        }

        loadVagas();
    }, []);

    const handleBuscar = () =>{
     const filtro = vagas.filter((vaga) =>
        vaga.cargo.toLowerCase().includes(searchCargo.toLowerCase()) &&
        vaga.local_vaga.toLowerCase().includes(searchLocal.toLowerCase())
     );
        
     setVagasFiltradas(filtro);

    }

    const handleCandidatar = (idVaga) =>{
        navigate(`/candidatura/${idVaga}`)
    }

    return(
        <>
        <div className='warning-home'>
            <p>A ConnectVagas é gratuita para candidatos e nunca se deve fazer pagamentos a empresas ou pessoas.
                Denuncie qualquer tipo de fraude.
            </p>
        </div>

        <div className='div-inputs-query'>
            <div className='inputs-query'>
            <input className='input-job' placeholder='Encontre a vaga que você deseja.'
            value={searchCargo}
            onChange={(e) => setSearchCargo(e.target.value)}
            ></input>
            
            <input className='input-local' placeholder='Localização'
            value={searchLocal}
            onChange={(e) => setSearchLocal(e.target.value)}
            ></input>
            <button className='btnBuscar' onClick={handleBuscar}>Buscar</button>
            </div>
        </div>

        <div className='div-divisor'>
            <hr></hr>
        </div>

        <section className='jobs-container'>
            <span className='jobs-title'>Todas as vagas disponíveis.</span>

            <div className='jobs-list'>
                {vagasFiltradas.length > 0 ?(
            <ul className='jobs-grid'>
                    {vagasFiltradas.map((vaga)=>(
                        <li key={vaga._id} className="job-card">
                            <div className='div-info'>
                            <h2 className="job-title">{vaga.cargo}</h2>
                            <span className="job-company">{vaga.id_empresa.nomeEmpresa}</span>
                            <span className='job-company'>{vaga.local_vaga}</span>

                            <div className='job-description'>
                            <span>Descrição completa da vaga:</span>
                            <p title={vaga.descricao}>{vaga.descricao.length > 150 ? vaga.descricao.slice(0, 150) + "..." : vaga.descricao}</p>
                            </div>
                            </div>

                            <div className='job-details'>
                            <div><span>Tipo:</span> {vaga.tipo_vaga}</div>
                            <div><span>Turno:</span> {vaga.turno_vaga}</div>
                            <div><span>Jornada:</span> {vaga.modelo_trabalho}</div>
                            <div><span>Bolsa:</span> R$ {vaga.bolsa_auxilio},00</div>
                            </div>

                            <button  className="apply-button" onClick={() => handleCandidatar(vaga._id)}>Candidatar-se</button>
                        </li>
                    ))}
                </ul>
                ):(
                    <p className='no-jobs'>Nenhuma vaga encontrada.</p>
                )}
            </div>
        </section>

        </>
    )
}

export default Home;