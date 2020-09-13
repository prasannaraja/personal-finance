import { Component, OnInit } from "@angular/core";
import { MatButtonToggleGroup } from "@angular/material/button-toggle";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "../api.service";
import { Group } from "../models/Group";
import { MonthlySummary } from "../models/monthlySummary";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-monthly",
  templateUrl: "./monthly.component.html",
  styleUrls: ["./monthly.component.css"],
})
export class MonthlyComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource: any;
  groups: Group[];
  homeExpenses: any;
  transportation: any;
  health: any;
  charity: any;
  dailyLiving: any;
  entertainment: any;
  obligation: any;
  subscription: any;
  misc: any;
  TotalExpenses: any;
  SplitTotalExpenses: any;

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
    this.getHomeExpenses();
    this.getTransportationExpenses();
    this.getHealthExpenses();
    this.getCharityExpenses();
    this.getDailyLivingExpenses();
    this.getDailyEntertainmentExpenses();
    this.getObligationsExpenses();
    this.getSubscriptionsExpenses();
    this.getMiscellaneousExpenses();
    this.getSplitTotalExpenses();
    this.getTotalExpenses();
  }

  handleNullValue(summary: MonthlySummary[]) {
    summary.forEach((element) => {
      element.JAN = element.JAN ?? "-";
      element.FEB = element.FEB ?? "-";
      element.MAR = element.MAR ?? "-";
      element.APR = element.APR ?? "-";
      element.MAY = element.MAY ?? "-";
      element.JUN = element.JUN ?? "-";
      element.JUL = element.JUL ?? "-";
      element.AUG = element.AUG ?? "-";
      element.SEP = element.SEP ?? "-";
      element.OCT = element.OCT ?? "-";
      element.NOV = element.NOV ?? "-";
      element.DEC = element.DEC ?? "-";
    });

    return summary;
  }

  getTotalExpenses() {
    this.apiService.getTotalExpenses().subscribe((total: any) => {
      this.TotalExpenses = this.handleNullValue(total.data);
    });
  }

  getSplitTotalExpenses() {
    this.apiService.getSplitTotalExpenses().subscribe((total: any) => {
      this.SplitTotalExpenses = this.handleNullValue(total.data);
    });
  }

  getHomeExpenses() {
    const groupId = 3;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.homeExpenses = this.handleNullValue(summary.data);
    });
  }

  getTransportationExpenses() {
    const groupId = 4;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.transportation = this.handleNullValue(summary.data);
    });
  }

  getHealthExpenses() {
    const groupId = 5;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.health = this.handleNullValue(summary.data);
    });
  }

  getCharityExpenses() {
    const groupId = 6;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.charity = this.handleNullValue(summary.data);
    });
  }

  getDailyLivingExpenses() {
    const groupId = 7;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.dailyLiving = this.handleNullValue(summary.data);
    });
  }

  getDailyEntertainmentExpenses() {
    const groupId = 8;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.entertainment = this.handleNullValue(summary.data);
    });
  }

  getObligationsExpenses() {
    const groupId = 9;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.obligation = this.handleNullValue(summary.data);
    });
  }

  getSubscriptionsExpenses() {
    const groupId = 10;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.subscription = this.handleNullValue(summary.data);
    });
  }

  getMiscellaneousExpenses() {
    const groupId = 11;
    this.apiService.getMonthlySummary(groupId).subscribe((summary: any) => {
      this.misc = this.handleNullValue(summary.data);
    });
  }
}
