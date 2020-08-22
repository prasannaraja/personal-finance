var express = require("express");
var app = express();
var db = require("./database-expense.js");
var md5 = require("md5");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/api/expenses", (req, res, next) => {
  var sql = "select * from expenses";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/expense/:id", (req, res, next) => {
  var sql = "select * from expenses where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

app.post("/api/expense/", (req, res, next) => {
  var errors = [];
  if (!req.body.expense_text) {
    errors.push("No expense_text specified");
  }

  if (!req.body.amount) {
    errors.push("No amount specified");
  }
  if (!req.body.expense_category) {
    errors.push("No expense_category specified");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    expense_text: req.body.expense_text,
    amount: req.body.amount,
    expense_comment: req.body.expense_comment,
    expense_category: req.body.expense_category,
    isActive: 1,
    expense_date: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    created_date: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    created_by: req.body.created_by,
  };
  var sql =
    "INSERT INTO expenses (expense_text, amount, expense_comment,expense_category,isActive,expense_date,created_date,created_by) VALUES (?,?,?,?,?,?,?,?)";
  var params = [
    data.expense_text,
    data.amount,
    data.expense_comment,
    data.expense_category,
    data.isActive,
    data.expense_date,
    data.created_date,
    data.created_by,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.patch("/api/expense/:id", (req, res, next) => {
  var data = {
    expense_text: req.body.expense_text,
    amount: req.body.amount,
    expense_comment: req.body.expense_comment,
    expense_category: req.body.expense_category,
    isActive: 1,
    expense_date: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    created_date: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    created_by: "admin",
  };
  db.run(
    `UPDATE expenses set 
      expense_text = coalesce(?,expense_text),
      amount = COALESCE(?,amount),
      expense_comment = coalesce(?,expense_comment),
      expense_category=coalesce(?,expense_category) 
    WHERE id = ?`,
    [
      data.expense_text,
      data.amount,
      data.expense_comment,
      data.expense_category,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
      });
    }
  );
});

app.delete("/api/delete/:id", (req, res, next) => {
  db.run("DELETE FROM expenses WHERE id = ?", req.params.id, function (
    err,
    result
  ) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }
    res.json({ message: "deleted", rows: this.changes });
  });
});

// Root path
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});
