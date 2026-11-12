import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { StartDB } from "./src/config/db.js";
import { User } from "./src/models/user.model.js";
import { Event } from "./src/models/event.model.js";
import { Category } from "./src/models/category.model.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { eventRoutes } from "./src/routes/event.routes.js";
import { categoryRoutes } from "./src/routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/categories", categoryRoutes);

await StartDB();
await User.init();
await Event.init();
await Category.init();

app.listen(PORT, () => {
  console.log("El servidor arrancó correctamente en PUERTO", PORT);
});
