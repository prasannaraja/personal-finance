import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Expense } from "./models/expenses";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "./models/category";

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  getExpense(): Observable<Expense[]> {
    return this.http.get<Expense[]>("/api/expenses");
  }

  addExpense(expense: Expense): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(expense);
    return this.http.post("/api/expense/", body, { headers: headers });
  }

  deleteExpense(expenseId: number) {
    return this.http.delete("/api/delete/" + expenseId);
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>("/api/categories");
  }

  addCategory(category: Category): Observable<any> {
    const headers = { "content-type": "application/json" };
    const body = JSON.stringify(category);
    return this.http.post("/api/category/", body, { headers: headers });
  }

  deleteCategory(expenseId: number) {
    return this.http.delete("/api/delete-category/" + expenseId);
  }
}
