import { Directive, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { errorList } from './error-list';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

@Directive({
  selector: '[appControlError]',
})
export class ControlErrorDirective implements OnInit, OnDestroy {
  public control!: AbstractControl;
  private subscription = new Subscription();
  private element: HTMLElement | undefined;

  constructor(
    private templateRef: TemplateRef<any>,
    private renderer: Renderer2,
    private viewContainer: ViewContainerRef
  ) {
  }

  public ngOnInit(): void {
    if (!this.control) {
      return;
    }

    let errorName: string | undefined;
    const errorsApply = () => {
      const error = this.control.errors && Object.keys(this.control.errors)[0] || undefined;
      if (error && error !== errorName) {
        errorName = error;
        this.changeErrorText(error);
      } else if (!error && errorName) {
        errorName = undefined;
        this.clearView();
      }
    };

    const merged = merge(
      this.control.valueChanges.pipe(startWith(this.control.value as string | number)),
      this.control.statusChanges.pipe(distinctUntilChanged()),
    ).subscribe(errorsApply);
    this.subscription.add(merged);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private changeErrorText(error: string): void {
    const text = errorList[error] || errorList.default;

    if (!this.element) {
      this.element = this.viewContainer.createEmbeddedView(this.templateRef).rootNodes[0];
    }

    if (this.element) {
      this.renderer.setProperty(this.element, 'textContent', text);
    }
  }

  private clearView(): void {
    this.viewContainer.clear();
    this.element = undefined;
  }

  @Input() set appControlError(control: AbstractControl) {
    this.control = control;
  }
}
