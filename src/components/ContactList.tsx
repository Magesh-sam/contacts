import { useState, FC, MouseEvent, Dispatch, SetStateAction } from "react";
import "../styles/contactlist.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import CloseIcon from "@mui/icons-material/Close";
import {
  updateContact,
  removeFromContact,
  contact,
} from "../redux/contactSlice";
import {
  Box,
  Stack,
  List,
  ListItem,
  Link,
  Avatar,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


interface IContactList {
  contacts: contact[];
  setquery: Dispatch<SetStateAction<string>>;
}

export const ContactList: FC<IContactList> = ({ contacts, setquery }) => {
  const contactList = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [phNo, setphNo] = useState(0);
  const [id, setId] = useState("");


  

  const openUpdate = (id: string) => {
    const index = contactList.findIndex((contact) => contact.id === id);
    setname(contactList[index].name);
    setphNo(contactList[index].number);
    setId(id);

    setOpen(true);
  };

  const handleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(updateContact({ name: name, number: phNo, id: id }));
    setOpen(false);
    setquery("");
  };
  return (
    <Box className="contactwrapper">
      {contacts.length <= 0 && (
        <Typography variant="h4" sx={{ color: "red" }}>
          No Contacts
        </Typography>
      )}
      <List className="contactList">
        {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <Stack
                className="contact"
                sx={{ minWidth: "500px" }}
                spacing={3}
                direction="row"
              >
                <Avatar className="avatar" title={contact.name} sx={{bgcolor:'green'}} >
                  {contact.name.charAt(0).toUpperCase() +
                    contact.name.charAt(1).toUpperCase()}
                </Avatar>
                <Stack>
                  <Typography title={contact.name} variant="h6" noWrap>{contact.name}</Typography>
                  <Link href={`tel:${contact.number}`}></Link>
                  <Typography variant="body2">{contact.number}</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton>
                    <a
                      style={{ color: "green" }}
                      href={`tel:${contact.number}`}
                    >
                      <CallIcon />
                    </a>
                  </IconButton>
                  <IconButton
                    onClick={() => openUpdate(contact.id)}
                    sx={{ color: "blue" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => dispatch(removeFromContact(contact.number))}
                    sx={{ color: "red" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </ListItem>
        
        ))}
      </List>
      <Dialog sx={{ p: 5 }} open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Create New Contact</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "red" }}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack component="form" gap="15px" p={3}>
            <TextField
              autoFocus
              required
              type="text"
              label="Name"
              defaultValue={name}
              onChange={(e) => setname(e.target.value)}
            />
            <TextField
              required
              type="number"
              label="Phone"
              defaultValue={phNo}
              onChange={(e) => setphNo(parseInt(e.target.value))}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={(e) => handleUpdate(e)}
            >
              update
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
