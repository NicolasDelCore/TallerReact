import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	comidasIngresadas: []
}

export const comidasIngresadasSlice = createSlice({
	name: "comidasIngresadas",
	initialState,
	reducers: {
		guardarComidasIngresadas: (state, action) => {
			state.comidasIngresadas = action.payload;
		}
	}
});

export const { guardarComidasIngresadas } = comidasIngresadasSlice.actions;
export default comidasIngresadasSlice.reducer;