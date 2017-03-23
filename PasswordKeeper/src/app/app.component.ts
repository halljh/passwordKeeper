import { Component, OnDestroy } from '@angular/core';
import { FirebaseListObservable, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  
  showSignOut = true;
  private authSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth) {
    this.authSubscription = this.afAuth.subscribe( (auth: FirebaseAuthState) => {
      if (auth) {
        this.showSignOut = true;
      } else {
        this.showSignOut = false;
      }
    })
  }

  signOut(): void {
    this.afAuth.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

}
