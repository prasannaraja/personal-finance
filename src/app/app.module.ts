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

@NgModule({
  declarations: [AppComponent, MonthlyComponent, DailyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
