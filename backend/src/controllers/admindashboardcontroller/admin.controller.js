import Task from "../../models/task.model.js";
import User from "../../models/user.model.js";
import Category from "../../models/category.model.js";
import { Op } from "sequelize";


//Admin Dashboard: View all tasks (with filters)
export const getAllTasks = async (req, res) => {
  try {
    const { userId, status, startDate, endDate } = req.query;

    const filters = {};

    if (userId) filters.userId = userId;
    if (status) filters.status = status;
    if (startDate && endDate) {
      filters.dueDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      filters.dueDate = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      filters.dueDate = { [Op.lte]: new Date(endDate) };
    }

    // Fetch all tasks with related User & Category
    const tasks = await Task.findAll({
      where: filters,
      include: [
        { model: User, attributes: ["id", "name", "email"] },
        { model: Category, attributes: ["id", "name"] },
      ],
      order: [["dueDate", "ASC"]],
    });
    
    res.json({
      total: tasks.length,
      tasks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

