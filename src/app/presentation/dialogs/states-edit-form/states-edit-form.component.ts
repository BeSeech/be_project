import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {TaskStateContainer} from '../../../data/model/state/taskStateContainer';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../data/redux/appState';
import {TaskStateModel} from '../../../data/model/state/taskState';
import {ContainerManager} from '../../../data/model/helpers/containerManager';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../../data/model/task/task';
import {StateInEditFormActions} from '../../../data/redux/actions/editStateFormActions';
import {Api} from '../../../services/restful/api';
import {WaitingIndicatorComponent} from '../../waiting-indicator/waiting-indicator.component';
import {YesNoDialogComponent} from '../yes-no-dialog/yes-no-dialog.component';
import {TaskActions} from '../../../data/redux/actions/taskActions';
import {OnStateMovedEvent} from '../../helpers/onStateMovedEvent';
import {StateEditFormComponent} from '../state-edit-form/state-edit-form.component';

@Component({
  selector: 'states-edit-form',
  templateUrl: './states-edit-form.component.html',
  styleUrls: ['./states-edit-form.component.css']
})
export class StatesEditFormComponent implements OnInit {
  states: TaskStateContainer;

  isWaiting: boolean;


  static showDialog(dialog: MatDialog, states: TaskStateContainer): MatDialogRef<StatesEditFormComponent> {
    const dialogRef = dialog.open<StatesEditFormComponent>(StatesEditFormComponent, {
      width: '700px',
      data: {
        states: Object.assign({}, states),
      }
    });
    return dialogRef;
  }

  isThereSelectedState(): boolean {
    return this.getSelectedState() !== null;
  }

  getSelectedState(): TaskStateModel {
    const index = this.ngRedux.getState().presentation.editFormSelectedStateIndex;
    return ContainerManager.getElementByIndex<TaskStateModel>(index, this.states);
  }

  addState(): void {
    this.isWaiting = true;

    this.api.guid.getGuid().subscribe(uid => {
      this.isWaiting = false;
      const state: TaskStateModel = new TaskStateModel();
      state.color = 'black';
      state.name = 'State ' + (this.states.elementsSequence.length + 1);
      state.uid = <string>uid;
      state.columnCount = 2;

      const dialogRef = StateEditFormComponent.showDialog(
        this.dialog, state, false);

      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        const newState = <TaskStateModel>result;
        ContainerManager.AppendElement<TaskStateModel>(newState, this.states);
      });


    });
  }

  editState() {
    const stateToEdit: TaskStateModel = this.getSelectedState();
    if (!stateToEdit) {
      return;
    }

    const dialogRef = StateEditFormComponent.showDialog(
      this.dialog, stateToEdit, true);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const newState = <TaskStateModel>result;
      const statePosition = ContainerManager.GetElementIndexByUid<TaskStateModel>(stateToEdit.uid, this.states);
      ContainerManager.DeleteElement<TaskStateModel>(stateToEdit, this.states);
      ContainerManager.InsertElement<TaskStateModel>(newState, statePosition, this.states);
    });
  }

  deleteSelectedState() {
    const stateToDelete: TaskStateModel = this.getSelectedState();
    if (!stateToDelete) {
      return;
    }
    const dialogRef = YesNoDialogComponent.showDialog(
      this.dialog, 'Confirmation dialog', `Do you really want to delete the state: "${stateToDelete.name}"?`);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      ContainerManager.DeleteElement<TaskStateModel>(this.getSelectedState(), this.states);
      this.ngRedux.dispatch(StateInEditFormActions.selectTask(-1));
    });
  }

  moveStateItem($event: OnStateMovedEvent) {
    if ($event.oldPosition === $event.newPosition) {
      return;
    }
    const movedState: TaskStateModel = ContainerManager.getElementByUid<TaskStateModel>($event.movedStateUid, this.states);
    ContainerManager.DeleteElement<TaskStateModel>(movedState, this.states);
    const newPosition: number = ($event.newPosition < $event.oldPosition) ? $event.newPosition : $event.newPosition - 1;
    ContainerManager.InsertElement<TaskStateModel>(movedState, newPosition, this.states);
  }

  getState(uid: string): TaskStateModel {
    return ContainerManager.getElementByUid<TaskStateModel>(uid, this.states);
  }

  get windowHeight(): number {
    return window.innerHeight;
  }

  constructor(private api: Api,
              public dialogRef: MatDialogRef<StatesEditFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private ngRedux: NgRedux<AppState>) {
    this.ngRedux.dispatch(StateInEditFormActions.selectTask(-1));
    this.states = data.states;
  }

  ngOnInit() {
    this.isWaiting = false;
  }

}
