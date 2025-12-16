const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (weight <= 0 || height <= 0) {
    return res.send("Invalid input");
  }

  const h = height / 100;
  const bmi = (weight / (h * h)).toFixed(2);

  let category = "";
  let color = "";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "blue";
  } else if (bmi < 24.9) {
    category = "Normal";
    color = "green";
  } else if (bmi < 29.9) {
    category = "Overweight";
    color = "orange";
  } else {
    category = "Obese";
    color = "red";
  }

  res.send(`
    <h2 style="color:${color}">
      Your BMI: ${bmi} (${category})
    </h2>
    <a href="/">Back</a>
  `);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
