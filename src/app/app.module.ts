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
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import {TaskEditFormComponent} from './presentation/dialogs/task-edit-form/task-edit-form.component';
import {TasksCrudApi} from './services/restful/tasksCrudApi';
import {ShContextMenuModule} from 'ng2-right-click-menu';
import {YesNoDialogComponent} from './presentation/dialogs/yes-no-dialog/yes-no-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgDragDropModule} from 'ng-drag-drop';
import {ScrolledDragAreaDirective} from './presentation/directives/scrolled-drag-area/scrolled-drag-area.directive';
import {Api} from './services/restful/api';
import {SseViewComponent} from './presentation/sse-view/sse-view.component';
import {StatesEditFormComponent} from './presentation/dialogs/states-edit-form/states-edit-form.component';
import { StateListItemComponent } from './presentation/dialogs/states-edit-form/state-list-item/state-list-item.component';
import {ApiContext} from './services/restful/helpers/ApiContext';
import {ApiCredentials} from './services/restful/helpers/Credentials';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { WaitingIndicatorComponent } from './presentation/waiting-indicator/waiting-indicator.component';
import { StateEditFormComponent } from './presentation/dialogs/state-edit-form/state-edit-form.component';
import { FakeDropItemComponent } from './presentation/helpers/fake-drop-item/fake-drop-item.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    WorkerComponent,
    StateComponent,
    SateListComponent,
    TaskEditFormComponent,
    YesNoDialogComponent,
    ScrolledDragAreaDirective,
    SseViewComponent,
    StatesEditFormComponent,
    StateListItemComponent,
    WaitingIndicatorComponent,
    StateEditFormComponent,
    FakeDropItemComponent
  ],
  entryComponents: [
    StateEditFormComponent,
    TaskEditFormComponent,
    YesNoDialogComponent,
    StatesEditFormComponent,
    StateEditFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgReduxModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ShContextMenuModule,
    FormsModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    {provide: ApiCredentials, useClass: ApiCredentials},
    {provide: ApiContext, useClass: ApiContext},
    {provide: CanvasConfig, useClass: CanvasConfig},
    {
      provide: Api, deps: [HttpClient, ApiContext, ApiCredentials],
      useFactory(http: HttpClient, context: ApiContext, credentials: ApiCredentials) {
        return new Api(http, context, credentials);
      }
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<AppState>) {
    ngRedux.configureStore(taskReducer, getInitialState());
  }

}
