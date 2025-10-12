import Employee from "../models/employee.model.js";
import Business from "../models/business.model.js";
import User from "../models/user.model.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, employedBy, email, cellphoneNumber } = req.body;

    if (!name || !employedBy || !email || !cellphoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEmployee = new Employee({
      name,
      employedBy,
      email,
      cellphoneNumber,
      status: "pending"
    });

    await newEmployee.save();

    // Add employee email to the corresponding business
    const business = await Business.findOne({ name: employedBy });
    if (business) {
      business.employees.push(email);
      await business.save();
    }

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ When an employee is approved, add them to the users collection
export const approveEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    employee.status = "approved";
    await employee.save();

    // Check if user already exists
    let user = await User.findOne({ email: employee.email });
    if (!user) {
      user = new User({
        email: employee.email,
        role: "employee",
        employedBy: employee.employedBy,
        status: "approved"
      });
      await user.save();
    } else {
      user.status = "approved";
      user.role = "employee";
      user.employedBy = employee.employedBy;
      await user.save();
    }

    res.json({ message: "Employee approved and added to users", employee, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
