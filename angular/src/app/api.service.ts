import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Expense } from "./expenses";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
}
