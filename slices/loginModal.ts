import { createSlice } from "@reduxjs/toolkit";

interface loginModal {
  isOpen: boolean;
}

const initialState: loginModal = {
  isOpen: false,
};

export const loginModalSlice = createSlice({
  name: "login",
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
export const { onClose, onOpen } = loginModalSlice.actions;

export default loginModalSlice.reducer;
