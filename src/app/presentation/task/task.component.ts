import {Component, Input, OnInit} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskModel} from '../../data/model/task/task';
import {AppState} from '../../data/redux/appState';
import {NgRedux} from '@angular-redux/store';
import {TaskActions} from '../../data/redux/actions/taskActions';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() public task: TaskModel;
  @Input() public row: number;
  @Input() public column: number;

  public isSelected(): boolean {
    return (this.task.uid === this.ngRedux.getState().selectedTaskUid);
  }

  public select(): void {
    this.ngRedux.dispatch(TaskActions.selectTask(this.task.uid));
  }

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

  constructor(private canvasConfig: CanvasConfig, private ngRedux: NgRedux<AppState>) {
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

  showMessage(s: string) {
    alert(s);
  }
}
