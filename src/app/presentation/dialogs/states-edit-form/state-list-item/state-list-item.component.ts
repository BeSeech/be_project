import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskStateModel} from '../../../../data/model/state/taskState';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../../data/redux/appState';
import {StateInEditFormActions} from '../../../../data/redux/actions/editStateFormActions';
import {TaskDragInfo} from '../../../helpers/taskDragInfo';
import {DropEvent} from 'ng-drag-drop';
import {GeneralDragInfo} from '../../../helpers/generalDragInfo';
import {ContainerManager} from '../../../../data/model/helpers/containerManager';
import {OnStateMovedEvent} from '../../../helpers/onStateMovedEvent';

@Component({
  selector: 'state-list-item',
  templateUrl: './state-list-item.component.html',
  styleUrls: ['./state-list-item.component.css']
})
export class StateListItemComponent implements OnInit {
  @Input() state: TaskStateModel;
  @Input() index: number;
  @Output() stateMoved: EventEmitter<OnStateMovedEvent>;
  @Output() dragStateChange: EventEmitter<boolean>;

  select() {
    this.ngRedux.dispatch(StateInEditFormActions.selectTask(this.index));
  }

  public getDragInfo(): GeneralDragInfo {
    return new GeneralDragInfo(this.state.uid, this.index);
  }

  onItemDrop($event: DropEvent) {
    const dragData: GeneralDragInfo = <GeneralDragInfo>($event.dragData);
    this.stateMoved.emit(new OnStateMovedEvent(dragData.draggedItemUid, dragData.fromIndex, this.index));
  }


  isSelected(): Boolean {
    return this.index === this.ngRedux.getState().presentation.editFormSelectedStateIndex;
  }

  constructor(private ngRedux: NgRedux<AppState>) {
    this.stateMoved = new EventEmitter<OnStateMovedEvent>();
    this.dragStateChange = new EventEmitter<boolean>();
  }

  ngOnInit() {
  }

  onDragEnd() {
    this.dragStateChange.emit(false);
  }

  onDragStart() {
    this.select();
    this.dragStateChange.emit(true);
  }


}
