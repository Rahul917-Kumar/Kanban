import React from 'react'
import Button from "@mui/material/Button";
import axios from "axios";

const url = "https://kanban--backend.herokuapp.com/";

function DoneWork({data , deleteData}) {
    const Delete = () => {
      axios
        .delete(url + `delete/${data.id}`)
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => console.log(err));
      deleteData(data.id);
    };

  return (
    <div className="insideDoneData">
      <div>
        <p className="dataenterd">{data.data}</p>
        <div>
          <Button variant="contained" onClick={Delete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DoneWork