import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	comidasRegistradas: []
}

export const comidasRegistradasSlice = createSlice({
	name: "comidasRegistradas",
	initialState,
	reducers: {
		guardarComidasRegistradas: (state, action) => {
			state.comidasRegistradas = action.payload;
		}
	}
});

export const { guardarComidasRegistradas } = comidasRegistradasSlice.actions;
export default comidasRegistradasSlice.reducer;