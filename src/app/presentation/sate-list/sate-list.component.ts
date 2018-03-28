import {Component, OnInit} from '@angular/core';
import {TaskStateModel} from '../../data/model/state/taskState';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../data/redux/appState';
import {ContainerManager} from '../../data/model/helpers/containerManager';
import {CanvasConfig} from '../canvasConfig';
import {ElementPosition} from '../helpers/elementPosition';
import {WorkerModel} from '../../data/model/worker/worker';

@Component({
  selector: 'sate-list',
  templateUrl: './sate-list.component.html',
  styleUrls: ['./sate-list.component.css']
})
export class SateListComponent implements OnInit {

  states: Array<TaskStateModel>;
  private elementsPosition: Array<ElementPosition>;
  height: number;
  width: number;
  get windowHeight(): number {
    return window.innerHeight;
  }

  constructor(private ngRedux: NgRedux<AppState>, private canvasConfig: CanvasConfig) {
  }

  private calcStateHeight(state: TaskStateModel): number {
    let height = this.canvasConfig.stateNameHeight;
    for (let i = 0; i < state.workers.length; i++) {
      let worker = ContainerManager.getElementByUid<WorkerModel>(state.workers[i], this.ngRedux.getState().workers);
      height += this.canvasConfig.getWorkerHeightByRowCount(worker.rowCount);
    }
    return height;
  }

  private calcAndSetStatesPositions() {
    this.elementsPosition = [];
    let lastLeftPos = 0;
    let maxHeight = 0;
    for (let i = 0; i < this.states.length; i++) {
      let currentStateWidth = this.canvasConfig.getWorkerWidthByColumnCount(this.states[i].columnCount);
      let currenHeight = this.calcStateHeight(this.states[i]);
      if (maxHeight < currenHeight) {
        maxHeight = currenHeight;
      }
      this.elementsPosition.push(new ElementPosition(0, lastLeftPos, currentStateWidth, this.calcStateHeight(this.states[i])));
      lastLeftPos += this.canvasConfig.statesGap + currentStateWidth;
    }

    for (let i = 0; i < this.elementsPosition.length; i++) {
      this.elementsPosition[i].height = maxHeight;
    }
    this.width = lastLeftPos;
    this.height = maxHeight;
  }

  ngOnInit() {
    this.states = ContainerManager.getElementsAsArray<TaskStateModel>(this.ngRedux.getState().states);
    this.calcAndSetStatesPositions();
  }

  getStateLeftPositionByIndex(ind: number): ElementPosition {
    return this.elementsPosition[ind];
  }

}
