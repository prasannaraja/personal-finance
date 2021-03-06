import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { ApiService } from "../api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Expense } from "../models/expenses";
import { ConfirmDialogComponent } from "../Components/Shared/confirm-dialog/confirm-dialog.component";
import { ExpenseDeletedSnackBarComponent } from "../current/current.component";
import { DailyComponent } from "../daily/daily.component";
import { Category } from "../models/category";
import { AddCatergoryComponent } from "../add-catergory/add-catergory.component";

@Component({
  selector: "category-deleted-snack-bar",
  template: `<span> <b>Alert</b> : Category Deleted Successfully! </span>`,
  styles: [
    `
      .deleted-snack-bar {
        color: hotpink;
      }
    `,
  ],
})
export class CategoryDeletedSnackBarComponent {}

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "name",
    "group_id",
    "group",
    "enabled",
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
    this.loadCategory();
  }

  loadCategory() {
    this.apiService.getCategory().subscribe((category: any) => {
      this.dataSource = new MatTableDataSource<Category>(category.data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteCategory(categoryId: number) {
    // let's call our modal window
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "800px",
      data: {
        title: "Are you sure?",
        message: "You are about to delete that category ",
      },
    });

    // listen to response
    dialogRef.afterClosed().subscribe((dialogResult) => {
      // if user pressed yes dialogResult will be true,
      // if he pressed no - it will be false
      if (dialogResult) {
        this.apiService.deleteCategory(categoryId).subscribe(
          (res) => {
            this._snackBar.openFromComponent(CategoryDeletedSnackBarComponent, {
              duration: 3000,
            });
            this.loadCategory();
          },
          (error) => {
            console.log("error:");
            console.log(error);
            alert("Category delete failed.");
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
    const dialogRef = this.dialog.open(AddCatergoryComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadCategory();
    });
  }
}
