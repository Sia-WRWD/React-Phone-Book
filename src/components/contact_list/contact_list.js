//Libraries
import React, {useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import axios from "axios";

//Other Assets
import "./contact_list.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 }, //Make sure id is id.
  { field: "contact_name", headerName: "Contact Name", width: 300 },
  { field: "contact_number", headerName: "Contact Number", width: 150 },
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

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <button onClick={onClick}>Edit</button>;
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

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <button onClick={onClick}>Delete</button>;
    },
  },
];

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No contacts have been added yet!
    </Stack>
  );
}

export default function Contact_list(props) {
  const [contacts, setContacts] = useState([]); //Set State

  const fetchContacts = async () => {
    const resp = await axios.get("http://127.0.0.1:5000/").catch((err) => console.log(err)); //Fetch Data

    if (resp) {
      const contacts = resp.data;

      setContacts(contacts);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  var rows = contacts.map(x => ({ //Convert Array of Arrays into Array of Objects
    id: x[0],
    contact_name: x[1],
    contact_number: x[2]
  }));

  return (
    <div className="contact-list">
      <h1>Contact List</h1>
      <div style={{ height: 371, width: "80%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          components={{ NoRowsOverlay }}
        />
      </div>
    </div>
  );
}
