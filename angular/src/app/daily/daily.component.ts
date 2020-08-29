import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { ValidationService } from "../validation.service";
import { startWith, map } from "rxjs/operators";
import { MatAccordion } from "@angular/material/expansion";
import { ApiService } from "../api.service";
import { Expense } from "../models/expenses";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";

interface ExpenseType {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-daily",
  templateUrl: "./daily.component.html",
  styleUrls: ["./daily.component.css"],
})
export class DailyComponent implements OnInit {
  formGroup: FormGroup;
  amountAlert: string = "This field is required";
  commentAlert: string = "comment can be max 100 char";
  post: any = "";
  categories: any = "";
  removable: boolean = false;
  expenses: any = "";

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DailyComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadCategory();
  }

  loadCategory() {
    this.apiService.getCategory().subscribe((categories: any) => {
      this.categories = categories.data;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      expense: [null, [Validators.required, Validators.minLength(1)]],
      amount: [null, Validators.required],
      comment: [null, [Validators.required, Validators.maxLength(100)]],
      category: "",
      categoryId: "",
    });
  }

  getErrorExpense() {
    return this.formGroup.get("expense").hasError("required")
      ? "Field is required"
      : "";
  }

  changeSelected($event, category): void {
    category.selected = $event.selected;
    this.formGroup.controls["categoryId"].setValue(category.id);
    alert(category.group_id);
    if ((category.group_id = 1)) {
      
    }
  }

  onSubmit(data) {
    debugger;
    let ACTIVE = 1;
    let exp = new Expense();
    exp.expense_text = data.expense;
    exp.amount = data.amount;
    exp.expense_comment = data.comment;
    exp.expense_category = data.categoryId;
    exp.isActive = ACTIVE;
    exp.expense_date = "2020-08-20 17:51:52";
    exp.created_date = "2020-08-20 17:51:52";
    exp.created_by = "system";

    this.apiService.addExpense(exp).subscribe(
      (res) => {
        console.log("saved:");
        console.log(res);

        this.dialogRef.close();
      },
      (error) => {
        console.log("error:");
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
}
