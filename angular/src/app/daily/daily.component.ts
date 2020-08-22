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
import { MatDialog } from "@angular/material/dialog";

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
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.createForm();
    this.categories = [
      { name: "Swiggy", selected: false, group: 49, category: 7 },
      { name: "Food Item", selected: false, group: 49, category: 7 },
      { name: "Groceries", selected: false, group: 49, category: 7 },
      { name: "Medicine", selected: false, group: 49, category: 7 },
      { name: "Savings", selected: false, group: 49, category: 7 },
      { name: "PPF Savings", selected: false, group: 49, category: 7 },
      { name: "Medical Insurance", selected: false, group: 49, category: 7 },
      { name: "Entertainment", selected: false, group: 49, category: 7 },
      { name: "Amazon Child Item", selected: false, group: 49, category: 7 },
      { name: "Amazon", selected: false, group: 49, category: 7 },
      { name: "Amazon EMI", selected: false, group: 49, category: 7 },
      { name: "Netflix", selected: false, group: 49, category: 7 },
      { name: "Youtube Premium", selected: false, group: 49, category: 7 },
      { name: "HotStar", selected: false, group: 49, category: 7 },
      { name: "ICloud", selected: false, group: 49, category: 7 },
      { name: "Apple TV", selected: false, group: 49, category: 7 },
      { name: "Jio", selected: false, group: 49, category: 7 },
      { name: "Vodafone", selected: false, group: 49, category: 7 },
      { name: "Internet", selected: false, group: 49, category: 7 },
      { name: "Adjustment", selected: false, group: 49, category: 7 },
      { name: "House Rent", selected: false, group: 49, category: 7 },
      { name: "Apartment Maintance", selected: false, group: 49, category: 7 },
      { name: "Electricity Bill", selected: false, group: 49, category: 7 },
      { name: "BESCOM", selected: false, group: 49, category: 7 },
      { name: "Petrol", selected: false, group: 49, category: 7 },
      { name: "Taxi", selected: false, group: 49, category: 7 },
      { name: "Car Service", selected: false, group: 49, category: 7 },
      { name: "Furniture", selected: false, group: 49, category: 7 },
      { name: "Maid", selected: false, group: 49, category: 7 },
      { name: "Others", selected: false, group: 0, category: 0 },
    ];
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      expense: [null, [Validators.required, Validators.minLength(1)]],
      amount: [null, Validators.required],
      comment: [null, [Validators.required, Validators.maxLength(100)]],
      category: "",
    });
  }

  getErrorExpense() {
    return this.formGroup.get("expense").hasError("required")
      ? "Field is required"
      : "";
  }

  changeSelected($event, category): void {
    category.selected = $event.selected;
  }

  onSubmit(data) {
    debugger;
    let exp = new Expense();
    exp.expense_text = data.expense;
    exp.amount = data.amount;
    exp.expense_comment = data.comment;
    exp.expense_category = 2;
    exp.isActive = 1;
    exp.expense_date = "2020-01-01 01:01:01.011";
    exp.created_date = "2020-01-01 01:01:01.011";
    exp.created_by = "system";

    this.apiService.addExpense(exp).subscribe(
      (res) => {
        console.log("saved:");
        console.log(res);
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
