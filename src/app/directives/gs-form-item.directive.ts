import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[gsFormItem]',
})
export class GSFormItem implements OnInit, OnChanges {

  @Input() errorMessage: string = '';
  @Input() valid!: boolean;
  @Input() touched!: boolean;

  private errorMessageAdded: boolean = false;
  private paragraph: any;
  private text: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.paragraph = this.renderer.createElement('p');
    this.renderer.addClass(this.paragraph, 'errorMessageParagraph');
    this.text = this.renderer.createText(this.errorMessage);
    this.renderer.appendChild(this.paragraph, this.text);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.validateValue();
  }

  private validateValue(): void {
    if (!this.valid && this.touched) {
      this.addErrorMessageParagraph();
      return;
    }

    this.removeErrorMessageParagraph();
  }

  private addErrorMessageParagraph(): void {
    if (this.errorMessageAdded) return;
    this.renderer.appendChild(this.elementRef.nativeElement, this.paragraph)
    this.errorMessageAdded = true;
  }

  private removeErrorMessageParagraph(): void {
    if (!this.errorMessageAdded) return;
    this.renderer.removeChild(this.elementRef.nativeElement, this.paragraph)
    this.errorMessageAdded = false;
  }

}
