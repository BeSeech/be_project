import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../../data/model/task/task';

@Component({
  selector: 'task-edit-form',
  templateUrl: './task-edit-form.component.html',
  styleUrls: ['./task-edit-form.component.css']
})
export class TaskEditFormComponent implements OnInit {

  task: TaskModel;
  isEditMode: boolean;
  title: string;

  @ViewChild('taskId') htmlTaskId: ElementRef;
  @ViewChild('taskSummary') htmlTaskSummary: ElementRef;
  @ViewChild('taskExpectedDuration') htmlTaskExpectedDuration: ElementRef;
  @ViewChild('selfUid') htmlTaskUid: ElementRef;

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
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.task = data.task;
    this.isEditMode = data.isEditMode;
    this.title = this.isEditMode ? 'Edit task' : 'New Task';
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
    task.id = this.htmlTaskId.nativeElement.value;
    task.summary = this.htmlTaskSummary.nativeElement.value;
    task.expectedDuration = this.htmlTaskExpectedDuration.nativeElement.value;
    return task;
  }

}
