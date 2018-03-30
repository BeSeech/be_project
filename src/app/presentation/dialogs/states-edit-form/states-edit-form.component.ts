import {Component, Inject, Input, OnInit} from '@angular/core';
import {TaskStateContainer} from '../../../data/model/state/taskStateContainer';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../data/redux/appState';
import {TaskStateModel} from '../../../data/model/state/taskState';
import {ContainerManager} from '../../../data/model/helpers/containerManager';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../../data/model/task/task';
import {StateInEditFormActions} from '../../../data/redux/actions/editStateFormActions';
import {Api} from '../../../services/restful/api';

@Component({
  selector: 'states-edit-form',
  templateUrl: './states-edit-form.component.html',
  styleUrls: ['./states-edit-form.component.css']
})
export class StatesEditFormComponent implements OnInit {
  states: TaskStateContainer;

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
    this.api.guid.getGuid().subscribe( uid => {
      alert(uid);
    });
  }

  getState(uid: string): TaskStateModel {
    return ContainerManager.getElementByUid<TaskStateModel>(uid, this.states);
  }

  constructor(private api: Api,
              public dialogRef: MatDialogRef<StatesEditFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ngRedux: NgRedux<AppState>) {
    this.ngRedux.dispatch(StateInEditFormActions.selectTask(-1));
    this.states = data.states;
  }

  ngOnInit() {
  }

}
