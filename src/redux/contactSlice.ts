import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type contact = {
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
      const index = state.contacts.findIndex(contact => contact.number === action.payload);
      state.contacts.splice(index, 1);
    },
    updateContact: (state, action: PayloadAction<contact>) => {
      state.contacts = state.contacts.map((contact) => {
        if (contact.number !== action.payload.number) {
          contact.number = action.payload.number;
          contact.name = action.payload.name;
        }
        return contact;
      });
    },
    filterContact: (state,action:PayloadAction<string>) =>{
        state.contacts = state.contacts.filter(contact =>{
          contact.name.toLowerCase().includes(action.payload.toLowerCase()) || contact.name.toLowerCase().includes(action.payload.toLowerCase())
        })
    }
  },

});

export const { addToContact,removeFromContact, updateContact, filterContact} = contactSlice.actions;
export default contactSlice.reducer;