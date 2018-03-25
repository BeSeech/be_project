import { Component } from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {AppState} from './model/appState';
import {StateActions} from './redux/actions/stateActions';
import {TaskStateModel} from './model/state/taskState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private ngRedux: NgRedux<AppState>) {
    const state: TaskStateModel = new TaskStateModel();
    state.name = 'New State One';
    state.color = 'red';
    state.columnCount = 3;
    this.ngRedux.dispatch(StateActions.addState(state));
  }
}
