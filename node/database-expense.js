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
            "Sample Item",
            502,
            "Its a sample expense item",
            3,
            1,
            "2020-08-20 17:51:52",
            "2020-08-20 17:51:52",
            "system",
          ]);
        }
      }
    );

    db.run(
      `CREATE TABLE groups (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            isActive int
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = "INSERT INTO groups (name,isActive) VALUES (?,?)";
          db.run(insert, ["Income", 1]);
          db.run(insert, ["Savings", 1]);
          db.run(insert, ["Home Expenses", 1]);
          db.run(insert, ["Transportation", 1]);
          db.run(insert, ["Health", 1]);
          db.run(insert, ["Charity/Gifts", 1]);
          db.run(insert, ["Daily Living", 1]);
          db.run(insert, ["Entertainment", 1]);
          db.run(insert, ["Obligations", 1]);
          db.run(insert, ["Subscriptions", 1]);
          db.run(insert, ["Miscellaneous", 1]);
        }
      }
    );

    db.run(
      `CREATE TABLE category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            group_id int,  
            isActive int
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO category (name,group_id, isActive) VALUES (?,?,?)";
          db.run(insert, ["Wages & Tips", 1, 1]);
          db.run(insert, ["Interest Income", 1, 1]);
          db.run(insert, ["Dividends", 1, 1]);
          db.run(insert, ["Gifts Received", 1, 1]);
          db.run(insert, ["Refunds/Reimbursements", 1, 1]);
          db.run(insert, ["Transfer From Savings", 1, 1]);
          db.run(insert, ["Other", 1, 1]);
          db.run(insert, ["Emergency Fund", 2, 1]);
          db.run(insert, ["Transfer to Savings", 2, 1]);
          db.run(insert, ["Retirement (401k, IRA)", 2, 1]);
          db.run(insert, ["Investments", 2, 1]);
          db.run(insert, ["Education", 2, 1]);
          db.run(insert, ["Other", 2, 1]);
          db.run(insert, ["Mortgage/Rent", 3, 1]);
          db.run(insert, ["Home/Rental Insurance", 3, 1]);
          db.run(insert, ["Electricity", 3, 1]);
          db.run(insert, ["Gas/Oil", 3, 1]);
          db.run(insert, ["Water/Sewer/Trash", 3, 1]);
          db.run(insert, ["Phone", 3, 1]);
          db.run(insert, ["Cable/Satellite", 3, 1]);
          db.run(insert, ["Internet", 3, 1]);
          db.run(insert, ["Furnishings/Appliances", 3, 1]);
          db.run(insert, ["Lawn/Garden", 3, 1]);
          db.run(insert, ["Maintenance/Supplies", 3, 1]);
          db.run(insert, ["Improvements", 3, 1]);
          db.run(insert, ["Other", 3, 1]);
          db.run(insert, ["Vehicle Payments", 4, 1]);
          db.run(insert, ["Auto Insurance", 4, 1]);
          db.run(insert, ["Fuel", 4, 1]);
          db.run(insert, ["Bus/Taxi/Train Fare", 4, 1]);
          db.run(insert, ["Repairs", 4, 1]);
          db.run(insert, ["Registration/License", 4, 1]);
          db.run(insert, ["Other", 4, 1]);
          db.run(insert, ["Health Insurance", 5, 1]);
          db.run(insert, ["Doctor/Dentist", 5, 1]);
          db.run(insert, ["Medicine/Drugs", 5, 1]);
          db.run(insert, ["Health Club Dues", 5, 1]);
          db.run(insert, ["Life Insurance", 5, 1]);
          db.run(insert, ["Veterinarian/Pet Care", 5, 1]);
          db.run(insert, ["Other", 5, 1]);
          db.run(insert, ["Gifts Given", 6, 1]);
          db.run(insert, ["Charitable Donations", 6, 1]);
          db.run(insert, ["Religious Donations", 6, 1]);
          db.run(insert, ["Other", 6, 1]);
          db.run(insert, ["Groceries", 7, 1]);
          db.run(insert, ["Personal Supplies", 7, 1]);
          db.run(insert, ["Clothing", 7, 1]);
          db.run(insert, ["Cleaning", 7, 1]);
          db.run(insert, ["Education/Lessons", 7, 1]);
          db.run(insert, ["Dining/Eating Out", 7, 1]);
          db.run(insert, ["Salon/Barber", 7, 1]);
          db.run(insert, ["Pet Food", 7, 1]);
          db.run(insert, ["Other", 7, 1]);
          db.run(insert, ["Music", 8, 1]);
          db.run(insert, ["Movies/Theater/Concerts", 8, 1]);
          db.run(insert, ["Books", 8, 1]);
          db.run(insert, ["Hobbies", 8, 1]);
          db.run(insert, ["Sports", 8, 1]);
          db.run(insert, ["Recreation", 8, 1]);
          db.run(insert, ["Toys/Gadgets/Games", 8, 1]);
          db.run(insert, ["Vacation/Travel", 8, 1]);
          db.run(insert, ["Other", 8, 1]);
          db.run(insert, ["Student Loan", 9, 1]);
          db.run(insert, ["Other Loan", 9, 1]);
          db.run(insert, ["Credit Card Debt", 9, 1]);
          db.run(insert, ["Alimony/Child Support", 9, 1]);
          db.run(insert, ["Federal Taxes", 9, 1]);
          db.run(insert, ["State/Local Taxes", 9, 1]);
          db.run(insert, ["Other", 9, 1]);
          db.run(insert, ["Newspaper", 10, 1]);
          db.run(insert, ["Magazines", 10, 1]);
          db.run(insert, ["Dues/Memberships", 10, 1]);
          db.run(insert, ["Other", 10, 1]);
          db.run(insert, ["Bank Fees", 11, 1]);
          db.run(insert, ["Postage", 11, 1]);
          db.run(insert, ["Other", 11, 1]);
        }
      }
    );
  }
});

module.exports = db;
