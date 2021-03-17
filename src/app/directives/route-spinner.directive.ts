import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { RoutePreloaderService } from '../../services/route-preloader.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRouteSpinner]',
})
export class RouterSpinnerDirective implements AfterViewInit, OnDestroy {
  private path?: string;
  private componentRef?: ComponentRef<MatSpinner>;
  private isShow = false;
  private subscription?: Subscription;

  constructor(
    private renderer: Renderer2,
    private container: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private preloader: RoutePreloaderService,
  ) {
    // Empty
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.subscription = this.preloader.load$
      .subscribe(path => {
        if (path && path === this.path) {
          this.show();
        } else {
          this.hide();
        }
      });
  }

  private show(): void {
    if (this.isShow) {
      return;
    }
    if (!this.componentRef) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
      this.componentRef = this.container.createComponent<MatSpinner>(factory);
      this.componentRef.instance.diameter = 20;
    }
    this.isShow = true;
    this.renderer.appendChild(this.container.element.nativeElement, this.componentRef.location.nativeElement);
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'left', 0);
  }

  private hide(): void {
    if (!this.componentRef || !this.isShow) {
      return;
    }
    this.isShow = false;
    this.renderer.removeChild(this.container.element.nativeElement, this.componentRef.location.nativeElement);
  }

  @Input() set routerLink(path: string) {
    this.path = path;
  }
}
