import {configureStore } from "@reduxjs/toolkit";
import urlBaseReducer from '../slices/urlBaseSlice';
import usuarioLogueadoReducer from '../slices/usuarioLogueadoSlice';
import comidasRegistradasReducer from "../slices/comidasRegistradasSlice";
import comidasIngresadasReducer from "../slices/comidasIngresadasSlice";
import comidasReducer from "../slices/comidasSlice";
import paisesReducer from "../slices/paisesSlice";
import usuariosPorPaisReducer from "../slices/usuariosPorPaisSlice";
import comidasBorradasReducer from "../slices/comidasBorradasSlice";

export const store = configureStore({
	reducer:{
		urlBase: urlBaseReducer,
		usuarioLogueado: usuarioLogueadoReducer,
		comidas: comidasReducer,
		comidasRegistradas: comidasRegistradasReducer, //Lista de comidas registradas por el usuario
		comidasIngresadas: comidasIngresadasReducer, //Detecta nuevos registros para refetchear lista
		comidasBorradas: comidasBorradasReducer, //Detecta borrados de registros para refetchear lista
		paises: paisesReducer,
		usuariosPorPais: usuariosPorPaisReducer

	}
})