import { Component, OnInit } from "@angular/core";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "../api.service";
import { Group } from "../models/Group";
import { MonthlySummary } from "../models/monthlySummary";

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
    this.displayedColumns = [
      "Category",
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
    ];
  }

  ngOnInit(): void {
    this.getMonthlySummary();
  }

  getMonthlySummary() {
    this.apiService.getMonthlySummary(3).subscribe((s: any) => {
      console.log(s.data);
      this.dataSource = new MatTableDataSource<MonthlySummary>(s.data);
    });
  }
}
