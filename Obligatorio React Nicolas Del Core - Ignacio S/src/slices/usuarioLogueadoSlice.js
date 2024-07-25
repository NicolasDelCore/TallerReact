import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	existe: false,
	apiKey: "",
	nombre: "",
	id: 0,
	calorias: 0
}

export const usuarioLogueadoSlice = createSlice({
	name: "usuarioLogueado",
	initialState,
	reducers: {
		estadoLogin: state => {
			//levantar valores para el Estado de apiKey, nombre, id y calorias desde localStorage
			state.apiKey = localStorage.getItem('apiKey');
			state.nombre = localStorage.getItem('nombre');
			state.id = localStorage.getItem('id');
			state.calorias = localStorage.getItem('calorias');

			//Actualizar valor ".existe"
			(state.apiKey && state.nombre && state.id > 0 && state.calorias > 0) ? state.existe = true : state.existe = false;
			//console.log("usuarioLogueadoSlice estadoLogin: Hay alguien logueado?: " + state);
		}
	}
});

export const { estadoLogin } = usuarioLogueadoSlice.actions;
export default usuarioLogueadoSlice.reducer;