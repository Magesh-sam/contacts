import React, { MouseEvent, useState, FC } from "react";
import "../styles/navbar.css";
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addToContact } from "../redux/contactSlice";

import { v4 as randomID } from "uuid";

interface Inavbar {
  query: string;
  setquery: React.Dispatch<React.SetStateAction<string>>;
}

export const NavBar: FC<Inavbar> = ({ query, setquery }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [phoneNo, setphoneNo] = useState<number>(0);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addToContact({ name: name, number: phoneNo, id: randomID() }));
    setOpen(false);
  };

  return (
    <>
      <AppBar>
        <Toolbar className="navbar-links">
          <TextField
            sx={{ background: "white", borderRadius: "5px" }}
            type="search"
            variant="outlined"
            placeholder="search contact"
            value={query}
            onChange={(e) => setquery(e.target.value)}
          />
          <IconButton
            onClick={() => setOpen(true)}
            title="create new contact"
            sx={{ color: "white" }}
          >
            <PersonAddAltIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
              placeholder="Full Name"
              onChange={(e) => setname(e.target.value)}
            />
            <TextField
              required
              type="number"
              label="Phone"
              placeholder="0123012301"
              onChange={(e) => setphoneNo(parseInt(e.target.value))}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={(e) => handleSubmit(e)}
            >
              Create
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
