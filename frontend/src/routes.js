import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home";
import RegisterCandidato from "./pages/AuthCandidato/Register";
import LoginCandidato from "./pages/AuthCandidato/Login";
import RegisterEmpresa from "./pages/AuthEmpresa/Register";
import LoginEmpresa from "./pages/AuthEmpresa/Login";
import ProfileCandidato from "./pages/ProfileCandidato"
import ProfileEmpresa from "./pages/ProfileEmpresa";
import UploadVaga from "./pages/UploadVaga";
import CandidaturaCandidato from "./pages/Candidatura/candidatura";
import EditarVaga from "./pages/EditarVaga";

function AppRoutes(){
    const location = useLocation();

    const esconderHeader = ["/register/candidato", "/login/candidato", "/register/empresa", "/login/empresa"] 
    const mostrarHeader = !esconderHeader.includes(location.pathname);

    return(
        <>
        {mostrarHeader && <Header/>}
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register/candidato" element={<RegisterCandidato/>} />
            <Route path="/login/candidato" element={<LoginCandidato/>}/>
            <Route path="/register/empresa" element={<RegisterEmpresa/>}/>
            <Route path="/login/empresa" element={<LoginEmpresa/>}/>
            <Route path="/candidato/profile" element={<ProfileCandidato/>}/>
            <Route path="/empresa/profile" element={<ProfileEmpresa/>}/>
            <Route path="/empresa/publicarVaga" element={<UploadVaga/>}/>
            <Route path="/candidatura/:id" element={<CandidaturaCandidato/>}/>
            <Route path="empresa/vagas/editar/:id" element={<EditarVaga/>}/>
        </Routes>
        </>
    )
}

function RoutesApp(){
    return(
        <>
        <BrowserRouter>
        <AppRoutes/>
        </BrowserRouter>
        </>
    )
}

export default RoutesApp;