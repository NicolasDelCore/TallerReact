import { useDispatch } from "react-redux";
import { estadoLogin } from '../slices/usuarioLogueadoSlice';

const Logout = () => {

  const dispatch = useDispatch();

  const hacerLogout = () => {
    localStorage.clear();
    dispatch( estadoLogin() ); //Actualizar Menú
  }
    

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" onClick={hacerLogout}>
                    <span className="bi bi-box-arrow-right"></span><span>Logout</span>
                </button>
            </div>
        </nav>       
    </>
  )
  }
  
  export default Logout