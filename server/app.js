const dotenv = require("dotenv");
const express = require("express");
const app = express();
const { v4: uuid } = require("uuid");
const cors = require("cors");

const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://rahul:rahul@cluster0.09gb7.mongodb.net/Kanban?retryWrites=true&w=majority"
    );
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
}

const WorkAdd = new mongoose.Schema({
  id: {
    type: "String",
  },
  status: {
    type: "String",
    enum: ["work", "progress", "done"],
  },
  data: {
    type: "String",
  },
});

const Work = mongoose.model("Work", WorkAdd);

app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
  try {
    const getAll = await Work.find({});
    res.json(getAll);
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  try {
    const { status, data } = req.body;
    const newwork = new Work({
      id: uuid(),
      status,
      data,
    });
    await newwork.save();
    const findWork = await Work.find({});
    console.log(findWork);
    res.status(200).json({ message: "succesfully added data", task: newwork });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Work.deleteOne({ id: id });
    //const tasks = await Work.find({});
    res.status(200).json({ message: "work deleted succesfully" });
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data, status } = req.body;
    await Work.updateOne(
      { id: id },
      {
        $set: {
          id,
          data,
          status,
        },
      }
    );
    
    const allData = await Work.find({});
    res.json({ message: "succesfully updated", allData: allData });
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log("listning");
});

