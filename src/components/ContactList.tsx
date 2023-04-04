import {useState,  useEffect} from "react";
import "../styles/contactlist.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import CloseIcon from "@mui/icons-material/Close";
import {updateContact,removeFromContact, filterContact} from '../redux/contactSlice'
import {
  Container,
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

export const ContactList = () => {
  const contactList = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>()

  const [open, setOpen] = useState(false)
  const [name, setname] = useState('')
  const [phNo, setphNo] = useState(0)

  let contactName;
    let contactNumber;

  const openUpdate = (phno:number) => {

    const index = contactList.findIndex(contact => contact.number === phno)
    setname(contactList[index].name)
    setphNo(contactList[index].number)
    setOpen(true)

  }

  const handleUpdate = () => {
        dispatch(updateContact({name:name,number:phNo}))
  }
  return (
    <Container className="contactwrapper">
        {contactList.length <=0 && <Typography variant="h4" sx={{color:'red'}}>No Contacts</Typography>}
      <List className="contactList">
        {contactList.map((contact) => (
          <>
            <ListItem  key={contact.number}>
              <Stack className="contact" sx={{minWidth:'500px'}}  spacing={3} direction="row">
                <Avatar>{contact.name.charAt(0)}</Avatar>
                <Stack>
                    <Typography variant="h6">{contact.name}</Typography>
                    <Link href={`tel:${contact.number}`} ></Link>
                    <Typography variant="body2">{contact.number}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems='center' >
                  <IconButton >
                    <a style={{color:'green'}} href={`tel:${contact.number}`}><CallIcon/></a>
                  </IconButton>
                  <IconButton onClick={()=>openUpdate(contact.number)} sx={{color:'blue'}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={()=>dispatch(removeFromContact(contact.number))} sx={{color:'red'}}>
                    <DeleteIcon />
                  </IconButton >
                </Stack>
              </Stack>
            </ListItem>
          </>
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
              onChange={(e)=>setname(e.target.value)}
            />
            <TextField
              required
              type="number"
              label="Phone"
              defaultValue={phNo}
              onChange={(e)=>setphNo(parseInt(e.target.value))}

            />
            <Button
              type="submit"
              variant="contained"
              color="success"
            >
              update
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Container>
  );
};
