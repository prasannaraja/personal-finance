import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DailyComponent } from "../daily/daily.component";
import { Expense } from "../expenses";
import { ApiService } from "../api.service";

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

  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getExpense().subscribe((expenses: any) => {
      debugger;
      console.log(expenses);
      this.dataSource = new MatTableDataSource<Expense>(expenses.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DailyComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
