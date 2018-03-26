import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgRedux, NgReduxModule} from '@angular-redux/store';

import {AppComponent} from './app.component';
import {TaskComponent} from './presentation/task/task.component';
import {WorkerComponent} from './presentation/worker/worker.component';
import {CanvasConfig} from './presentation/canvasConfig';
import {StateComponent} from './presentation/state/state.component';
import {AppState, getInitialState} from './data/redux/appState';
import {taskReducer} from './data/redux/reducer/taskReducer';
import {SateListComponent} from './presentation/sate-list/sate-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatTooltipModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatDividerModule,
  MatButtonModule
} from '@angular/material';
import {TaskEditFormComponent} from './presentation/dialogs/task-edit-form/task-edit-form.component';
import {TaskCrudApi} from './services/restful/taskCrudApi';
import {ShContextMenuModule} from 'ng2-right-click-menu';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    WorkerComponent,
    StateComponent,
    SateListComponent,
    TaskEditFormComponent
  ],
  entryComponents: [
    TaskEditFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgReduxModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
    ShContextMenuModule
  ],
  providers: [
    {provide: CanvasConfig, useClass: CanvasConfig},
    {provide: TaskCrudApi, useClass: TaskCrudApi}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(taskReducer, getInitialState());
  }

}
