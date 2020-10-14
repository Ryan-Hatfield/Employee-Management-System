DROP DATABASE IF EXISTS employee_management_db;

CREATE DATABASE employee_management_db;

USE employee_management_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT(10) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL, 
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Inserting the various departments into the "departments" table.

INSERT INTO department (name)
VALUES ("Operations"), ("Accounting"), ("Management"), ("Engineering");

-- Inserting the various roles into the "roles" table.

INSERT INTO role (title, salary, department_id)
VALUES ("Field Operator", 80000, 1),
("Project Manager", 110000, 1),
("Accountant", 125000, 2),
("Area Manager", 175000, 3), 
("CEO", 200000, 3), 
("Senior Engineer", 120000, 4);

-- Inserting various employees into the "employees" table.

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Hatfield", 5, null),
("John", "Smith", 2, 1),
("Scott", "Anderson", 3 , 1),
("Joe", "Jones", 4, 1),
("Mike", "Morris", 1, 4),
("Emily", "Brown", 6, 2);

