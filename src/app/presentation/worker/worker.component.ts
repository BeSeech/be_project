import {Component, Input, OnInit} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskComponent} from '../task/task.component';
import {TaskModel} from '../../model/task';
import {WorkerModel} from '../../model/worker';

@Component({
  selector: 'worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  @Input() public worker: WorkerModel;

  private _rowCount: number;
  private _columnCount: number;
  public items: Array<{ r: number, c: number }>;

  get rowCount(): number {
    return this._rowCount;
  }

  get columnCount(): number {
    return this._columnCount;
  }

  width(): number {
    return this.canvasConfig.taskGap + this.columnCount * (this.canvasConfig.taskWidth + this.canvasConfig.taskGap);
  }

  height(): number {
    return this.canvasConfig.workerNameHeight + this.canvasConfig.taskGap +
      this.rowCount * (this.canvasConfig.taskHeight + this.canvasConfig.taskGap);
  }

  constructor(private canvasConfig: CanvasConfig) {
  }

  getTask(row: number, column: number): TaskModel {

    if (row === column) {
      return null;
    }

    let task = new TaskModel();
    task.id = 'id';
    task.expectedDuration = 10;
    task.actualDuration = 1;
    task.summary = 'Summary';
    return task;
  }

  ngOnInit() {
    this._rowCount = 2;
    this._columnCount = 3;
    this.items = new Array<{ r: number, c: number }>();

    for (let r = 0; r < this._rowCount; r++) {
      for (let c = 0; c < this._columnCount; c++) {
        this.items.push({r, c});
      }
    }
  }

}
