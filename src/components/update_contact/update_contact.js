//Libraries
import React, {useEffect} from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

//Other Assets
import "./update_contact.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 100,
  p: 4,
};

export default function Update_contact({toUpdateID, handleUpdateSuccess, handleUpdateError, name, number}) {
  const [open, setOpen] = React.useState(false); //Modal State
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [contactName, setContactName] = React.useState(""); //Form Inputs State
  const [contactNumber, setContactNumber] = React.useState("");
  const [nameErrorMsg, setNameErrorMsg] = React.useState("");
  const [numberErrorMsg, setNumberErrorMsg] = React.useState("");
  const [isNameError, setNameError] = React.useState(false);
  const [isNumberError, setNumberError] = React.useState(false);

  const setInitialState = () => {
    setContactName(name);
    setContactNumber(number);
  }

  useEffect(setInitialState, [name, number]);

  const handleContactName = e => { //Contact Name Handler
    setContactName(e.target.value);

    //eslint-disable-next-line
    var nameReg = new RegExp("^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$");

    if (e.target.value.length === 0) {
      setNameError(true);
      setNameErrorMsg("Input Contact Name!");
    } else if(nameReg.test(e.target.value) === false) {
      setNameError(true);
      setNameErrorMsg("Input a Valid Name!");
    } else {
      setNameError(false);
      setNameErrorMsg("");
    }
  }

  const handleContactNumber = e => { //Contact Number Handler
    setContactNumber(e.target.value);
    //eslint-disable-next-line
    var mobileReg = new RegExp("^(\\+?6?01)[02-46-9]-*[0-9]{7}$|^(\\+?6?01)[1]-*[0-9]{8}$");

    if (e.target.value.length === 0) {
      setNumberError(true);
      setNumberErrorMsg("Input Contact Number!");
    } else if (mobileReg.test(e.target.value) === false) {
      setNumberError(true);
      setNumberErrorMsg("Wrong Format, Try 01X-XXXXXXXX!");
    } else {
      setNumberError(false);
      setNumberErrorMsg("");
    }
  }

  const handleSubmit = e => { //Log Form Values & Submit
    e.preventDefault();

    var updatedContactdata = new FormData();

    updatedContactdata.append("name", contactName);
    updatedContactdata.append("number", contactNumber);
    
    const updateContact = async () => {
      const resp = await axios.put("http://127.0.0.1:5000/EditContact/" + toUpdateID, updatedContactdata).catch((err) => console.log(err));
      
      if (resp) {
        handleUpdateSuccess(true);
        setOpen(false);
      } else {
        handleUpdateError(true);
        setOpen(false);
      }
    }

    updateContact();

    setContactName(''); //Reset Inputs' States
    setContactNumber('');
    setNumberError(false);
    setNameError(false);
    
    setTimeout(() => window.location.reload(false), 2000);
  }

  return (
    <div className="update-contact"> 
      <Button onClick={handleOpen} variant="outlined" className="btn-Add">
        <ModeEditIcon />
      </Button> 
      <Modal className="update-modal"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 className="modal-title">Update Contacts</h1>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Contact Name" variant="standard" 
                  onChange={handleContactName}
                  name="name"
                  value={contactName}
                  error={isNameError}
                  helperText={nameErrorMsg}
                  required 
                  />
              </Box>
              <br />
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Contact Number" variant="standard" 
                  onChange={handleContactNumber}
                  name="number"
                  value={contactNumber} 
                  error={isNumberError}
                  helperText={numberErrorMsg}
                  required
                  />
              </Box>
              <br />
              <Button variant="contained" type="submit" disabled={isNameError === true || isNumberError === true}
                className="btn-Submit">
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
