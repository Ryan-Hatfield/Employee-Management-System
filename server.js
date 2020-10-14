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
    message: "Please select below what you would like to do.",
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
    case "Exit employee management system":
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
//---Function to obtain roles and employees from db.
var roleList;
var employeeList; 
connection.connect(function (){
  connection.query("SELECT * from role", function (error, res) {
    roleList = res.map(role => ({ name: role.title, value: role.id }))
  });
  connection.query("SELECT * from employee", function (error, res) {
    employeeList = res.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
  });
}) 
//---Function to add an employee.
function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: "First Name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "Last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "Employee's role?",
      name: "role",
      choices: roleList
    },
    {
      type: "list",
      message: "Employee's manager?",
      name: "manager",
      choices: employeeList,
    }
  ]).then(function (response) {
    connection.query("INSERT INTO employee SET ?",
    {
      first_name: response.firstName,
      last_name: response.lastName,
      role_id: response.role,
      manager_id: response.manager
    }, function (error) {
      if (error) throw error;
    })
    startProgram();
  })
}

//---Function to add a department.
function addDept() {
  inquirer.prompt([{
    type: "input",
    message: "New Department: ",
    name: "name",
  },
  ]).then(function (res) {
    connection.query("INSERT INTO department SET ?", { name: res.name },
        function (err) {
            if (err) throw err;
            console.table(res);
            startProgram();
        });
  });
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