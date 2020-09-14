import { Component } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "personal-finance";
  items: MenuItem[];

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: "File",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            items: [
              { label: "Expense" },
              { label: "Category" },
              { label: "Group" },
              { label: "Rule" },
            ],
          },
          { label: "Open" },
          { label: "Quit" },
        ],
      },
      {
        label: "Edit",
        items: [
          { label: "Delete", icon: "pi pi-fw pi-trash" },
          { label: "Refresh", icon: "pi pi-fw pi-refresh" },
        ],
      },
      {
        label: "Monthly",
        icon: "pi pi-file-o",
        items: [
          {
            label: "Delete",
            icon: "pi pi-fw pi-trash",
            routerLink: "/monthly-expense",
          },
          {
            label: "Refresh",
            icon: "pi pi-fw pi-refresh",
            routerLink: "/monthly-expense",
          },
        ],
      },
    ];
  }
}
