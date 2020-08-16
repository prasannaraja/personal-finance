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
export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: "app-daily",
  templateUrl: "./daily.component.html",
  styleUrls: ["./daily.component.css"],
})
export class DailyComponent implements OnInit {
  formGroup: FormGroup;
  amountAlert: string = "This field is required";
  post: any = "";
  categories: any = "";
  removable: boolean = false;

  foods: ExpenseType[] = [
    { value: "0", viewValue: "Savings" },
    { value: "1", viewValue: "Home Expenses" },
    { value: "2", viewValue: "Transportation" },
    { value: "2", viewValue: "Health" },
    { value: "2", viewValue: "Charity/Gifts" },
    { value: "2", viewValue: "Daily Living" },
    { value: "2", viewValue: "Entertainment" },
    { value: "2", viewValue: "Obligations" },
    { value: "2", viewValue: "Subscriptions" },
    { value: "2", viewValue: "Miscellaneous" },
  ];

  stateForm: FormGroup = this.formBuilder.group({
    stateGroup: "",
  });

  stateGroups: StateGroup[] = [
    {
      letter: "A",
      names: ["Alabama", "Alaska", "Arizona", "Arkansas"],
    },
    {
      letter: "C",
      names: ["California", "Colorado", "Connecticut"],
    },
    {
      letter: "D",
      names: ["Delaware"],
    },
    {
      letter: "F",
      names: ["Florida"],
    },
    {
      letter: "G",
      names: ["Georgia"],
    },
    {
      letter: "H",
      names: ["Hawaii"],
    },
    {
      letter: "I",
      names: ["Idaho", "Illinois", "Indiana", "Iowa"],
    },
    {
      letter: "K",
      names: ["Kansas", "Kentucky"],
    },
    {
      letter: "L",
      names: ["Louisiana"],
    },
    {
      letter: "M",
      names: [
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
      ],
    },
    {
      letter: "N",
      names: [
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
      ],
    },
    {
      letter: "Otee",
      names: ["Ohio", "Oklahoma", "Oregon", "prasanna"],
    },
    {
      letter: "P",
      names: ["Pennsylvania"],
    },
    {
      letter: "R",
      names: ["Rhode Island"],
    },
    {
      letter: "S",
      names: ["South Carolina", "South Dakota"],
    },
    {
      letter: "T",
      names: ["Tennessee", "Texas"],
    },
    {
      letter: "U",
      names: ["Utah"],
    },
    {
      letter: "V",
      names: ["Vermont", "Virginia"],
    },
    {
      letter: "W",
      names: ["Washington", "West Virginia", "Wisconsin", "Wyoming"],
    },
  ];

  stateGroupOptions: Observable<StateGroup[]>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    this.stateGroupOptions = this.stateForm
      .get("stateGroup")!
      .valueChanges.pipe(
        startWith(""),
        map((value) => this._filterGroup(value))
      );

    this.categories = [
      { name: "Swiggy", selected: false },
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
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      stateGroup: "",
    });
  }

  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map((group) => ({
          letter: group.letter,
          names: _filter(group.names, value),
        }))
        .filter((group) => group.names.length > 0);
    }

    return this.stateGroups;
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
