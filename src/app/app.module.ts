import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TaskComponent } from './presentation/task/task.component';
import { WorkerComponent } from './presentation/worker/worker.component';
import {CanvasConfig} from './presentation/canvasConfig';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    WorkerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: CanvasConfig, useClass: CanvasConfig}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
