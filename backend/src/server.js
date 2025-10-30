import express from 'express';
import { syncDB } from './models/index.js';
import routes from "./routes/server.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json" assert { type: "json" };
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Task Tracker Lite API running'));

syncDB(); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api',routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
