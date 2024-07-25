import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	comidasBorradas: []
}

export const comidasBorradasSlice = createSlice({
	name: "comidasBorradas",
	initialState,
	reducers: {
		guardarComidasBorradas: (state, action) => {
			state.comidasBorradas = action.payload;
		}
	}
});

export const { guardarComidasBorradas } = comidasBorradasSlice.actions;
export default comidasBorradasSlice.reducer;