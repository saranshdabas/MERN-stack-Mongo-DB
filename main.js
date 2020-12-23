const mongoose = require("mongoose");
//If DB is not there, it will be created
mongoose.connect("mongodb://localhost:27017/organisation", {
  useNewUrlParser: true,
});

//Connection variable to access status of the connection
const connection = mongoose.connection;

//MongoDB Schema to define the structure of collection
const employeeSchema = mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  salary: Number,
});

//MongoDB Model which helps to create the collection and perform CURD operations etc.
const employeeModel = mongoose.model("Employee", employeeSchema);

//An instance of model, ready to be saved
var employee = new employeeModel({
  name: "Saransh",
  age: 23,
  email: "sdjee2015@gmail.com",
  salary: 1000,
});

connection.on("connected", () =>
  console.log("Successfully Connected to MongoDB")
);
connection.on("disconnected", () =>
  console.log("Successfully Disconnected from MongoDB")
);
connection.on("error", console.error.bind(console, "connection error:"));

//Once the connection is opened, save the employee record(document)
connection.once("open", () => {
  employee.save((err, res) => {
    if (err) throw err;
    console.log("Save success", res);
    connection.close();
  });
});
