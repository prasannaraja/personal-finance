import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Expense } from "./models/expenses";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "./models/category";
import { Group } from "./models/Group";
import { summaryTemplate } from "./monthly/monthly.component";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  //api-expense

  getExpense(): Observable<Expense[]> {
    return this.http.get<Expense[]>("/api/expenses");
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

  getCategorySummary(): Observable<summaryTemplate[]> {
    return this.http.get<summaryTemplate[]>("/api/categorySummary");
  }

  //api-group

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>("/api/groups");
  }
}
