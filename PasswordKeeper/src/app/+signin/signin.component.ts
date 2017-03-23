import { AngularFire, AuthMethods, AuthProviders, FirebaseAuthState } from 'angularfire2';
import { Component, OnInit } from '@angular/core';
import 'rosefire';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router) { }

  ngOnInit() {
  }

  signInWithRoseFire() {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      console.log("Rosefire authentication complete. Rosefire user: ", rfUser);
      this.af.auth.login(rfUser.token, {
        method: AuthMethods.CustomToken,
        provider: AuthProviders.Custom,
      }).then( (auth: FirebaseAuthState) => {
        console.log("Firebase auth done too. Firebase uid: ", auth.uid);
        this.router.navigate(['/']);
      } );
    });
  }

}
