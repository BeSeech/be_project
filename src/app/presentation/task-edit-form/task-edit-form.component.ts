import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TaskModel} from '../../data/model/task/task';

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
  @ViewChild('taskUid') htmlTaskUid: ElementRef;

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
