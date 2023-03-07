const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};

const getAllEmployee = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        "name": req.body.name,
        "age": req.body.age,
        "city": req.body.city,
        "hobbies": req.body.hobbies
    }

    if (!newEmployee.name || !newEmployee.age || !newEmployee.city || !newEmployee.hobbies) {
        return res.status(400).json({ 'message': 'name, age, city and hobbies are required.'});
    }  

    data.setEmployees([...data.employees, newEmployee]);
    res.status(200).json(data.employees);
}

const updateEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found`});
    }
    if (req.body.name) employee.name = req.body.name;
    if (req.body.age) employee.age = req.body.age;
    if (req.body.city) employee.city = req.body.city;
    if (req.body.hobbies) employee.hobbies = req.body.hobbiesl
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unSortedArray = [...filteredArray, employee];
    data.setEmployees(unSortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found`});
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found`});
    }
    res.json(employee);
}

module.exports = {
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}