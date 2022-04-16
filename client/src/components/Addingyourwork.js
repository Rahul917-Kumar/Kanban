import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios  from 'axios'
import StatusWork from "./StatusWork";
import DoneWork from "./DoneWork";
import ProgressWork from "./ProgressWork";
const url = "https://kanban--backend.herokuapp.com/";
 /*kanban--backend.herokuapp.com/*/
 /*http://localhost:5000/*/

function Addingyourwork() {
   const [addingWork, setaddingWork] = useState({
     data: "",
     status: "work",
   });

   const [allTask, setTask] = useState([]);

   const [work, setWork] = useState([]);
   const [progress, setProgress] = useState([]);
   const [done, setDone] = useState([]);

   const handleChange = (e) => {
     const { name, value } = e.target;
     setaddingWork((prevState) => ({
       ...prevState,
       [name]: value,
     }));
   };

   const pushData = () => {
     axios
       .post(url + `add`, {
         data: addingWork.data,
         status: addingWork.status,
       })
       .then((res) => {
         allTask.push({ ...res.data.task });
         setTask([...allTask]);

         setWork([
           ...allTask.filter(
             (data) => data.status !== "progress" && data.status !== "done"
           ),
         ]);

         setProgress([
           ...allTask.filter(
             (data) => data.status !== "work" && data.status !== "done"
           ),
         ]);

         setDone([
           ...allTask.filter(
             (data) => data.status !== "work" && data.status !== "progress"
           ),
         ]);
       })
       .catch((err) => console.log(err));
   };

   const deleteData = (id) => {
     setTask([...allTask.filter((data) => data.id !== id)]);

     setWork([
       ...allTask.filter(
         (data) =>
           data.status !== "progress" &&
           data.status !== "done" &&
           data.id !== id
       ),
     ]);

     setProgress([
       ...allTask.filter(
         (data) =>
           data.status !== "work" && data.status !== "done" && data.id !== id
       ),
     ]);

     setDone([
       ...allTask.filter(
         (data) =>
           data.status !== "work" &&
           data.status !== "progress" &&
           data.id !== id
       ),
     ]);
   };

   const update = (newData) => {
     setTask([...newData]);

     setWork([
       ...newData.filter(
         (data) => data.status !== "progress" && data.status !== "done"
       ),
     ]);

     setProgress([
       ...newData.filter(
         (data) => data.status !== "work" && data.status !== "done"
       ),
     ]);

     setDone([
       ...newData.filter(
         (data) => data.status !== "work" && data.status !== "progress"
       ),
     ]);
   };

   useEffect(() => {
     axios
       .get(url)
       .then((res) => {
         setTask(res.data);

         setWork([
           ...res.data.filter(
             (data) => data.status !== "progress" && data.status !== "done"
           ),
         ]);

         setProgress([
           ...res.data.filter(
             (data) => data.status !== "work" && data.status !== "done"
           ),
         ]);

         setDone([
           ...res.data.filter(
             (data) => data.status !== "work" && data.status !== "progress"
           ),
         ]);
       })
       .catch((err) => console.log(err));
   }, []);

   return (
     <div>
       <p className="topheading">WORK STATUS</p>
       <hr></hr>
       <div className="formforpost">
         <form method="post">
           <TextField
             id="outlined-basic"
             label="Enter Your Work"
             variant="outlined"
             name="data"
             value={addingWork.data}
             onChange={handleChange}
             autoComplete="off"
             color="success"
             fullWidth
             sx={{ marginBottom: "1rem" }}
           />
           <Button
             variant="contained"
             onClick={pushData}
             className="submitpost"
             sx={{ padding: "0.7rem", fontSize: "1.2rem" }}
             fullWidth
           >
             Submit
           </Button>
         </form>
       </div>
       <div className="grid">
         <div className="work">
           <p className="workHeading">WORK</p>
           <hr></hr>
           {work.map((data) => {
             return (
               <StatusWork
                 data={data}
                 deleteData={deleteData}
                 update={update}
               />
             );
           })}
         </div>

         <div className="progress">
           <p className="progressHeading">PROGRESS</p>
           <hr></hr>
           {progress.map((data) => {
             return (
               <ProgressWork
                 data={data}
                 deleteData={deleteData}
                 update={update}
               />
             );
           })}
         </div>

         <div className="done">
           <p className="doneHeading">DONE</p>
           <hr></hr>
           {done.map((data) => {
             return (
               <DoneWork data={data} deleteData={deleteData} update={update} />
             );
           })}
         </div>
       </div>
     </div>
   );
 }

export default Addingyourwork;
