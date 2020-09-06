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

// Root path
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

//api-expense

app.get("/api/expenses", (req, res, next) => {
  //var sql = "select * from expenses";
  var sql =
    "select expenses.id as id,expenses.expense_text as expense_text,expenses.amount as amount,expenses.expense_comment as expense_comment,groups.name as expense_group_name,category.name as expense_category_name,groups.id as expense_group,expenses.expense_category as expense_category,expenses.expense_date as expense_date	from expenses join category on expenses.expense_category = category.id join groups on groups.id = category.group_id";
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
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
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
    "INSERT INTO expenses (expense_text, amount, expense_comment,expense_category,month,year,isActive,expense_date,created_date,created_by) VALUES (?,?,?,?,?,?,?,?,?,?)";
  var params = [
    data.expense_text,
    data.amount,
    data.expense_comment,
    data.expense_category,
    data.month,
    data.year,
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

app.delete("/api/expense/delete/:id", (req, res, next) => {
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

//api-category

app.get("/api/categories", (req, res, next) => {
  //var sql = "select * from expenses";
  var sql =
    "select  category.id as id, category.name as name, groups.name as 'group',groups.fname as 'class',groups.id as group_id ,category.isActive as 'enabled' from category left join groups on category.group_id = groups.id where category.isActive=1 and groups.isActive=1";
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

app.get("/api/category/:id", (req, res, next) => {
  var sql = "select * from category where id = ?";
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

app.post("/api/category/", (req, res, next) => {
  var errors = [];
  if (!req.body.name) {
    errors.push("No category name specified");
  }
  if (!req.body.group_id) {
    errors.push("No group id specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    name: req.body.name,
    group_id: req.body.group_id,
    isActive: 1,
  };
  var sql = "INSERT INTO category (name, group_id, isActive) VALUES (?,?,?)";
  var params = [data.name, data.group_id, data.isActive];
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

app.patch("/api/category/:id", (req, res, next) => {
  var data = {
    name: req.body.name,
    group_id: req.body.group_id,
    isActive: 1,
  };
  db.run(
    `UPDATE category set 
    name = coalesce(?,name),
    group_id = COALESCE(?,group_id)
    WHERE id = ?`,
    [data.name, data.group_id, req.params.id],
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

app.delete("/api/category/delete/:id", (req, res, next) => {
  db.run("DELETE FROM category WHERE id = ?", req.params.id, function (
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

app.get("/api/groups", (req, res, next) => {
  var sql = "select id,name from groups where isActive=1";
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

app.get("/api/monthlySummary/:id", (req, res, next) => {
  var sql =
    "SELECT e.id as transactionId,g.id as groupdId,g.name as [Group],c.id as categoryId,c.name as [Category],SUM(amount) FILTER (WHERE month =  1) JAN,SUM(amount) FILTER (WHERE month =  2) FEB,SUM(amount) FILTER (WHERE month =  3) MAR,SUM(amount) FILTER (WHERE month =  4) APR,SUM(amount) FILTER (WHERE month =  5) MAY,SUM(amount) FILTER (WHERE month =  6) JUN,SUM(amount) FILTER (WHERE month =  7) JUL,SUM(amount) FILTER (WHERE month =  8) AUG,SUM(amount) FILTER (WHERE month =  9) SEP,SUM(amount) FILTER (WHERE month =  10) OCT,SUM(amount) FILTER (WHERE month =  11) NOV,SUM(amount) FILTER (WHERE month =  12) DEC from groups g left join category c on g.id = c.group_id left join expenses e on e.expense_category = c.id where g.id = 3 group by g.name,c.name";
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
