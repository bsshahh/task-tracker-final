import Task from "../../models/task.model.js";
import Category from "../../models/category.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, categoryId } = req.body;
    const userId = req.user.id;

    if (!title || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title and due date are required" });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      categoryId,
      userId,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get All Tasks
export const getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.findAll({
      where: { userId },
      include: [{ model: Category, attributes: ["name"] }],
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update Task (can only change status before due date)
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, status, dueDate, categoryId } = req.body;

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Prevent status change after due date
    const now = new Date();
    if (status && new Date(task.dueDate) < now) {
      return res.status(400).json({
        message: "Cannot change status after due date has passed",
      });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (categoryId !== undefined) task.categoryId = categoryId;
    await task.save();
    
    res.json({ message: "Task updated successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
