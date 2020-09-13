import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { DailyComponent } from "./daily/daily.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material-module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValidationService } from "./validation.service";
import { HttpClientModule } from "@angular/common/http";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CurrentComponent } from "./current/current.component";
import { ConfirmDialogComponent } from "./Components/Shared/confirm-dialog/confirm-dialog.component";
import { GroupComponent } from "./group/group.component";
import { CategoryComponent } from "./category/category.component";
import { AddCatergoryComponent } from "./add-catergory/add-catergory.component";
import { MenubarModule } from "primeng/menubar";

@NgModule({
  declarations: [
    AppComponent,
    MonthlyComponent,
    DailyComponent,
    DashboardComponent,
    CurrentComponent,
    ConfirmDialogComponent,
    GroupComponent,
    CategoryComponent,
    AddCatergoryComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MenubarModule,
  ],
  providers: [
    ValidationService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
