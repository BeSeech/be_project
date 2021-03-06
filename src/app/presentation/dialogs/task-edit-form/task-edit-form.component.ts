import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../../data/model/task/task';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/customValidators';
import {YesNoDialogComponent} from '../yes-no-dialog/yes-no-dialog.component';
import {TaskActions} from '../../../data/redux/actions/taskActions';

@Component({
  selector: 'task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.css']
})
export class TaskEditFormComponent implements OnInit {

  task: TaskModel;
  isEditMode: boolean;
  title: string;

  form: FormGroup;
  taskIdControl: AbstractControl;
  taskSummaryControl: AbstractControl;
  taskExpectedDurationControl: AbstractControl;
  taskUidControl: AbstractControl;

  static showDialog(dialog: MatDialog, isEditMode: boolean, task: TaskModel): MatDialogRef<TaskEditFormComponent> {
    const dialogRef = dialog.open<TaskEditFormComponent>(TaskEditFormComponent, {
      width: '50%',
      data: {
        task: task,
        isEditMode: isEditMode
      }
    });
    return dialogRef;
  }

  getFormValidationErrors() {
    Object.keys(this.form.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.form.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  constructor(public dialogRef: MatDialogRef<TaskEditFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              fb: FormBuilder) {
    this.task = data.task;
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit task' : 'New Task';

    this.form = fb.group(
      {
        'id': [this.task.id, [Validators.required, Validators.maxLength(20)]],
        'summary': [this.task.summary, [Validators.required, Validators.maxLength(200)]],
        'expectedDuration': [this.task.expectedDuration, [Validators.required, CustomValidators.between(0, 356)]],
        'uid': [this.task.uid]
      });

    this.taskIdControl = this.form.controls['id'];
    this.taskSummaryControl = this.form.controls['summary'];
    this.taskExpectedDurationControl = this.form.controls['expectedDuration'];
    this.taskUidControl = this.form.controls['uid'];
  }

  ngOnInit() {
  }

  collectNewTaskFromFormAndComponent(): TaskModel {
    const task = Object.assign({}, this.task);
    task.id = this.taskIdControl.value.trim();
    task.summary = this.taskSummaryControl.value.trim();
    task.expectedDuration = this.taskExpectedDurationControl.value;
    return task;
  }

}
