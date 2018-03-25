import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgRedux, NgReduxModule} from '@angular-redux/store';


import { AppComponent } from './app.component';
import { TaskComponent } from './presentation/task/task.component';
import { WorkerComponent } from './presentation/worker/worker.component';
import {CanvasConfig} from './presentation/canvasConfig';
import { StateComponent } from './presentation/state/state.component';
import {AppState} from './data/redux/appState';
import {taskReducer} from './data/redux/reducer/taskReducer';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    WorkerComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule
  ],
  providers: [
    {provide: CanvasConfig, useClass: CanvasConfig}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(taskReducer, new AppState());
  }

}
