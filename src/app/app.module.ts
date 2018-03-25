import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgRedux, NgReduxModule} from '@angular-redux/store';

import { AppComponent } from './app.component';
import { TaskComponent } from './presentation/task/task.component';
import { WorkerComponent } from './presentation/worker/worker.component';
import {CanvasConfig} from './presentation/canvasConfig';
import { StateComponent } from './presentation/state/state.component';
import {AppState, getInitialState} from './data/redux/appState';
import {taskReducer} from './data/redux/reducer/taskReducer';
import { SateListComponent } from './presentation/sate-list/sate-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    WorkerComponent,
    StateComponent,
    SateListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgReduxModule,
    MatTooltipModule
  ],
  providers: [
    {provide: CanvasConfig, useClass: CanvasConfig}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(taskReducer, getInitialState());
  }

}
