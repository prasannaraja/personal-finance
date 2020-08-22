var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "finance.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the [finance] database.");
    db.run(
      `CREATE TABLE expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            expense_text text,
            amount real, 
            expense_comment text,  
            expense_category int, 
            isActive int, 
            expense_date text, 
            created_date text,
            created_by text 
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO expenses (expense_text, amount, expense_comment,expense_category,isActive,expense_date,created_date,created_by) VALUES (?,?,?,?,?,?,?,?)";
          db.run(insert, [
            "sample",
            10,
            "expense_comment",
            2,
            1,
            "2020-01-01 01:01:01.011",
            "2020-01-01 01:01:01.011",
            "user01",
          ]);
        }
      }
    );
  }
});

module.exports = db;
