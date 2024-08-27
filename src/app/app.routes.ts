import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'account',component:AccountComponent},
    {path:'profile',component:ProfileComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
