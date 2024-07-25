import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	comidas: []
}

export const comidasSlice = createSlice({
	name: "comidas",
	initialState,
	reducers: {
		guardarComidas: (state, action) => {
			state.comidas = action.payload;
			//console.log(state.comidas);
			//console.log("mapeo done --> " + state.comidas);
		}
	}
});

export const { guardarComidas } = comidasSlice.actions;
export default comidasSlice.reducer;