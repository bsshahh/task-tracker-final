import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  description: { 
    type: DataTypes.TEXT 
  },
  status: {
    type: DataTypes.ENUM("Todo", "Doing", "Done"),
    defaultValue: "Todo",
  },
  dueDate: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
});

export default Task;
