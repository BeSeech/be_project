import { Component } from '@angular/core';
import {AppState} from './data/redux/appState';
import {StateActions} from './data/redux/actions/stateActions';
import {TaskStateModel} from './data/model/state/taskState';
import {NgRedux} from '@angular-redux/store';
import {ContainerManager} from './data/model/helpers/containerManager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {
  }
}
