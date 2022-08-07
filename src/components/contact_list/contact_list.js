//Libraries
import React, {useState, useEffect } from "react";
import axios from "axios";

import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@mui/material/Alert';
import { Snackbar } from "@mui/material";

//Other Assets
import "./contact_list.css";
import AddContact from "../add_contact/add_contact";
import DeleteContact from "../delete_contact/delete_contact";
import UpdateContact from "../update_contact/update_contact";

const useStyles = makeStyles({
  root: {
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
          outline: 'none',
      },
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:selection, &.MuiDataGrid-root .MuiDataGrid-cell:selection': {
          outline: 'none',
      },
  }
})

var rows = [];

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No contacts have been added yet!
    </Stack>
  );
}

function setData(contact_data) {
   rows = contact_data.map(x => ({ //Convert Array of Arrays into Array of Objects
    id: x[0],
    contact_name: x[1],
    contact_number: x[2]
  }));

  return rows;
}

export default function Contact_list(props) {
  const [contacts, setContacts] = useState([]); //Set State
  const [toDelete, setToDelete] = useState('');
  const [toUpdate, setToUpdate] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  const [deleteSuccessVisible, setDeleteSuccessVisible] = React.useState(false); //Success Message
  //const handleDeleteSuccessVisible = () => setDeleteSuccessVisible(true);
  const handleDeleteSuccessInvisible = () => setDeleteSuccessVisible(false);

  const [deleteErrorVisible, setDeleteErrorVisible] = React.useState(false); //Error Message
  //const handleDeleteErrorVisible = () => setDeleteErrorVisible(true);
  const handleDeleteErrorInvisible = () => setDeleteErrorVisible(false);

  const [updateSuccessVisible, setUpdateSuccessVisible] = React.useState(false); //Success Message
  //const handleUpdateSuccessVisible = () => setUpdateSuccessVisible(true);
  const handleUpdateSuccessInvisible = () => setUpdateSuccessVisible(false);

  const [updateErrorVisible, setUpdateErrorVisible] = React.useState(false); //Error Message
  //const handleUpdateErrorVisible = () => setUpdateErrorVisible(true);
  const handleUpdateErrorInvisible = () => setUpdateErrorVisible(false);

  const classes = useStyles();

  const columns = [
    { field: "id", headerName: "ID", width: 70 }, //Make sure id is id.
    { field: "contact_name", headerName: "Contact Name", width: 255 },
    { field: "contact_number", headerName: "Contact Number", width: 255 },
    {
      field: "edit",
      headerName: "",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );  

          setToUpdate(thisRow.id);

          fetchToUpdateContact(thisRow.id);
        };
        return <div onClick={onClick}>
                <UpdateContact toUpdateID={toUpdate} 
                    handleUpdateSuccess={handleUpdateSuccess} 
                    handleUpdateError={handleUpdateError}
                    name={name}
                    number={number}/>
               </div>;
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
  
            setToDelete(thisRow.id);
        };
        return <div onClick={onClick}>
                <DeleteContact toDeleteID={toDelete} 
                    handleDeleteSuccess={handleDeleteSuccess} 
                    handleDeleteError={handleDeleteError}/>
               </div>;
      },
    },
  ];

  const handleDeleteSuccess = status => {
    setDeleteSuccessVisible(status);
  }

  const handleDeleteError = status => {
    setDeleteErrorVisible(status);
  }

  const handleUpdateSuccess = status => {
    setUpdateSuccessVisible(status);
  }

  const handleUpdateError = status => {
    setUpdateErrorVisible(status);
  }

  const fetchContacts = async () => {
    const resp = await axios.get("http://127.0.0.1:5000/").catch((err) => console.log(err)); //Fetch Data

    if (resp) {
      const contacts = resp.data;

      setContacts(contacts);
      setData(contacts);
    }
  }

  const fetchToUpdateContact = async (id) => {

    const resp = await axios.get("http://127.0.0.1:5000/fetchSingleContact/" + id).catch((err) => console.log(err)); //Fetch Data

    if (resp) {
      const singleContact = resp.data;

      var test = singleContact.map(x => ({ //Convert Array of Arrays into Array of Objects
        id: x[0],
        contact_name: x[1],
        contact_number: x[2]
      }));

      setName(test[0].contact_name);
      setNumber(test[0].contact_number);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="contact-list">
      {<AddContact name={contacts}/>}
      <h1 className="contact-list-title">My Contact List</h1>
      <div style={{ height: 371, width: "60%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          components={{ NoRowsOverlay }}
          className={classes.root}
        />
      </div>

      {/*Success & Error Messages*/}
      <Snackbar open={deleteSuccessVisible}> 
        <Alert severity="success" onClose={handleDeleteSuccessInvisible}>
          Successfully Deleted Contact.
        </Alert>
      </Snackbar>
      <Snackbar open={deleteErrorVisible}>
        <Alert severity="error" onClose={handleDeleteErrorInvisible}>
          Something Went Wrong, Please Try Again.
        </Alert>
      </Snackbar>

      <Snackbar open={updateSuccessVisible}> 
        <Alert severity="success" onClose={handleUpdateSuccessInvisible}>
          Successfully Updated Contact.
        </Alert>
      </Snackbar>
      <Snackbar open={updateErrorVisible}>
        <Alert severity="error" onClose={handleUpdateErrorInvisible}>
          Something Went Wrong, Please Try Again.
        </Alert>
      </Snackbar>
    </div>
  );
}
