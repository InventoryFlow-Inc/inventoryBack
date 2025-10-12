import Business from "../models/business.model.js";
import User from "../models/user.model.js";

export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBusiness = async (req, res) => {
  try {
    const { name, owner, employees, registrationNumber, email, cellphoneNumber } = req.body;

    if (!name || !owner || !registrationNumber || !email || !cellphoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newBusiness = new Business({
      name,
      owner,
      employees: employees || [],
      registrationNumber,
      email,
      cellphoneNumber,
      status: "pending"
    });

    await newBusiness.save();
    res.status(201).json(newBusiness);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id);
    res.json({ message: "Business deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ When a business is approved, add it as a user
export const approveBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: "Business not found" });

    business.status = "approved";
    await business.save();

    // Check if user already exists
    let user = await User.findOne({ email: business.email });
    if (!user) {
      user = new User({
        email: business.email,
        role: "business",
        status: "approved"
      });
      await user.save();
    } else {
      user.status = "approved";
      user.role = "business";
      await user.save();
    }

    res.json({ message: "Business approved and added to users", business, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
