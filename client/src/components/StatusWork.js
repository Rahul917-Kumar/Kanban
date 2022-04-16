import React, { useState } from 'react'
import Button from "@mui/material/Button";
import axios from 'axios';
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';




const url = "https://kanban--backend.herokuapp.com/";

function StatusWork({data , deleteData  , update}) {
    const Delete = ()=>{
        axios.delete(url + `delete/${data.id}`)
          .then((res)=>{
               console.log(res.data.message)
          }).catch(err=>console.log(err))
        deleteData(data.id)
    }
    
    const [edit  , setEdit] = useState(false)

    const [initalValue, setInput] = useState({
      data: data.data,
      status: data.status,
    });

    const handleChange = (e)=>{
         const { name, value } = e.target;
         setInput((prevState) => ({
           ...prevState,
           [name]: value,
         }));
    }

    const SubmitData = ()=>{
        let newData=[]
       axios.put(url + `update/${data.id}`,{
           data:initalValue.data,
           status:initalValue.status
       })
          .then((res)=>{
              setEdit(!edit)
              newData = [...res.data.allData]
              update(newData);
          }).catch(err=>console.log(err))
          
    }

  return (
    <div className="insideWorkData">
      {edit ? (
        <div className="editdiv">
          <form method="post">
            <TextField
              id="standard-basic"
              label="work"
              variant="standard"
              name="data"
              value={initalValue.data}
              onChange={handleChange}
              fullWidth
              sx={{marginBottom:"1rem"}}
            />
            <div className='editselection'>
              <Select
                value={initalValue.status}
                onChange={handleChange}
                label="Status"
                name="status"
              >
                <MenuItem value={"work"}>Work</MenuItem>
                <MenuItem value={"progress"}>Progress</MenuItem>
                <MenuItem value={"done"}>Done</MenuItem>
              </Select>

              <Button variant="contained" onClick={SubmitData}>
                Submit
              </Button>
            </div>
          </form>
          <p onClick={() => setEdit(!edit)} className="cross">
            X
          </p>
        </div>
      ) : (
        <div>
          <p className="dataenterd">{data.data}</p>

          <div className="selection">
            <Button
              variant="contained"
              onClick={() => setEdit(!edit)}
              endIcon={<EditIcon />}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              onClick={Delete}
              endIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusWork