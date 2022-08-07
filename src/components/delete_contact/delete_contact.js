//Libraries
import React from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

//Other Assets
import "./delete_contact.css";

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

export default function Delete_contact({toDeleteID, handleDeleteSuccess, handleDeleteError}) {

  const [open, setOpen] = React.useState(false); //Modal State
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [confirmationInput, setConfirmationInput] = React.useState(""); //Form Inputs State
  const [confirmationErrorMsg, setConfirmationErrorMsg] = React.useState("");
  const [isConfirmationError, setConfirmationError] = React.useState(false);


  const handleConfirmationInput = e => { //Contact Number Handler
    setConfirmationInput(e.target.value);
    //eslint-disable-next-line
    var mobileReg = new RegExp("^(?:Yes|No)$");

    if (e.target.value.length === 0) {
      setConfirmationError(true);
      setConfirmationErrorMsg("Input Confirmation (Yes/ No)!");
    } else if (mobileReg.test(e.target.value) === false) {
      setConfirmationError(true);
      setConfirmationErrorMsg("Only (Yes/ No) are Allowed!");
    } else {
      setConfirmationError(false);
      setConfirmationErrorMsg("");
    }
  }

  const handleSubmit = e => { //Log Form Values & Submit
    e.preventDefault();
    
    if (confirmationInput === "Yes") {
        const deleteContact = async () => {
            const resp = await axios.delete("http://127.0.0.1:5000/DeleteContact/" + toDeleteID).catch((err) => console.log(err));
            
            if (resp) {
              handleDeleteSuccess(true);
              setOpen(false);
            } else {
              handleDeleteError(true);
              setOpen(false);
            }
          }
      
          deleteContact();
      
          setConfirmationInput('');
          setConfirmationError(false);
          
          setTimeout(() => window.location.reload(false), 2000);
    } else {
        setConfirmationInput('');
        setConfirmationError(false);

        setOpen(false);
    }
  }

  return (
    <div className="delete-contact"> 
      <Button onClick={handleOpen} variant="outlined" className="btn-Delete">
        <DeleteIcon />
      </Button> 
      <Modal className="delete-modal"
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
            <h1 className="modal-title">Delete Existing Contact</h1>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <DeleteIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Delete Existing Contact (Yes/ No)?" variant="standard" 
                  onChange={handleConfirmationInput}
                  name="number"
                  value={confirmationInput} 
                  error={isConfirmationError}
                  helperText={confirmationErrorMsg}
                  required
                  />
              </Box>
              <br />
              <Button variant="contained" type="submit" disabled={isConfirmationError === true}
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
