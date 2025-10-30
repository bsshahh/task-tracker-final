import Category from "../../models/category.model.js";

//Create category (Admin only)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Category name required" });

    const existing = await Category.findOne({ where: { name } });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all categories (any user)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update category (Admin only)
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    await category.save();

    res.json({ message: "Category updated", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete category (Admin only)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
