import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DailyComponent } from "../daily/daily.component";
import { Expense } from "../models/expenses";
import { ApiService } from "../api.service";
import { error } from "protractor";
import { HttpParams } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmDialogComponent } from "../Components/Shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: "expense-deleted-snack-bar",
  template: `<span> <b>Alert</b> : Expense Deleted Successfully! </span>`,
  styles: [
    `
      .deleted-snack-bar {
        color: hotpink;
      }
    `,
  ],
})
export class ExpenseDeletedSnackBarComponent {}

@Component({
  selector: "app-current",
  templateUrl: "./current.component.html",
  styleUrls: ["./current.component.css"],
})
export class CurrentComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "expense_text",
    "amount",
    "expense_group_name",
    "expense_category_name",
    "expense_comment",
    "expense_date",
    "expense_category",
    "expense_group",
    "action",
  ];
  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadExpenseTable();
  }

  loadExpenseTable() {

    let labels = [];
    let f2 = function () { 
      return true;
    }
    labels?.some(f2)

    this.apiService.getExpense().subscribe((expenses: any) => {
      console.log(expenses);
      this.dataSource = new MatTableDataSource<Expense>(expenses.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteExpense(expenseId: number) {
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "800px",
      data: {
        title: "Are you sure?",
        message: "You are about to delete that expense ",
      },
    });

    // listen to response
    dialogRef.afterClosed().subscribe((dialogResult) => {
      // if user pressed yes dialogResult will be true,
      // if he pressed no - it will be false
      if (dialogResult) {
        this.apiService.deleteExpense(expenseId).subscribe(
          (res) => {
            this._snackBar.openFromComponent(ExpenseDeletedSnackBarComponent, {
              duration: 3000,
            });
            this.loadExpenseTable();
          },
          (error) => {
            console.log("error:");
            console.log(error);
            alert("expense delete failed.");
          },
          () => {
            // 'onCompleted' callback.
            // No errors, route to new page here
          }
        );
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DailyComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadExpenseTable();
    });
  }
}
