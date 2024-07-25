import { useRef, useEffect } from "react";

const Tostadora = ( {titulo, mensaje, tostKey, id} ) => {

    //Recordatorios para justificar el diseño de esta maldad... tantas horas dedicadas a las tostadas me dieron hambre
    //Por qué la key? Porque si el mensaje de error debe ser el mismo, no se actualiza el estado. La key random (nombre comp + date.now) se asegura que siempre se actualice el estado y siempre se muestre la tostada.
    //Por qué el id? Para no crear tostadas adicionales, y porque hace mucho más sencillo testear en la consola con getById
    //Por qué el useRef? React carga las cosas de forma tal que el getElementById(id) de la tostada queda en NULL y se rompe, useRef arregla esto
    //Por qué el useEffect? para controlar si tostada.current es "truthy" (no null)

    const tostada = useRef(null);

    //const tostada = document.getElementById(id);
    useEffect(() => { //Check para ver que se haya cargado el componente, porque agarrar el ID muy temprano devuelve null
        if (tostada.current) {
            if (mensaje !== "") { //no queremos msjs vacíos.. que siempre llegarían cada vez que se carga el componente
                new window.bootstrap.Toast(tostada.current).show();
                //console.log("TOSTADORA REPORTA: " + titulo + " | " + mensaje + " | " + id)
            }
        }
      }, [tostKey, mensaje]);

    return (
        <>
            <div className="toast-container position-fixed top-0 start-0 p-3" key={tostKey} >
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" id={id} ref={tostada}>
                    <div className="toast-header bg-dark text-light">
                        <strong className="me-auto">{titulo}</strong>
                        <small>{new Date().toLocaleTimeString()}</small>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {mensaje}
                    </div>
                </div>
            </div>
        </>
    )
    
}

export default Tostadora