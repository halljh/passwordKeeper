import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  constructor(private dialogRef: MdDialogRef<PasswordDialogComponent>) { 
    var data = this.dialogRef.config.data;
    console.log("Recieved the data ",data);
  }

  ngOnInit() {
  }

}
