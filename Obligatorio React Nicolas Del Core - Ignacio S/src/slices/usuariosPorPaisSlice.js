import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	usuariosPorPais: []
}

export const usuariosPorPaisSlice = createSlice({
	name: "usuariosPorPais",
	initialState,
	reducers: {
		guardarUsuariosPorPais: (state, action) => {
			state.usuariosPorPais = action.payload;
			//console.log(state.comidas);
			//console.log("mapeo done --> " + state.comidas);
		}
	}
});

export const { guardarUsuariosPorPais } = usuariosPorPaisSlice.actions;
export default usuariosPorPaisSlice.reducer;