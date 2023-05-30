import { createSlice } from "@reduxjs/toolkit";

interface RegModal {
  isOpen: boolean;
}

const initialState: RegModal = {
  isOpen: false,
};

export const RegModalSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onClose, onOpen } = RegModalSlice.actions;

export default RegModalSlice.reducer;
