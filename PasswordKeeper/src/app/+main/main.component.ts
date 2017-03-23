import { PasswordDialogComponent } from './../password-dialog/password-dialog.component';
import { Router } from '@angular/router';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Password } from "../password.model";
import { MdDialog, MdDialogConfig } from "@angular/material";

// interface Password {
//   service: string;
//   username?: string;
//   password: string;
// }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  passwordStream: FirebaseListObservable<Password[]>;
  firebasePath: string;
  private authSubscription: Subscription;

  constructor(private af: AngularFire, private router: Router, private dialog: MdDialog) {

    this.authSubscription = af.auth.subscribe( (auth: FirebaseAuthState) => {
      if (auth) {
        console.log("You are signed in. All is good.");
        this.firebasePath = `/users/${auth.uid}`;
        this.passwordStream = this.af.database.list(this.firebasePath);
      } else {
        console.log("Not signed in. Bounce to signin.");
        this.router.navigate(['/signin']);
      }
    });
  
  }

  ngOnInit(): void {
  }

  showAddPasswordDialog(): void {
    var dialogConfig = new MdDialogConfig();
    dialogConfig.data = { firebasePath: this.firebasePath }
    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
