/* uri
const express = require("express");
const cors = require("cors");

require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BikeRidePartner Backend Running");
});

// 👇 Add this line
app.use("/users", require("./routes/users"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
*/
/* image local
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("BikeRidePartner Backend Running");
});

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});*/

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

require("./db");

const app = express();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

app.get("/", (req, res) => {
  res.send("BikeRidePartner Backend Running");
});

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
