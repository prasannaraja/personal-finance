import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DailyComponent } from "./daily/daily.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CurrentComponent } from "./current/current.component";

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "current-expense", component: CurrentComponent },
  { path: "daily-expense", component: DailyComponent },
  { path: "monthly-expense", component: MonthlyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
