import { createSlice } from "@reduxjs/toolkit";

interface editModal {
  isOpen: boolean;
}

const initialState: editModal = {
  isOpen: false,
};

export const editModalSlice = createSlice({
  name: "edit",
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
export const { onClose, onOpen } = editModalSlice.actions;

export default editModalSlice.reducer;
