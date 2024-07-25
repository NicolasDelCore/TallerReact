import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CaloriasDiarias = () => {

  const comidasDelEstado = useSelector((state) => state.comidas.comidas);
  const comidasRegistradasDelEstado = useSelector((state) => state.comidasRegistradas.comidasRegistradas);
  const [caloriasHoy, setCaloriasHoy] = useState(0); //Esto es asíncrono? usamos temp porque setCaloriasHoy no hace bien las cuentas
  let temp = 0; //No persiste, vuelve a 0 cada vez que se re renderiza el comp
  let alimento; //Para iterar comidasDelEstado
  let alimentoPorcion; //Para legibilidad, tenemos que borrarle una letra a la porción de cada comidasDelEstado para quedarnos con el int
  const usuarioCaloriasDiarias = useSelector((state) => state.usuarioLogueado.calorias)
  const actualizarCalorias = (item) => {
    //calcular calorías diarias: (cantidad / porcion) * calorias (ej: alimento: porcion 100g, calorias 55, cantidad consumida = 20g, (20/100) * 55 = 11 calorías, y filtramos las comidas del día de hoy
    if ((new Date(`${item.fecha}\n`).toDateString()) === (new Date().toDateString())) {
      alimento = comidasDelEstado.find(comidaE => comidaE.id === item.idAlimento);
      alimentoPorcion = alimento.porcion.slice(0, -1); //hay que recortar la letra de unidad a la porción
      temp += (item.cantidad / alimentoPorcion) * alimento.calorias;
    }
  }

  useEffect(() => {
    setCaloriasHoy(0); //reseteo del contador por cada corrida, para no sumar calorías fantasma
    if (comidasRegistradasDelEstado.length > 0 && comidasDelEstado.length > 0)
      comidasRegistradasDelEstado.forEach(actualizarCalorias);
    setCaloriasHoy(Number(temp).toFixed(2)); //Por alguna razón, si en vez de temp uso setCaloriasHoy ( caloriasHoy + el resto de la cuenta ), la cuenta NO SE HACE BIEN y ni siquiera es consistente (ej: con 6 brócolis, a veces da 55, a veces 110.. pero nunca más que eso).. como si hubiera algún tipo de asincronidad con el set del useState? usar una variable let fue la única forma que encontré de romper esto y que se haga bien el cálculo      
  }, [comidasRegistradasDelEstado]);

  const ponerColorsitos = () => {
    if (caloriasHoy >= usuarioCaloriasDiarias) {
      return { color: "red" };
    } else if (caloriasHoy >= (usuarioCaloriasDiarias * 10) / 100) {
      return { color: "#ffc107" };
    } else {
      return { color: "green" };
    }
  };
  return (

    <div className="container pt-3 pb-3">
      <div className="row justify-content-center text-center">
        <h4>Calorias de hoy:<span style={ponerColorsitos()}> {caloriasHoy}</span>  </h4>

      </div>
      <div className="row">
        <div className="col-4">
          <div className="color-text bg-success text-center text-uppercase">OK</div>
        </div>
        <div className="col-4">
          <div className="color-text bg-warning text-center text-uppercase">Alerta</div>
        </div>
        <div className="col-4">
          <div className="color-text bg-danger text-center text-uppercase">Te pasaste de Calorias</div>
        </div>

      </div>
    </div>

  )
}

export default CaloriasDiarias