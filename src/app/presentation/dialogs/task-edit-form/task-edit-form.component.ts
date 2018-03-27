import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../../data/model/task/task';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

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

  constructor(public dialogRef: MatDialogRef<TaskEditFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              fb: FormBuilder) {
    this.task = data.task;
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit task' : 'New Task';

    this.form = fb.group(
      {
        'id': [this.task.id],
        'summary': [this.task.summary],
        'expectedDuration': [this.task.expectedDuration],
        'uid': [this.task.uid]
      });

    this.taskIdControl = this.form.controls['id'];
    this.taskSummaryControl = this.form.controls['summary'];
    this.taskExpectedDurationControl = this.form.controls['expectedDuration'];
    this.taskUidControl = this.form.controls['uid'];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.collectNewTaskFromFormAndComponent());
  }

  ngOnInit() {
  }

  collectNewTaskFromFormAndComponent(): TaskModel {
    const task = Object.assign({}, this.task);
    task.id = this.taskIdControl.value;
    task.summary = this.taskSummaryControl.value;
    task.expectedDuration = this.taskExpectedDurationControl.value;
    return task;
  }

}
