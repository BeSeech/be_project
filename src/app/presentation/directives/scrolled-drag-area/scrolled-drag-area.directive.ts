import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[scrolled-drag-area]'
})

export class ScrolledDragAreaDirective {

  getOffsetLeft(): number {
    return this.host.nativeElement.scrollLeft;
  }

  getOffsetTop(): number {
    return this.host.nativeElement.scrollTop;
  }

  getHostWidth(): number {
    return this.host.nativeElement.clientWidth;
  }

  getHostHeight(): number {
    return this.host.nativeElement.clientHeight;
  }

  deltaLeftEdge(position: number): number {
    const delta = position;
    if ((delta < 50) && (this.getOffsetLeft() > 0)) {
      return delta;
    }
    return -1;
  }

  deltaRightEdge(position: number): number {
    const delta = this.getHostWidth() - position;
    if (delta < 50) {
      return delta;
    }
    return -1;
  }

  deltaTopEdge(position: number): number {
    const delta = position;
    if ((delta < 50) && (this.getOffsetTop() > 0)) {
      return delta;
    }
    return -1;
  }

  deltaBottomEdge(position: number): number {
    const delta = this.getHostHeight() - position;
    if (delta < 50) {
      return delta;
    }
    return -1;
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: any) {
    if (this.deltaBottomEdge($event.clientY) > 0) {
      this.host.nativeElement.scrollTop += (50 - this.deltaBottomEdge($event.clientY)) / 2;
    }
    if (this.deltaTopEdge($event.clientY) > 0) {
      this.host.nativeElement.scrollTop -= (50 - this.deltaTopEdge($event.clientY)) / 2;
    }
    if (this.deltaLeftEdge($event.clientX) > 0) {
      this.host.nativeElement.scrollLeft -= (50 - this.deltaLeftEdge($event.clientX)) / 2;
    }
    if (this.deltaRightEdge($event.clientX) > 0) {
      this.host.nativeElement.scrollLeft += (50 - this.deltaRightEdge($event.clientX)) / 2;
    }
  }

  constructor(private host: ElementRef) {
  }

}
