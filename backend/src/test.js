import sequelize from "./config/db.js";

try {
  await sequelize.authenticate();
  console.log("✅ Connected to Railway MySQL successfully!");
} catch (err) {
  console.error("❌ Connection error:", err);
}
