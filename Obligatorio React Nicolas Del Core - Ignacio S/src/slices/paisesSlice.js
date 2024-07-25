import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	paises: []
}

export const paisesSlice = createSlice({
	name: "paises",
	initialState,
	reducers: {
		guardarPaises: (state, action) => {
			state.paises = action.payload;
		}
	}
});

export const { guardarPaises } = paisesSlice.actions;
export default paisesSlice.reducer;