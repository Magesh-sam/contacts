import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type contact = {
  name: string;
  number: number;
  id: string;
};

const sampleContact = [
  {
    name: "John",
    number:12345678,
    id:'hjbdfjh4785y3he'
  },
  {
    name: "Joe",
    number:87654321,
    id:'firhfiu489894h'
  }
]

const initialState = {
  contacts: sampleContact as contact[],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addToContact: (state, action: PayloadAction<contact>) => {
      state.contacts.push(action.payload);
    },
    removeFromContact: (state, action: PayloadAction<number>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.number === action.payload
      );
      state.contacts.splice(index, 1);
    },
    updateContact: (state, action: PayloadAction<contact>) => {
      const index = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );
      state.contacts.splice(index, 1, action.payload);
    },
  },
});

export const { addToContact, removeFromContact, updateContact } =
  contactSlice.actions;
export default contactSlice.reducer;
