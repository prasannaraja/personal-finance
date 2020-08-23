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
import { Expense } from "../expenses";
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
    this.categories = [
      { name: "Swiggy", selected: false, categoryId: 50 },
      { name: "Food Item", selected: false, categoryId: 50 },
      { name: "Groceries", selected: false, categoryId: 45 },
      { name: "Medicine", selected: false, categoryId: 36 },
      { name: "Savings", selected: false, categoryId: 9 },
      { name: "PPF Savings", selected: false, categoryId: 10 },
      { name: "Medical Insurance", selected: false, categoryId: 34 },
      { name: "Entertainment", selected: false, categoryId: 55 },
      { name: "Amazon Child Item", selected: false, categoryId: 60 },
      { name: "Amazon", selected: false, categoryId: 23 },
      { name: "Amazon EMI", selected: false, categoryId: 9 },
      { name: "Netflix", selected: false, categoryId: 56 },
      { name: "Youtube Premium", selected: false, categoryId: 57 },
      { name: "HotStar", selected: false, categoryId: 58 },
      { name: "ICloud", selected: false, categoryId: 54 },
      { name: "Apple TV", selected: false, categoryId: 54 },
      { name: "Jio", selected: false, categoryId: 19 },
      { name: "Vodafone", selected: false, categoryId: 19 },
      { name: "Internet", selected: false, categoryId: 21 },
      { name: "Adjustment", selected: false, categoryId: 7 },
      { name: "House Rent", selected: false, categoryId: 14 },
      { name: "Apartment Maintance", selected: false, categoryId: 14 },
      { name: "Electricity Bill", selected: false, categoryId: 16 },
      { name: "BESCOM", selected: false, categoryId: 16 },
      { name: "Petrol", selected: false, categoryId: 29 },
      { name: "Taxi", selected: false, categoryId: 30 },
      { name: "Car Service", selected: false, categoryId: 30 },
      { name: "Furniture", selected: false, categoryId: 22 },
      { name: "Maid", selected: false, categoryId: 25 },
      { name: "Others", selected: false, categoryId: 0 },
    ];
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
    this.formGroup.controls["categoryId"].setValue(category.categoryId);
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
