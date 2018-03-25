import {Component, Input, OnInit} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskModel} from '../../data/model/task/task';
import {WorkerModel} from '../../data/model/worker/worker';
import {ContainerManager} from '../../data/model/helpers/containerManager';
import {AppState} from '../../data/redux/appState';
import {NgRedux} from '@angular-redux/store';

@Component({
  selector: 'worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  @Input() public worker: WorkerModel;
  @Input() public color: string;
  @Input() public columnCount: number;

  public items: Array<{ r: number, c: number }>;

  width(): number {
    return this.canvasConfig.getWorkerWidthByColumnCount(this.columnCount);
  }

  height(): number {
    return this.canvasConfig.getWorkerHeightByRowCount(this.worker.rowCount);
  }

  constructor(private canvasConfig: CanvasConfig, private ngRedux: NgRedux<AppState>) {
  }

  private getIndexByRowColumn(row: number, column: number): number {

    // 0 1 2 | 3 4 5 | 6 7 8
    return row * this.columnCount + column;
  }

  private getTaskUidByIndex(ind: number): string {
    if ((ind < 0) || (ind > this.worker.tasks.length)) {
      return null;
    }
    return this.worker.tasks[ind];
  }

  getTask(row: number, column: number): TaskModel {
    const taskUid = this.getTaskUidByIndex(this.getIndexByRowColumn(row, column));
    if (!taskUid) {
      return null;
    }
    const task = ContainerManager.getElementByUid(taskUid, this.ngRedux.getState().tasks);
    return task;
  }

  ngOnInit() {
    this.items = new Array<{ r: number, c: number }>();

    for (let r = 0; r < this.worker.rowCount; r++) {
      for (let c = 0; c < this.columnCount; c++) {
        this.items.push({r, c});
      }
    }
  }

}
