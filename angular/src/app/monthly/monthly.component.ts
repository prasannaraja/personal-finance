import { Component, OnInit } from "@angular/core";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";

export interface PeriodicElement {
  dispField: string;
  JAN: number;
  FEB: number;
  MAR: number;
  APR: number;
  MAY: number;
  JUN: number;
  JUL: number;
  AUG: number;
  SEP: number;
  OCT: number;
  NOV: number;
  DEC: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    dispField: "",
    JAN: 0,
    FEB: 0,
    MAR: 1.0079,
    APR: 0,
    MAY: 0,
    JUN: 0,
    JUL: 0,
    AUG: 0,
    SEP: 0,
    OCT: 0,
    NOV: 0,
    DEC: 0,
  },
  {
    dispField: "",
    JAN: 0,
    FEB: 0,
    MAR: 1.0079,
    APR: 0,
    MAY: 0,
    JUN: 0,
    JUL: 0,
    AUG: 0,
    SEP: 0,
    OCT: 0,
    NOV: 0,
    DEC: 0,
  },
  {
    dispField: "",
    JAN: 0,
    FEB: 0,
    MAR: 1.0079,
    APR: 0,
    MAY: 0,
    JUN: 0,
    JUL: 0,
    AUG: 0,
    SEP: 0,
    OCT: 0,
    NOV: 0,
    DEC: 0,
  },
  {
    dispField: "",
    JAN: 0,
    FEB: 0,
    MAR: 1.0079,
    APR: 0,
    MAY: 0,
    JUN: 0,
    JUL: 0,
    AUG: 0,
    SEP: 0,
    OCT: 0,
    NOV: 0,
    DEC: 0,
  },
];

@Component({
  selector: "app-monthly",
  templateUrl: "./monthly.component.html",
  styleUrls: ["./monthly.component.css"],
})
export class MonthlyComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = ELEMENT_DATA;

  tables = [0];

  constructor() {
    this.displayedColumns.length = 24;
    this.displayedColumns.fill("filler");

    // The first two columns should be position and name; the last two columns: weight, symbol
    //this.displayedColumns[0] = "position";
    //this.displayedColumns[1] = "name";
    //this.displayedColumns[22] = "weight";
    //this.displayedColumns[23] = "symbol";
  }

  ngOnInit(): void {}
}
