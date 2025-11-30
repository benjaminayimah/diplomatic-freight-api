import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import sequelize from "./config/sequelize.js";

import authRoutes from "./routes/authRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

dotenv.config();

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(helmet());

// Test the database connection only (no sync in production)
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });



const allowedOrigins = [
  process.env.FRONTEND_URL, // http://localhost:3000
  "http://localhost:3001"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS: Not allowed by policy"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));



// Health route
app.get("/api", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/quote", quoteRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => console.log(`Backend running on port: ${PORT}`));
