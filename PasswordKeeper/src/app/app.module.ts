import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from 'angularfire2';
import { MainComponent } from './+main/main.component';
import { SigninComponent } from './+signin/signin.component';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SigninComponent,
    PasswordDialogComponent
  ],
  entryComponents: [PasswordDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,    
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
