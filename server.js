//---Dependencies
require("console.table");
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
  }).then(function (res) {
    programMenu(res.choices)
  });
}
function programMenu(options) {
  switch (options) {
    case "View all employess":
      viewAllEmployees();
      break;
    case "View all departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Add department":
      addDept();
      break;
    case "Add role":
      addRole();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    case "Exit management system":
      exit();
  }
}
//---Function to view all the employees.
function viewAllEmployees() {
  connection.query("", function (err, res) {
    console.table(res);
    exitStart();
  });
}
//---Function to view all the departments.
function viewAllDepartments() {
  connection.query("", function (err, res) {
    console.table(res);
    exitStart();
  });
}
//---Function to view all the roles.
function viewAllRoles() {
  connection.query("", function (err, res) {
    console.table(res);
    exitStart();
  });
}
//---Function to add an employee.
function addEmployee() {
  
}

//---Function to add a department.
function addDept() {

}


//---Function to add a role.
function addRole() {

}


//---Function to update an employee role.
function updateEmployeeRole() {

}


//---Function to exit the employee management system or start the program over again.
function exitStart() {

}

//---Function to exit the employee managment system.
function exit() {

}