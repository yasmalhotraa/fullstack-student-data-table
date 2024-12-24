const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const cron = require("node-cron"); // Add the cron module
const prisma = new PrismaClient();
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Connect to the database
prisma
  .$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Error connecting to database:", error));

// Cron job to fetch students
cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("Fetching students from the database...");
    const students = await prisma.student.findMany();
    console.log("Fetched students:", students);
  } catch (error) {
    console.error("Error in cron job while fetching students:", error);
  }
});

// POST - Create a new student
app.post("/api/students", async (req, res) => {
  const {
    name,
    cohort,
    courses,
    dateJoined,
    lastLogin,
    status,
    academicYear,
    category,
  } = req.body;

  try {
    const student = await prisma.student.create({
      data: {
        name,
        cohort,
        courses,
        dateJoined,
        lastLogin,
        status,
        academicYear,
        category,
      },
    });
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error creating student" });
  }
});

// GET - Fetch all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error fetching students" });
  }
});

// GET - Fetch a single student by ID
app.get("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error fetching student" });
  }
});

// PUT - Update a student
app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    cohort,
    courses,
    dateJoined,
    lastLogin,
    status,
    academicYear,
    category,
  } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        cohort,
        courses,
        dateJoined,
        lastLogin,
        status,
        academicYear,
        category,
      },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error updating student" });
  }
});

// DELETE - Delete a student
app.delete("/api/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await prisma.student.delete({
      where: { id: parseInt(id) }, // Ensure id is parsed to an integer
    });
    res.status(200).json(deletedStudent);
  } catch (error) {
    console.error("Error deleting student:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to delete student" });
  }
});

// Start the server on a specified port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
