import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Expense } from "./models/expenses";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "./models/category";
import { Group } from "./models/Group";
import { MonthlySummary } from "./models/monthlySummary";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  //api-expense

  getExpense(month: number): Observable<Expense[]> {
    return this.http.get<Expense[]>("/api/expenses/" + month);
  }

  addExpense(expense: Expense): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(expense);
    return this.http.post("/api/expense/", body, { headers: headers });
  }

  deleteExpense(expenseId: number) {
    return this.http.delete("/api/expense/delete/" + expenseId);
  }

  //api-category

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/categories");
  }

  addCategory(category: Category): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(category);
    return this.http.post("/api/category/", body, { headers: headers });
  }

  deleteCategory(categoryId: number) {
    return this.http.delete("/api/category/delete/" + categoryId);
  }

  //api-group

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("/api/groups");
  }

  getMonthlySummary(groupId: number): Observable<MonthlySummary[]> {
    return this.http.get<MonthlySummary[]>("/api/monthlySummary/" + groupId);
  }

  getSplitTotalExpenses(): Observable<MonthlySummary[]> {
    return this.http.get<MonthlySummary[]>("/api/SplitTotalSummary");
  }

  getTotalExpenses(): Observable<MonthlySummary[]> {
    return this.http.get<MonthlySummary[]>("/api/TotalSummary");
  }

  getCurrentMonthTotal(): Observable<any> {
    return this.http.get<any>("/api/currentMonthTotal");
  }

  getCurrentMonthTags(month: number): Observable<any> {
    return this.http.get<any>("/api/currentMonthTags/" + month);
  }
}
