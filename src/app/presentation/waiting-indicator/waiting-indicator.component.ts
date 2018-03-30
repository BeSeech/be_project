import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'waiting-indicator',
  templateUrl: './waiting-indicator.component.html',
  styleUrls: ['./waiting-indicator.component.css']
})
export class WaitingIndicatorComponent implements OnInit {

  @Input() visible: boolean;

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  constructor() { }

  ngOnInit() {
    this.hide();
  }

}
