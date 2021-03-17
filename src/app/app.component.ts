import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { AppRoutingEnum } from './app-routing-enum';
import { RoutePreloaderService } from '../services/route-preloader.service';
import { Subscription } from 'rxjs';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public title = 'App';
  public routes = AppRoutingEnum;
  public preparedRoute: string | undefined;
  public isHelpPage = false;

  private subscription = new Subscription();

  constructor(private routePreloader: RoutePreloaderService, private router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: Event) => {
      this.isHelpPage = (event as NavigationEnd).url === `/${AppRoutingEnum.HELP}`;
    });
  }


  public ngAfterViewInit(): void {
    const subscription = this.routePreloader.load$.subscribe((value) => {
      this.preparedRoute = value;
    });
    this.subscription.add(subscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
