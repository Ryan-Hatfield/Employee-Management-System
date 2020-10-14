//---Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require('console.table');
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
function programMenu(res) {
  switch (res) {
    case "View all employees":
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
      exitProgram();
  }
}
//---Function to view all the employees.
function viewAllEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;", 
  function (err, res) {
    console.table(res);
    if (err) throw err;
    startProgram();
  });
}
//---Function to view all the departments.
function viewAllDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    if (err) throw err;
    startProgram();
  });
}
//---Function to view all the roles.
function viewAllRoles() {
  connection.query("SELECT * from role", 
  function (err, res) {
    console.table(res);
    if (err) throw err;
    startProgram();
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

//---Function to exit the employee managment system.
function exitProgram() {
  connection.end();
  process.exit();
}