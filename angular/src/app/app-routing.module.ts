import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DailyComponent } from "./daily/daily.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CurrentComponent } from "./current/current.component";
import { CategoryComponent } from "./category/category.component";
import { GroupComponent } from "./group/group.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/current-expense", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "category", component: CategoryComponent },
  { path: "group", component: GroupComponent },
  { path: "current-expense", component: CurrentComponent },
  { path: "daily-expense", component: DailyComponent },
  { path: "monthly-expense", component: MonthlyComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
