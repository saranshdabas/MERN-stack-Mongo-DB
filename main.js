const mongoose = require("mongoose");
//If DB is not there, it will be created
//To use Atlas mongodb+srv://saransh:<password>@cluster0.chqmt.mongodb.net/<dbname>?retryWrites=true&w=majority
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
var employees = [
  new employeeModel({
    name: "Saransh",
    age: 23,
    email: "sdjee2015@gmail.com",
    salary: 1000,
  }),
  new employeeModel({
    name: "Amey",
    age: 22,
    email: "amylokh@gmail.com",
    salary: 1000,
  }),
  new employeeModel({
    name: "Mayank",
    age: 23,
    email: "mayank@gmail.com",
    salary: 1000,
  }),
];

connection.on("connected", () =>
  console.log("Successfully Connected to MongoDB")
);
connection.on("disconnected", () =>
  console.log("Successfully Disconnected from MongoDB")
);
connection.on("error", console.error.bind(console, "connection error:"));

//Once the connection is opened, save the employee record(document)
// connection.once("open", () => {
//   employees.forEach((employee) => {
//     employee.save((err, res) => {
//       if (err) throw err;
//       console.log("Save success", res);
//     });
//   });
// });

//CURD operations - model object helps us to interact with DB
connection.once("open", () => {
  //   employeeModel.find({}, (err, res) => {
  //     if (err) throw err;
  //     console.log(res);
  //     connection.close();
  //   });

  employeeModel.find({ name: "Saransh" }, (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.close();
  });

  //   employeeModel.updateMany({ name: "Saransh" }, { age: 20 }, (err, res) => {
  //     if (err) throw err;
  //     console.log(res);
  //     connection.close();
  //   });

  //   employeeModel.deleteOne({ name: "Saransh" }, (err, res) => {
  //     if (err) throw err;
  //     console.log(res);
  //     connection.close();
  //   });
});
