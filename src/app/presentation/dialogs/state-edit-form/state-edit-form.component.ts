import {Component, Inject, OnInit} from '@angular/core';
import {TaskStateModel} from '../../../data/model/state/taskState';
import {Api} from '../../../services/restful/api';
import {NgRedux} from '@angular-redux/store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AppState} from '../../../data/redux/appState';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/customValidators';

@Component({
  selector: 'state-edit-form',
  templateUrl: './state-edit-form.component.html',
  styleUrls: ['./state-edit-form.component.css']
})
export class StateEditFormComponent implements OnInit {

  state: TaskStateModel;
  isEditMode: boolean;
  title: string;
  form: FormGroup;
  stateNameControl: AbstractControl;
  stateColumnCountControl: AbstractControl;
  stateColorControl: AbstractControl;
  stateUidControl: AbstractControl;

  static showDialog(dialog: MatDialog, state: TaskStateModel, isEditMode: boolean): MatDialogRef<StateEditFormComponent> {
    const dialogRef = dialog.open<StateEditFormComponent>(StateEditFormComponent, {
      width: '700px',
      data: {
        state: Object.assign({}, state),
        isEditMode: isEditMode
      }
    });
    return dialogRef;
  }

  get windowHeight(): number {
    return window.innerHeight;
  }

  constructor(private api: Api,
              public dialogRef: MatDialogRef<StateEditFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private ngRedux: NgRedux<AppState>,
              fb: FormBuilder) {
    this.state = data.state;
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit state' : 'New state';

    this.form = fb.group(
      {
        'name': [this.state.name, [Validators.required, Validators.maxLength(100)]],
        'columnCount': [this.state.columnCount, [Validators.required, CustomValidators.between(1, 10)]],
        'color': [this.state.color, [Validators.required, Validators.maxLength(100)]],
        'uid': [this.state.uid]
      });

    this.stateNameControl = this.form.controls['name'];
    this.stateColumnCountControl = this.form.controls['columnCount'];
    this.stateColorControl = this.form.controls['color'];
    this.stateUidControl = this.form.controls['uid'];
  }

  ngOnInit() {
  }

  collectNewStateFromFormAndComponent(): TaskStateModel {
    const state = Object.assign({}, this.state);
    state.name = this.stateNameControl.value.trim();
    state.columnCount = this.stateColumnCountControl.value;
    state.color = this.stateColorControl.value.trim();
    return state;
  }

}
