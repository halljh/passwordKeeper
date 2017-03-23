import { Router } from '@angular/router';
import { AngularFire, FirebaseAuthState, FirebaseListObservable } from 'angularfire2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Password } from "../password.model";

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
  private authSubscription: Subscription;

  constructor(private af: AngularFire, private router: Router) {

    this.authSubscription = af.auth.subscribe( (auth: FirebaseAuthState) => {
      if (auth) {
        console.log("You are signed in. All is good.");
        var firebasePath = `/users/${auth.uid}`;
        this.passwordStream = this.af.database.list(firebasePath);
      } else {
        console.log("Not signed in. Bounce to signin.");
        this.router.navigate(['/signin']);
      }
    });
   
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
