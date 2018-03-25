import {Component, Input, OnInit} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskModel} from '../../data/model/task/task';
import {WorkerModel} from '../../data/model/worker/worker';

@Component({
  selector: 'worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  @Input() public worker: WorkerModel;
  @Input() public color: string;

  public items: Array<{ r: number, c: number }>;

  width(): number {
    return this.canvasConfig.getWorkerWidthByColumnCount(this.worker.columnCount);
  }

  height(): number {
    return this.canvasConfig.getWorkerHeightByRowCount(this.worker.rowCount);
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
    this.items = new Array<{ r: number, c: number }>();

    for (let r = 0; r < this.worker.rowCount; r++) {
      for (let c = 0; c < this.worker.columnCount; c++) {
        this.items.push({r, c});
      }
    }
  }

}
