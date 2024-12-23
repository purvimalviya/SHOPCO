import { createSlice } from "@reduxjs/toolkit";

interface uiState{
    popupVisible : boolean;
}

const initialState : uiState = {
    popupVisible : true,
}

const uiSlice = createSlice({
    name : "ui",
    initialState,
    reducers : {
        hidePopup : (state) =>{
            state.popupVisible = false;
        }
    }
})

export const {hidePopup} = uiSlice.actions ;
export default uiSlice.reducer ;