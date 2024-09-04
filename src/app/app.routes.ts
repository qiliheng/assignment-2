// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { SuperAdminComponent } from './admin/super-admin/super-admin.component';
import { GroupComponent } from './group/group.component';
import { ChannelComponent } from './channel/channel.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'super-admin', component: SuperAdminComponent },
  { path: 'groups', component: GroupComponent },
 // { path: 'channels', component: ChannelComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
