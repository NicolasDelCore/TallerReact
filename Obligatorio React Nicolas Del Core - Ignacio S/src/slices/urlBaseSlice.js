import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	url: "https://calcount.develotion.com",
	urlImg: "https://calcount.develotion.com/imgs/"
}

export const urlBaseSlice = createSlice({
	name: "urlBase",
	initialState,
	reducers: {
	}
});

export default urlBaseSlice.reducer;