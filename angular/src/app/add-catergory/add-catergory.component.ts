import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { ValidationService } from "../validation.service";
import { startWith, map } from "rxjs/operators";
import { MatAccordion } from "@angular/material/expansion";
import { ApiService } from "../api.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { Expense } from "../models/expenses";
import { Group } from "../models/Group";
import { Category } from "../models/category";

@Component({
  selector: "app-add-catergory",
  templateUrl: "./add-catergory.component.html",
  styleUrls: ["./add-catergory.component.css"],
})
export class AddCatergoryComponent implements OnInit {
  formGroup: FormGroup;
  groupAlert: string = "This field is required";
  commentAlert: string = "comment can be max 100 char";
  post: any = "";
  categories: any = "";
  removable: boolean = false;
  expenses: any = "";
  groups: Group;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddCatergoryComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadGroups();
  }

  loadGroups() {
    this.apiService.getGroups().subscribe((groups: any) => {
      this.groups = groups.data;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      category: [null, [Validators.required, Validators.minLength(1)]],
      group: [null, Validators.required],
    });
  }

  getErrorCategory() {
    return this.formGroup.get("category").hasError("required")
      ? "Field is required"
      : "";
  }

  onSubmit(data) {
    debugger;
    let ACTIVE = 1;
    let category = new Category();
    category.name = data.category;
    category.group_id = data.group.id;
    category.group = data.group.name;
    category.enabled = ACTIVE;

    this.apiService.addCategory(category).subscribe(
      (res) => {
        console.log("saved:");
        console.log(res);

        this.dialogRef.close();
      },
      (error) => {
        console.log("error:");
        console.log(error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      }
    );
  }
}
