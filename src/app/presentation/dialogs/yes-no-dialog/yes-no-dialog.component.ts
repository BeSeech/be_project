import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {TaskEditFormComponent} from '../task-edit-form/task-edit-form.component';

@Component({
  selector: 'yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})

export class YesNoDialogComponent implements OnInit {

  title: string;
  question: string;

  static showDialog(dialog: MatDialog, title: string, question: string): MatDialogRef<YesNoDialogComponent> {
    const dialogRef = dialog.open<YesNoDialogComponent>(YesNoDialogComponent, {
      width: '50%',
      data: {
        title: title,
        question: question
      }
    });
    return dialogRef;
  }


  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.question = data.question;
  }

  ngOnInit() {
  }

}
