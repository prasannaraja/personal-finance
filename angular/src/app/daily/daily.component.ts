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
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

interface ExpenseType {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
  { position: 11, name: "Sodium", weight: 22.9897, symbol: "Na" },
  { position: 12, name: "Magnesium", weight: 24.305, symbol: "Mg" },
  { position: 13, name: "Aluminum", weight: 26.9815, symbol: "Al" },
  { position: 14, name: "Silicon", weight: 28.0855, symbol: "Si" },
  { position: 15, name: "Phosphorus", weight: 30.9738, symbol: "P" },
  { position: 16, name: "Sulfur", weight: 32.065, symbol: "S" },
  { position: 17, name: "Chlorine", weight: 35.453, symbol: "Cl" },
  { position: 18, name: "Argon", weight: 39.948, symbol: "Ar" },
  { position: 19, name: "Potassium", weight: 39.0983, symbol: "K" },
  { position: 20, name: "Calcium", weight: 40.078, symbol: "Ca" },
];

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

  animal: string;
  name: string;

  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.createForm();
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

    this.apiService.getExpense().subscribe((data) => {
      console.log(data);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DailyComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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
    let exp = new Expense();
    exp.expense_text = data.expense;
    exp.amount = data.amount;
    exp.expense_comment = data.comment;
    exp.expense_category = 2;
    exp.isActive = 1;
    exp.expense_date = "2020-01-01 01:01:01.011";
    exp.created_date = "2020-01-01 01:01:01.011";
    exp.created_by = "system";

    this.apiService.addExpense(exp).subscribe((res) => {
      console.log(res);
    });
  }
}


