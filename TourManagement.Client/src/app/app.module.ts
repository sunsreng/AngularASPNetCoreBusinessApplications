import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AboutComponent } from './about';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { RedirectSilentRenewComponent } from './redirect-silent-renew/redirect-silent-renew.component';
import { AddAuthorizationHeaderInterceptor } from './shared/add-authorization-header-interceptor';
import { EnsureAcceptHeaderInterceptor } from './shared/ensure-accept-header-interceptor';
import { ErrorLoggerService } from './shared/error-logger.service';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { HandleHttpErrorInterceptor } from './shared/handle-http-error-interceptor';
import { MasterDataService } from './shared/master-data.service';
import { OpenIdConnectService } from './shared/open-id-connect.service';
import { RequireAuthenticatedUserRouteGuardService } from './shared/require-authenticated-user-route-guard.service';
import { WriteOutJsonInterceptor } from './shared/write-out-json-interceptor';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { TourAddComponent, TourDetailComponent, ToursComponent, TourUpdateComponent } from './tours';
import { TourService } from './tours/shared/tour.service';
import { ShowAddComponent, ShowsComponent } from './tours/shows';
import { ShowService } from './tours/shows/shared/show.service';
import { ShowSingleComponent } from './tours/shows/show-single/show-single.component';

// import routing module
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ShowsComponent,
    TourDetailComponent,
    TourAddComponent,
    ToursComponent,
    TourUpdateComponent,
    ShowAddComponent,
    ShowSingleComponent,
    SigninOidcComponent,
    RedirectSilentRenewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthorizationHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WriteOutJsonInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true,
    },
    GlobalErrorHandler, ErrorLoggerService, TourService,
    MasterDataService, ShowService, DatePipe, OpenIdConnectService,
    RequireAuthenticatedUserRouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {

    // automapper mappings

    automapper.createMap('TourFormModel', 'TourForCreation')
      .forSourceMember('band', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forSourceMember('manager', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forMember('bandid', function (opts) { opts.mapFrom('band'); });

    automapper.createMap('TourFormModel', 'TourWithManagerForCreation')
      .forSourceMember('band', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forSourceMember('manager', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forMember('bandid', function (opts) { opts.mapFrom('band'); })
      .forMember('managerid', function (opts) { opts.mapFrom('manager'); });

    automapper.createMap('TourFormModel', 'TourWithShowsForCreation')
      .forSourceMember('band', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forSourceMember('manager', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forMember('bandid', function (opts) { opts.mapFrom('band'); });

    automapper.createMap('TourFormModel', 'TourWithManagerAndShowsForCreation')
      .forSourceMember('band', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forSourceMember('manager', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
      .forMember('bandid', function (opts) { opts.mapFrom('band'); })
      .forMember('managerid', function (opts) { opts.mapFrom('manager'); });

    automapper.createMap('ShowCollectionFormModelShowsArray',
      'ShowCollectionForCreation');

    automapper.createMap('TourFormModel', 'TourForUpdate');
  }
}
