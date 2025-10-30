import sequelize from '../config/db.js';
import User from './user.model.js';
import Category from './category.model.js';
import Task from './task.model.js';
import TokenBlacklist from './tokenblacklist.model.js';

// Relations
User.hasMany(Task, { 
    foreignKey: 'userId', 
    onDelete: 'CASCADE' 
});

Task.belongsTo(User, { 
    foreignKey: 'userId' 
});

Category.hasMany(Task, { 
    foreignKey: 'categoryId', 
    onDelete: 'SET NULL' 
});

Task.belongsTo(Category, { 
    foreignKey: 'categoryId' 
});

// Sync all models with DB
export const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully!');
  } catch (err) {
    console.error('❌ Error syncing DB:', err);
    process.exit(1);
  }
};

export { sequelize, User, Category, Task, TokenBlacklist };
