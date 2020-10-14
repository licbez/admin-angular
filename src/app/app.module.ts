import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../services/api/interceptors/token.interceptor';
import { AppToolbarModule } from './components/toolbar/toolbar.module';
import { MatTabsModule } from '@angular/material/tabs';
import { HomeComponent } from './components/home/home.component';
import { IsAuthDirective } from './directives/is-auth.directive';
import { AuthGuard } from '../services/auth/auth.guard';
import { RouterSpinnerDirective } from './directives/route-spinner.directive';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { UserProfileModule } from './components/user-profile/user-profile.module';
import { CustomBreakPointsProvider } from './flex-breakpoints/flex-breakpoints';

@NgModule({
  declarations: [
    AppComponent,
    AppToolbarComponent,
    HomeComponent,
    IsAuthDirective,
    RouterSpinnerDirective,
    HelpPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppToolbarModule,
    MatTabsModule,
    UserProfileModule,
  ],
  providers: [
    AuthGuard,
    CustomBreakPointsProvider,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer
      .getContainerElement()
      .classList.add('material-theme-grey');
  }
}
