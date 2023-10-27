import express, { Application } from "express";
import setupUserRoutes from "./app/routes/user.routes";
import db from "./app/models";

const app: Application = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

setupUserRoutes(app);

// Set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
