const express = require("express");
const employees = require("./employees.json");

const app = express();

// Middlewares
//----------------------------------------------
app.use(express.json());

// Routes
//----------------------------------------------
/**
 *  Create a new Employee
*/ 
app.post("/api/employees", (req, res, next) => {

    // Body Params
    const params = req.body;

    // Validating that the JSON object is similar to the other Employees object
    if (
        !params ||
        !params.name ||
        !params.age ||
        !params.phone.personal ||
        !params.phone.work ||
        !params.phone.ext ||
        !params.privileges ||
        !params.favorites.artist ||
        !params.favorites.food ||
        (!Array.isArray(params.finished) || params.finished.length < 1) ||
        (!Array.isArray(params.badges) || params.badges.length < 1) ||
        (!Array.isArray(params.points) || params.points.length < 1)
    ) {
        return res.status(400).json({ code: "bad_request" });
    }

    // Adding new entry to employee variable in memory
    employees.push(params);

    return res.status(201).json({ code: "created"});
});

/**
 * Get the employees info
 */
app.get("/api/employees", (req, res, next) => {
    
    // Query Params
    const page = req.query.page;
    const user = req.query.user;
    const badges = req.query.badges;

    // Page Variables
    const size = 2;
    const beginPosition = (size * (page - 1));
    const lastPosition = beginPosition + size;

    // If no page param then send all Employees
    if (!page && !user && !badges) {
        return res.json(employees);
    }

    // If page param is greater than 3 then return Error
    if (
        page == 1 || 
        (page > 1 && employees.length > beginPosition)
    ) {
        return res.json(employees.slice(beginPosition, lastPosition));
    }

    // Return all Users with privileges = user
    if (user == "true") {
        let userList = [];

        employees.forEach(element => {
            if (element.privileges == "user") {
                userList.push(element);
            }
        });

        // If no users found, then Error
        if (userList.length < 1) {
            return res.status(404).json({ code: "not_found" });
        }

        return res.json(userList);
    }

    // Return all Users with badges = black
    if (badges) {
        let userList = [];

        employees.forEach(element => {
            if (element.badges.includes(badges)) {
                userList.push(element);
            }
        });

        // If no users found, then Error
        if (userList.length < 1) {
            return res.status(404).json({ code: "not_found" });
        }

        return res.json(userList);
    }

    return res.status(400).json({ code: "bad_request" });
});

/**
 * Get the oldest employee info
 */
app.get("/api/employees/oldest", (req, res, next) => {
    
    let oldestEmployee = { age: 0 };
    
    employees.forEach(element => {
        if (element.age > oldestEmployee.age) {
            oldestEmployee = element;
        }
    });

    return res.json(oldestEmployee);
});

/**
 * Get employees info by Name
 */
app.get("/api/employees/:NAME", (req, res, next) => {
    
    // URL Params
    const name = req.params.NAME;

    let userList = [];

    employees.forEach(element => {
        if (element.name.toLowerCase() == name.toLowerCase()) {
            userList.push(element);
        }
    });

    // If no users found with that name then Error
    if (userList.length < 1 || !name) {
        return res.status(404).json({ code: "not_found" });
    }

    return res.json(userList);
});

module.exports = app;