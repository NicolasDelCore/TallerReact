import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { estadoLogin } from '../slices/usuarioLogueadoSlice';
import Tostadora from "./Tostadora";
import { useEffect } from "react";

const Login = () => {

    const urlBase = useSelector(state => state.urlBase.url );
    const loginUsername = useRef(null);
    const loginPassword = useRef(null);
    const botonLogin = useRef(null); //botón para iniciar sesión
    const dispatch = useDispatch();

    //Manejo de tostadas
    const [mensajeTostada, setMensajeTostada] = useState("");  // Mensaje de la tostada
    const [tostadaKey, setTostadaKey] = useState("");  // Key de la tostada

    //Deshabilitar el botón de login si no se escribió algo en los campos de usuario y contraseña
    //Esta func se llama 1) cada vez que hay cambios en los campos de username o password (onChange en ambos campos), y 2) en la carga inicial del comp (useEffect[])
    const estadoBotonLogin = () => {
        if(loginUsername.current.value === null || loginUsername.current.value === ""  || loginPassword.current.value === null || loginPassword.current.value === "") {
            botonLogin.current.disabled=true;
        } else {
            botonLogin.current.disabled=false;
        }
    };

    //Seguir el estado de loginUsername y loginPassword para desactivar/activar el botón de login
    useEffect(() => {
        estadoBotonLogin();
    },[loginUsername, loginPassword]);
    
    const loginFetch = () => {
        //Este escenario NO debería pasar.. pero si pasa porque alguien presiona iniciar sesión desde JS con .disabled = false, evitamos el fetch
        try {
            if(loginUsername.current.value === null || loginUsername.current.value === ""  || loginPassword.current.value === null || loginPassword.current.value === "") throw new Error("Usuario y Contraseña no pueden estar vacíos.");
        
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            //console.log(loginUsername.current.value); //console.log(loginPassword.current.value);

            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    "usuario": `${loginUsername.current.value}`,
                    "password": `${loginPassword.current.value}`
                }),
                redirect: 'follow'
            };

            fetch(`${urlBase}/login.php`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result && result.apiKey) { //console.log(result)
                    // Login correcto: guardamos "apiKey", "nombre" (nombre de usuario), "id" (ID de usuario) y "calorias" en localStorage
                    localStorage.setItem('apiKey', result.apiKey);
                    localStorage.setItem('nombre', loginUsername.current.value);
                    localStorage.setItem('id', result.id);
                    localStorage.setItem('calorias', result.caloriasDiarias);
                    dispatch( estadoLogin() ); //Actualizar el Estado Global del login, lo que actualiza el Menú
                    //console.log("Login: Credenciales correctas"); //console.log('API key guardada al local storage:', result.apiKey);
                } else {
                    throw new Error ('Credenciales incorrectas. Pruebe nuevamente.');
                }
            })
            .catch(error => {
                setMensajeTostada(error.message);
                setTostadaKey("loginTostada" + Date.now());
            });

        } catch (error) {
            setMensajeTostada(error.message);
            setTostadaKey("loginTostada" + Date.now());
        }
    }

    return (
    <>
        {/*Renderizado de la tostadora*/}
        { <Tostadora titulo="ERROR DE LOGIN" mensaje={mensajeTostada} tostKey={tostadaKey} id={"tostadoraLogin"} />}

        {/*Renderizado del componente*/}
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#loginToggle" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span><span>Login</span>
                </button>
            </div>
            
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="loginToggle" aria-labelledby="offcanvasNavbarLabel">

                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="loginToggle">Login</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">

                    <div className="navbar-nav justify-content-end flex-grow-1 pe-3">

                        <div className="nav-item form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Nombre de usuario" id="loginName" ref={loginUsername} onChange={estadoBotonLogin} />
                            <label className="text-body-secondary" htmlFor="loginName">Nombre de usuario</label>
                        </div>
                        <div className="nav-item form-floating mb-3">
                            <input type="password" className="form-control" placeholder="Contraseña" id="loginPassword" ref={loginPassword} onChange={estadoBotonLogin} />
                            <label className="text-body-secondary" htmlFor="loginPassword">Contraseña</label>
                        </div>
                            <div className="nav-item form-floating mb-3">
                            <input type="button" value="Iniciar Sesión" className="btn btn-dark" id="btnLogin" ref={botonLogin} onClick={ loginFetch } />
                        </div>

                    </div>

                </div>
                
            </div>
            
        </nav>
            
    </>
  )
}

export default Login