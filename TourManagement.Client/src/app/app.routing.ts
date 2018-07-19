import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about';
import { RedirectSilentRenewComponent } from './redirect-silent-renew/redirect-silent-renew.component';
import { RequireAuthenticatedUserRouteGuardService } from './shared/require-authenticated-user-route-guard.service';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { TourAddComponent, TourDetailComponent, ToursComponent, TourUpdateComponent } from './tours';
import { ShowAddComponent } from './tours/shows';

const routes: Routes = [
    {
        path: '', redirectTo: 'tours', pathMatch: 'full',
        canActivate: [RequireAuthenticatedUserRouteGuardService]
    },
    {
        path: 'tours', component: ToursComponent,
        canActivate: [RequireAuthenticatedUserRouteGuardService]
    },
    { path: 'about', component: AboutComponent },
    {
        path: 'tours/:tourId', component: TourDetailComponent,
        canActivate: [RequireAuthenticatedUserRouteGuardService]
    },
    {
        path: 'tour-update/:tourId', component: TourUpdateComponent,
        canActivate: [RequireAuthenticatedUserRouteGuardService]
    },
    {
        path: 'tour-add', component: TourAddComponent,
        canActivate: [RequireAuthenticatedUserRouteGuardService]
    },
    {
        path: 'tours/:tourId/show-add', component: ShowAddComponent,
        canActivate: [RequireAuthenticatedUserRouteGuardService]
    },
    { path: 'signin-oidc', component: SigninOidcComponent },
    { path: 'redirect-silentrenew', component: RedirectSilentRenewComponent }
];

// define a module
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
