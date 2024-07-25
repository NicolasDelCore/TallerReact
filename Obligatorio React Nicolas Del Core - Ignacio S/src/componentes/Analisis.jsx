import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//import { Link, Outlet } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../img/loc.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const Analisis = () => {
  const SevenDays = [];
  const currentDate = new Date();
  
  const paisesDelEstado = useSelector(state => state.paises.paises); //Todos los Paises de la API
  const comidasDelEstado = useSelector(state => state.comidas.comidas); //Todas las comidas de la API
  const comidasRegistradasDelEstado = useSelector(state => state.comidasRegistradas.comidasRegistradas); //Comidas registradas por el usuario

  const [nombresComidasConsumidas, setNombresComidasConsumidas] = useState([]);
  const [cantidadComidasConsumidas, setCantidadComidasConsumidas] = useState([]);
  const [markersData, setMarkersData] = useState([]);

  const [caloriasSemana, setCaloriasSemana] = useState([]); //Esto es asíncrono? usamos temp porque setCaloriasHoy no hace bien las cuentas

  const usuariosDelMundo  = useSelector(state => state.usuariosPorPais.usuariosPorPais);

  useEffect(() => {
    if (usuariosDelMundo.length > 0) {
      const markersDataObtenida = paisesDelEstado.map(pVerdadero => {
        const usuariosFiltrados = usuariosDelMundo.filter(pObtenidos => pObtenidos.name === pVerdadero.name);
        const cantidad = usuariosFiltrados ? usuariosFiltrados : 0;

        return {
          lat: pVerdadero.latitude,
          lng: pVerdadero.longitude,
          cantidad: usuariosFiltrados[0].cantidadDeUsuarios,
          estado: pVerdadero.name,
        };
      });
      setMarkersData(markersDataObtenida);
    }
  },[usuariosDelMundo]);

  //Lista de nombres de comidas consumidas por el usuario
  useEffect( () => {
    if (comidasRegistradasDelEstado.length > 0 && comidasDelEstado.length > 0) {
      
      const comidasRepetidas = comidasRegistradasDelEstado.map( (unR) => ( comidasDelEstado.find( comida => comida.id === unR.idAlimento).nombre ) );
      const cuentaComidas = {};
      
      for (let elemento of comidasRepetidas) {
          if (cuentaComidas[elemento]) cuentaComidas[elemento] += 1;
          else cuentaComidas[elemento] = 1;
      }
      //console.log(Object.keys(cuentaComidas));
      setNombresComidasConsumidas( Object.keys(cuentaComidas) );
      setCantidadComidasConsumidas( Object.values(cuentaComidas) );
    }
  }, [comidasRegistradasDelEstado, comidasDelEstado]);

  //Gráfica de caloría por días
  for (let i = 6; i >= 0; i--) {
    // Creo Objeto para cada dia
    let day = new Date(currentDate);
    day.setDate(currentDate.getDate() - i);

    // Separo dia y mes de Fecha
    let dayNumber = day.getDate();
    let month = day.toLocaleString("default", { month: "short" });

    // Contruyo Label
    let dateString = month + " " + dayNumber;

    // Agrego a Array
    SevenDays.push(dateString);
  }


  const year = new Date().getFullYear();
  const fechasParseadas = SevenDays.map(dateString => new Date(`${dateString}, ${year}`));

  let temp = 0;
  let alimentoPorcion;
  let alimento;
  let diaPorDia = [];
  const actualizarCalorias = (item, diaSemana) => {
    //calcular calorías diarias: (cantidad / porcion) * calorias (ej: alimento: porcion 100g, calorias 55, cantidad consumida = 20g, (20/100) * 55 = 11 calorías, y filtramos las comidas del día de hoy
    if ( (new Date(`${item.fecha}\n`).toDateString()) === (diaSemana).toDateString()) {
            alimento = comidasDelEstado.find( comidaE => comidaE.id === item.idAlimento);
      alimentoPorcion = alimento.porcion.slice(0, -1); //hay que recortar la letra de unidad a la porción
      temp += (item.cantidad / alimentoPorcion) * alimento.calorias;
    }
  }

  useEffect( () => {
    for(let i=0; i<7; i++){
      diaPorDia[i] = 0; //reseteo del contador por cada corrida, para no sumar calorías fantasma
      if (comidasRegistradasDelEstado.length > 0 && comidasDelEstado.length > 0)
        comidasRegistradasDelEstado.forEach( comida => actualizarCalorias(comida, fechasParseadas[i]) );
        diaPorDia[i] = (Number(temp).toFixed(2)); //Por alguna razón, si en vez de temp uso setCaloriasHoy ( caloriasHoy + el resto de la cuenta ), la cuenta NO SE HACE BIEN y ni siquiera es consistente (ej: con 6 brócolis, a veces da 55, a veces 110.. pero nunca más que eso).. como si hubiera algún tipo de asincronidad con el set del useState? usar una variable let fue la única forma que encontré de romper esto y que se haga bien el cálculo      
        temp = 0;
      }
    setCaloriasSemana(diaPorDia);
  }, [comidasRegistradasDelEstado]);

  //let gps = navigator.geolocation.getCurrentPosition
  //console.log(gps)
  
  return (
    <div className="container">
      <div className="row text-center"><h2>Analisis</h2></div>
      
      <div className="row" id="inicioGraficas">
        <div className="col-6">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Alimentos Consumidos",
                },
              },
            }}
            data={{
              labels: nombresComidasConsumidas,
              datasets: [
                {
                  label: "Cantidad de Alimento",
                  data: cantidadComidasConsumidas, 
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
        <div className="col-6">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Calorias por fecha",
                },
              },
            }}
            data={{
              labels: SevenDays,
              datasets: [
                {
                  label: "Calorias",
                  data: caloriasSemana,
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </div>
      </div>
      <div className="text-center pt-2 pb-2" id="inicioMapa"><h3>Mapa de usuarios registrados en el mundo</h3></div>
      <div className='row'>
        <div>
        <MapContainer center={[-34.90317278864733, -56.19036745417318]} zoom={4} style={{ height: '400px', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          {(markersData) ? 
                                markersData.map(marker => (
                                  <Marker key={`${marker.lat}-${marker.lng}`} position={[marker.lat, marker.lng]} icon={customMarkerIcon}>
                                      <Popup>
                                          <h3>{marker.estado}</h3>
                                          <p>Cantidad de usuarios por país: {marker.cantidad}</p>
                                      </Popup>
                                  </Marker>
                                ))
                          :
                            <></>
                          }
                  </MapContainer>
        </div>
                  
              </div>
    </div>
  );
};

export default Analisis;
