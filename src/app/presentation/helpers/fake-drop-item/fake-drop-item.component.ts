import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OnStateMovedEvent} from '../onStateMovedEvent';
import {DropEvent} from 'ng-drag-drop';
import {GeneralDragInfo} from '../generalDragInfo';

@Component({
  selector: 'fake-drop-item',
  templateUrl: './fake-drop-item.component.html',
  styleUrls: ['./fake-drop-item.component.css']
})
export class FakeDropItemComponent implements OnInit {

  @Input() visible: boolean;
  @Output() stateMoved: EventEmitter<OnStateMovedEvent>;

  constructor() {
    this.stateMoved = new EventEmitter<OnStateMovedEvent>();
    this.visible = false;
  }

  onItemDrop($event: DropEvent) {
    const dragData: GeneralDragInfo = <GeneralDragInfo>($event.dragData);
    this.stateMoved.emit(new OnStateMovedEvent(dragData.draggedItemUid, dragData.fromIndex, -1));
  }

  ngOnInit() {
  }

  getVisibility(): string {
    // console.log(`Get visibility: ${this.visible ? 'visible' : 'hidden'}`);
    return this.visible ? 'visible' : 'hidden';
  }
}
