import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appIsAuth]',
})
export class IsAuthDirective implements OnInit, OnDestroy {
  public condition = true;
  public subscription!: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef,
  ) {
    // Empty
  }

  public ngOnInit(): void {
    this.subscription = this.authService.watch().subscribe((owner) => {
        if (owner && this.condition || !owner && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      },
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @Input() set appIsAuth(condition: boolean) {
    this.condition = condition;
  }
}
