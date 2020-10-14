//---Dependencies
const consoleTable = require("console.table");
const mysql = require("mysql");
const inquirer = require("inquirer");
require("dotenv").config();

//---Conection setup
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQLPW,
    database: "employee_management_db"
  });
  
//---connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startProgram();
  });

function startProgram() {
  inquirer.prompt({
    type: "list",
    message: "Welcome to the Employee Management System, what would you like to do?",
    name: "choices",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Add employee",
      "Add department",
      "Add role",
      "Update employee role",
      "Exit management system",
    ]
  })
}