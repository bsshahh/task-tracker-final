import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const TokenBlacklist = sequelize.define('TokenBlacklist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  expiresAt: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
});

export default TokenBlacklist;
