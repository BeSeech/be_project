import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TaskStateModel} from '../../data/model/state/taskState';
import {WorkerComponent} from '../worker/worker.component';
import {WorkerContainer} from '../../data/model/worker/workerContainer';
import {ContainerManager} from '../../data/model/helpers/containerManager';
import {WorkerModel} from '../../data/model/worker/worker';
import {AppState} from '../../data/redux/appState';
import {NgRedux} from '@angular-redux/store';
import {CanvasConfig} from '../canvasConfig';
import {ElementPosition} from '../helpers/elementPosition';

@Component({
  selector: 'state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @Input() public state: TaskStateModel;
  @Input() public position: ElementPosition;

  workers: Array<WorkerModel> = [];

  ngOnInit() {
    this.workers = [];
    for (let i = 0; i < this.state.workers.length; i++) {
      let worker = ContainerManager.getElementByUid<WorkerModel>(this.state.workers[i], this.ngRedux.getState().workers);
      this.workers.push(worker);
    }
  }

  constructor(private ngRedux: NgRedux<AppState>, private canvasConfig: CanvasConfig) { }


}
