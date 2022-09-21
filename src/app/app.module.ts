import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { CryptoListComponent } from './components/crypto/crypto-list/crypto-list.component';
import { CryptoComponent } from './components/crypto/crypto/crypto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EffectsModule } from '@ngrx/effects';
import {appEffects, appReducers} from "../store/app.state";
import {LoginComponent} from "./components/authentification/login/login.component";
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/authentification/register/register.component';
import { OrderComponent } from './components/wallet/order/order.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { HistoryComponent } from './components/wallet/history/history.component';
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import { AuthorizationInterceptor } from './interceptors/authorizationInterceptor';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { RankingComponent } from './components/ranking/ranking.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatNavComponent } from './components/chat/chat-nav/chat-nav.component';
import { MessagingComponent } from './components/chat/messaging/messaging.component';
 import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { NotificationMenuComponent } from './components/notifications/notification-menu/notification-menu.component';
import { NotificationListComponent } from './components/notifications/notification-list/notification-list.component';
import { NotificationPreferencesComponent } from './components/notifications/notification-preferences/notification-preferences.component';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import { NotificationsComponent } from './components/notifications/notifications/notifications.component';
import { CoinGraphComponent } from './components/crypto/crypto/coin-graph/coin-graph.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CryptoListComponent,
    CryptoComponent,
    NavBarComponent,
    PageNotFoundComponent,
    ContactComponent,
    RegisterComponent,
    OrderComponent,
    WalletComponent,
    HistoryComponent,
    RankingComponent,
    ChatComponent,
    ChatNavComponent,
    MessagingComponent,
    NavBarComponent,
    NotificationMenuComponent,
    NotificationListComponent,
    NotificationPreferencesComponent,
    NotificationsComponent,
    CoinGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    BrowserAnimationsModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSortModule,
    FontAwesomeModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
