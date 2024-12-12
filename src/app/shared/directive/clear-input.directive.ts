import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClearInput]',
  standalone: true,
})
export class ClearInputDirective {
  private clearButton: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create a clear button
    this.clearButton = this.renderer.createElement('button');
    this.renderer.addClass(this.clearButton, 'clear-btn');
    this.renderer.setStyle(this.clearButton, 'display', 'none');
    this.renderer.setStyle(this.clearButton, 'position', 'absolute');
    this.renderer.setStyle(this.clearButton, 'right', '10px');
    this.renderer.setStyle(this.clearButton, 'top', '70%');
    this.renderer.setStyle(this.clearButton, 'transform', 'translateY(-50%)');
    this.renderer.setStyle(this.clearButton, 'border', 'none');
    this.renderer.setStyle(this.clearButton, 'background', 'transparent');
    this.renderer.setStyle(this.clearButton, 'font-size', '1rem');
    this.renderer.setStyle(this.clearButton, 'cursor', 'pointer');
    this.renderer.setProperty(this.clearButton, 'innerText', '✕');

    // Append the button to the parent
    const parent = this.renderer.parentNode(this.el.nativeElement);
    this.renderer.setStyle(parent, 'position', 'relative');
    this.renderer.appendChild(parent, this.clearButton);

    // Add a click event listener to the button
    this.renderer.listen(this.clearButton, 'click', () => this.clearInput());
  }

  @HostListener('input') onInput(): void {
    // Show the clear button when there's input
    if (this.el.nativeElement.value) {
      this.renderer.setStyle(this.clearButton, 'display', 'block');
    } else {
      this.renderer.setStyle(this.clearButton, 'display', 'none');
    }
  }

  private clearInput(): void {
    // Clear the input field
    this.el.nativeElement.value = '';
    this.el.nativeElement.dispatchEvent(new Event('input')); // Trigger Angular's change detection
    this.renderer.setStyle(this.clearButton, 'display', 'none');
  }
}
