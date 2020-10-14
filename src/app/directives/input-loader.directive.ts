import {
  ComponentFactoryResolver, ComponentRef,
  Directive,
  Input, OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';

@Directive({ selector: '[appInputLoader]' })
export class InputLoaderDirective implements OnInit {

  private componentRef?: ComponentRef<MatSpinner>;
  private loading?: boolean;

  constructor(
    private renderer: Renderer2,
    private container: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    // Empty
  }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    if (this.componentRef) {
      return;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(MatSpinner);
    this.componentRef = this.container.createComponent<MatSpinner>(factory);
    this.componentRef.instance.diameter = 20;
    const parent = this.container.element.nativeElement.parentElement;
    this.renderer.insertBefore(parent, this.componentRef.location.nativeElement, this.container.element.nativeElement);
    const setStyle = this.renderer.setStyle.bind(this.renderer, this.componentRef.location.nativeElement);
    const styleRules: [string, string | number][] = [['position', 'absolute'], ['right', 0], ['bottom', '7px']];
    styleRules.forEach(([style, value]) => setStyle(style, value));

    const state = this.loading ? 'visible' : 'hidden';
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'visibility', state);
  }

  set isLoad(flag: boolean) {
    if (flag === this.loading || !this.componentRef) {
      return;
    }
    this.loading = flag;
    const value = this.loading ? 'visible' : 'hidden';
    this.renderer.setStyle(this.componentRef.location.nativeElement, 'visibility', value);
  }

  @Input() set appInputLoader(flag: boolean) {
    this.isLoad = flag;
  }
}
