import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { estadoLogin } from '../slices/usuarioLogueadoSlice';
import ObtenerOpcionesPaises from "./ObtenerOpcionesPaises";
import Tostadora from "./Tostadora";

const Registro = () => {

    const urlBase = useSelector(state => state.urlBase.url );
    const registroUsername = useRef(null);
    const registroPassword = useRef(null);
    const registroRepPassword = useRef(null);
    const registroPais = useRef(null);
    const registroCalorias = useRef(null);
    const dispatch = useDispatch();

    //Manejo de tostadas
    const [mensajeTostada, setMensajeTostada] = useState("");  // Mensaje de la tostada
    const [tostadaKey, setTostadaKey] = useState("");  // Key de la tostada
    
    const registroFetch = () => {
        //LIMPIEZA DE DATOS
        let username = registroUsername.current.value.trim();
        let password = registroPassword.current.value.trim();
        let repPassword = registroRepPassword.current.value.trim();
        let calorias = registroCalorias.current.value;
        let pais = registroPais.current.value;

        //CONTROL DE DATOS
        try { 
            if (username === "" || password === "")
            {
                throw new Error ("Usuario y Contraseña no pueden estar vacíos.");
            }
            if (password !== repPassword){
                throw new Error ("Contraseña no coincide.");
            }
            if (username === password){
                throw new Error ("Nombre de usuario y Contraseña tienen que ser al menos un poquito diferentes.");
            }
            if (calorias <= 0){
                throw new Error ("Calorias diarias recomendadas debe ser mayor a 0.");
            }
            if (pais === "-1"){
                throw new Error ("Debe seleccionar un país.");
            }

            //FETCH
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    "usuario": `${username}`,
                    "password": `${password}`,
                    "idPais": `${pais}`,
                    "caloriasDiarias": `${calorias}`
                }),
                redirect: 'follow'
            };

            fetch(`${urlBase}/usuarios.php`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result && result.apiKey) {
                    // Registro correcto: guardamos "apiKey", "nombre" (nombre de usuario) e "id" (ID de usuario)) en localStorage
                    localStorage.setItem('apiKey', result.apiKey);
                    localStorage.setItem('nombre', username);
                    localStorage.setItem('id', result.id);
                    localStorage.setItem('calorias', result.caloriasDiarias);
                    dispatch( estadoLogin() ); //Auto loguear al registrar y actualizar menú
                    //console.log(result);
                } else {
                    if (result.codigo === 409) throw new Error ('Error de registro: Nombre de usuario no disponible.');
                    if (result.codigo >= 500) throw new Error ('Error de registro: Servicio de registro caído. Por favor, reintente más tarde');
                    if (result.status === 404) throw new Error ('Error de registro: Servicio de registro inaccesible. Por favor, verifique su conexión o avise al administrador.');
                    else {
                        throw new Error ('Error inesperado en el registro.');
                    }
                }
            })
            .catch(error => {
                setMensajeTostada(error.message);
                setTostadaKey("registroTostada" + Date.now());
            } );
        }
        catch(error) { 
            setMensajeTostada(error.message);
            setTostadaKey("registroTostada" + Date.now());
        }
    }

    return (
        <>
            {/*Renderizado de la tostadora*/}
            { <Tostadora titulo="ERROR EN EL REGISTRO" mensaje={mensajeTostada} tostKey={tostadaKey} id={"tostadoraRegistro"} />}

            {/*Renderizado del componente*/}
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#registroToggle" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span><span>Registrarse</span>
                    </button>
                </div>
                
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="registroToggle" aria-labelledby="offcanvasNavbarLabel">

                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="registroToggle">Registro</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body">

                        <div className="navbar-nav justify-content-end flex-grow-1 pe-3">

                            <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Nombre de usuario" id="registerName"  ref={registroUsername} />
                        <label className="text-body-secondary" htmlFor="registerName">Nombre de usuario</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" placeholder="Contraseña" id="registerPassword" ref={registroPassword} />
                            <label className="text-body-secondary" htmlFor="registerPassword">Contraseña</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" placeholder="Contraseña" id="registerRepPassword" ref={registroRepPassword} />
                            <label className="text-body-secondary" htmlFor="registerRepPassword">Repetir Contraseña</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select name="selectPaisesR" className="form-control" defaultValue="-1" id="selectPaisesR" ref={registroPais}>
                                <option disabled hidden value='-1'>Seleccione País</option>
                                <ObtenerOpcionesPaises />
                            </select>
                            <label className="text-body-secondary" htmlFor="selectPaisesR">País</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" placeholder="0" id="caloriasR" ref={registroCalorias} /> 
                            <label className="text-body-secondary" htmlFor="caloriasR">Objetivo Calorías</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="button" value="Registrarse" className="btn btn-dark" id="btnRegister" onClick={ registroFetch } />
                        </div>

                        </div>

                    </div>
                    
                </div>
                
            </nav>
        </>
    )
}

export default Registro