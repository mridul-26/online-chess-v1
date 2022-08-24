import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector:'app-result-dialog',
  templateUrl: './result-dialog.html',
  styleUrls: ['./result-dialog.scss']
})
export class ResultDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public res : string,
              public dialogRef : MatDialogRef<ResultDialogComponent>) {

              }
}
