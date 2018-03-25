import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TaskStateModel} from '../../model/state/taskState';
import {WorkerComponent} from '../worker/worker.component';

@Component({
  selector: 'state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @Input() public state: TaskStateModel;

  @ViewChildren(WorkerComponent) workers: QueryList<WorkerComponent>;

  ngAfterViewInit() {
    let w: number = 0;
    this.workers.changes.subscribe(wrk =>  console.log(`Worker: ${wrk}`));
    console.log(`w = ${w}`);
  }

  width(): number {
    return 10;
  }

  height(): number {
    return 10;
  }

  constructor() { }

  ngOnInit() {
  }

}
