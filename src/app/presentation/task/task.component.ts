import {Component, Input, OnInit} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskModel} from '../../data/model/task/task';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() public task: TaskModel;
  @Input() public row: number;
  @Input() public column: number;

  public setPosition(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  hasTask(): boolean {
    if ( (this.task !== null) && (this.task !== undefined) ) {
      return true;
    }
    return false;
  }

  width(): number {
    return this.canvasConfig.taskWidth;
  }

  height(): number {
    return this.canvasConfig.taskHeight;
  }

  constructor(private canvasConfig: CanvasConfig) {
    this.setPosition(-1, -1);
  }

  ngOnInit() {
  }

  getTop(): number {
    return  + this.canvasConfig.taskGap + this.row * (this.canvasConfig.taskHeight + this.canvasConfig.taskGap);
  }

  getLeft(): number {
    return  + this.canvasConfig.taskGap + this.column * (this.canvasConfig.taskWidth +  + this.canvasConfig.taskGap);
  }
}
