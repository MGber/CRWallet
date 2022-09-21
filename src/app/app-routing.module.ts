import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CryptoListComponent} from "./components/crypto/crypto-list/crypto-list.component";
import {CryptoComponent} from "./components/crypto/crypto/crypto.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/authentification/login/login.component";
import {ContactComponent} from "./components/contact/contact.component";
import {RegisterComponent} from "./components/authentification/register/register.component";
import {WalletComponent} from "./components/wallet/wallet.component";
import {RankingComponent} from "./components/ranking/ranking.component";
import {ChatComponent} from "./components/chat/chat.component";
import { UserGuard } from './guards/user.guard';
import { ConnectedUserGuard } from './guards/connectedUser.guard';
import {NotificationMenuComponent} from "./components/notifications/notification-menu/notification-menu.component";

const routes: Routes = [
  {path: '', component: CryptoListComponent},
  {path: 'home', component: CryptoListComponent},
  {path: 'login', component: LoginComponent,canActivate:[ConnectedUserGuard]},
  {path: 'signup', component: RegisterComponent,canActivate:[ConnectedUserGuard]},
  {path: 'crypto/:symbol', component: CryptoComponent,canActivate:[UserGuard]},
  {path: 'wallet', component: WalletComponent,canActivate:[UserGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'ranking', component: RankingComponent,canActivate:[UserGuard]},
  {path: 'chat', component: ChatComponent,canActivate:[UserGuard]},
  {path: 'notification', component: NotificationMenuComponent,canActivate:[UserGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
