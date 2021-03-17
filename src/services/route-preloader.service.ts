import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AppRoutingEnum } from '../app/app-routing-enum';

@Injectable({
  providedIn: 'root'
})
export class RoutePreloaderService {
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => this.isLazyRouteLoad(event));
  }
  public readonly load$ = new BehaviorSubject<undefined | AppRoutingEnum>(undefined);

  private isLazyRouteLoad(event: Event): void {
    if (!(event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd)) {
      return;
    }
    const isStart = event instanceof RouteConfigLoadStart;
    if (event.route.data?.lazy === true) {
      const state = isStart ? event.route.path! as AppRoutingEnum : undefined;
      this.load$.next(state);
    }
  }
}
