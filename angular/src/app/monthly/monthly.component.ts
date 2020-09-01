import { Component, OnInit } from "@angular/core";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "../api.service";
import { Group } from "../models/Group";
import { Summary } from "@angular/compiler";

export interface summaryTemplate {
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
  Total: number;
  Avg: number;
}

const sampleData: summaryTemplate[] = [
  {
    dispField: "Total Income",
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
    Total: 0,
    Avg: 0,
  },
  {
    dispField: "Total Expenses",
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
    Total: 0,
    Avg: 0,
  },
  {
    dispField: "NET (Income - Expenses)",
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
    Total: 0,
    Avg: 0,
  },
  {
    dispField: "Projected End Balance",
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
    Total: 0,
    Avg: 0,
  },
];
const incomeData: summaryTemplate[] = [
  {
    dispField: "Wages & Tips",
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
    Total: 0,
    Avg: 0,
  },
  {
    dispField: "Interest Income",
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
    Total: 0,
    Avg: 0,
  },
  {
    dispField: "Dividends",
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
    Total: 0,
    Avg: 0,
  },
  {
    dispField: "Gifts Received",
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
    Total: 0,
    Avg: 0,
  },
];
@Component({
  selector: "app-monthly",
  templateUrl: "./monthly.component.html",
  styleUrls: ["./monthly.component.css"],
})
export class MonthlyComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any;
  incomeGroupSource: any;
  tables = [0];
  groups: Group;

  constructor(private apiService: ApiService) {
    this.displayedColumns.length = 12;
    this.displayedColumns.fill("filler");
    this.dataSource = new MatTableDataSource<summaryTemplate>(sampleData);
    this.incomeGroupSource = new MatTableDataSource<summaryTemplate>(
      incomeData
    );
    this.displayedColumns = [
      "dispField",
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
      "Total",
      "Avg",
    ];
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.apiService.getGroups().subscribe((groups: any) => {
      this.groups = groups.data;
    });
  }

  getCategorySummaryFor(categoryName: string): summaryTemplate[] {
    const template: summaryTemplate[] = [];
    this.apiService.getCategory().subscribe();
    return template;
  }
}
