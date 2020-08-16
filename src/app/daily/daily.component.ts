import { Component, OnInit, ViewChild } from "@angular/core";
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.categories = [
      { name: "Swiggy", selected: false, value: 1 },
      { name: "Food Item", selected: false },
      { name: "Groceries", selected: false },
      { name: "Medicine", selected: false },
      { name: "Savings", selected: false },
      { name: "PPF Savings", selected: false },
      { name: "Medical Insurance", selected: false },
      { name: "Entertainment", selected: false },
      { name: "Amazon Child Item", selected: false },
      { name: "Amazon", selected: false },
      { name: "Amazon EMI", selected: false },
      { name: "Netflix", selected: false },
      { name: "Youtube Premium", selected: false },
      { name: "HotStar", selected: false },
      { name: "ICloud", selected: false },
      { name: "Apple TV", selected: false },
      { name: "Jio", selected: false },
      { name: "Vodafone", selected: false },
      { name: "Internet", selected: false },
      { name: "Adjustment", selected: false },
      { name: "House Rent", selected: false },
      { name: "Apartment Maintance", selected: false },
      { name: "Electricity Bill", selected: false },
      { name: "BESCOM", selected: false },
      { name: "Petrol", selected: false },
      { name: "Taxi", selected: false },
      { name: "Car Service", selected: false },
      { name: "Furniture", selected: false },
      { name: "Maid", selected: false },
      { name: "Others", selected: false },
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

  onSubmit(post) {
    this.post = post;
  }
}
