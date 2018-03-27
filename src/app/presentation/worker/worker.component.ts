import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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

  maxTasksCount(): number {
    return this.worker.rowCount * this.columnCount;
  }

  tasksCount(): number {
    return this.worker.tasks.length;
  }

  canAcceptTask(): boolean {
    return this.tasksCount() < this.maxTasksCount();
  }

  constructor(private canvasConfig: CanvasConfig,
              private ngRedux: NgRedux<AppState>,
              private changeDetector: ChangeDetectorRef) {
  }

  public reload() {
    this.worker = ContainerManager.getElementByUid<WorkerModel>(this.worker.uid, this.ngRedux.getState().workers);
  }

  private getIndexByRowColumn(row: number, column: number): number {
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

  createTask() {
    alert('AAAA');
  }
}
