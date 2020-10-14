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
  private readonly load$ = new BehaviorSubject<undefined | AppRoutingEnum>(undefined);

  public get(): BehaviorSubject<undefined | AppRoutingEnum> {
    return this.load$;
  }

  public change(mode: undefined | AppRoutingEnum): void {
    this.load$.next(mode);
  }

  private isLazyRouteLoad(event: Event): void {
    if (!(event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd)) {
      return;
    }
    const isStart = event instanceof RouteConfigLoadStart;
    if (event.route.data?.lazy === true) {
      const state = isStart ? event.route.path! as AppRoutingEnum : undefined;
      this.change(state);
    }
  }
}
