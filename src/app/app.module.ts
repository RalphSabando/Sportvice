import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormatFileSizePipe } from './format-file-size.pipe';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// const firebaseConfig = {

//   apiKey: "AIzaSyCMKEv6-5X_EkGgx9Ug6ikYH9wKc7AGsaA",

//   authDomain: "dotvice-262bb.firebaseapp.com",

//   projectId: "dotvice-262bb",

//   storageBucket: "dotvice-262bb.appspot.com",

//   messagingSenderId: "1023696691008",

//   appId: "1:1023696691008:web:a9a4762cf94ed33a5ea4a5",

//   measurementId: "G-0K5ZHZ9ETH"

// };

const firebaseConfig = {
  apiKey: "AIzaSyBwviMHvQGCBDWHZ2nHRSKWyhEBfD1S09U",
  authDomain: "angular-tailwind-template.firebaseapp.com",
  databaseURL: "https://angular-tailwind-template.firebaseio.com",
  projectId: "angular-tailwind-template",
  storageBucket: "angular-tailwind-template.appspot.com",
  messagingSenderId: "158853503193",
  appId: "1:158853503193:web:670b2306f595fd29cf86c8",
  measurementId: "G-MNFWWH34Q0"
};

@NgModule({
  declarations: [
    AppComponent, 
    FormatFileSizePipe  
  ],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,  
    AngularFireStorageModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
