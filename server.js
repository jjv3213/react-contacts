const express = require("express");
const connectToDB = require("./config/db");

const app = express();

// connect to db
connectToDB();

// middleware
app.use(express.json());

app.get("/", (req, res) => res.json({ msg: "welcome" }));

// Define Rooutes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
