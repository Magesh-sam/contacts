import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type contact = {
  name: string;
  number: number;
};

const initialState = {
  contacts: [] as contact[],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addToContact: (state, action: PayloadAction<contact>) => {
      state.contacts.push(action.payload);
    },
    removeFromContact: (state, action: PayloadAction<number>) => {
      state.contacts.filter((contact) => contact.number !== action.payload);
    },
    updateContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact.number !== action.payload) {
          contact.number = action.payload;
        }
        return contact;
      });
    },
  },
});

export const { addToContact,removeFromContact, updateContact} = contactSlice.actions;
export default contactSlice.reducer;