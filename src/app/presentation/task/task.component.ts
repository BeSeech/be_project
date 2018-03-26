import {Component, ElementRef, Host, Input, OnInit} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskModel} from '../../data/model/task/task';
import {AppState} from '../../data/redux/appState';
import {NgRedux} from '@angular-redux/store';
import {TaskActions} from '../../data/redux/actions/taskActions';
import {MatDialog} from '@angular/material';
import {TaskEditFormComponent} from '../dialogs/task-edit-form/task-edit-form.component';
import {TaskCrudApi} from '../../services/restful/taskCrudApi';
import {MatDialogRef} from '@angular/material/dialog/typings/dialog-ref';
import {WorkerComponent} from '../worker/worker.component';
import {ContainerManager} from '../../data/model/helpers/containerManager';
import {BeforeMenuEvent, IShContextMenuItem, IShContextOptions} from 'ng2-right-click-menu';
import {TaskContextMenu} from '../dialogs/taskContextMenu';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() public task: TaskModel;
  @Input() public row: number;
  @Input() public column: number;
  @Input() public hostUid: string;
  public contextMenu: TaskContextMenu = new TaskContextMenu();

  public onBefore = (event: BeforeMenuEvent) => {
    if (!this.isSelected()) {
      this.select();
    }
    event.open();
  }
  public isSelected(): boolean {
    return (this.task.uid === this.ngRedux.getState().selectedTaskUid);
  }

  public select(): void {
    this.ngRedux.dispatch(TaskActions.selectTask(this.task.uid));
  }

  public setPosition(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  public reload() {
    this.task = ContainerManager.getElementByUid<TaskModel>(this.task.uid, this.ngRedux.getState().tasks);
  }

  hasTask(): boolean {
    if ((this.task !== null) && (this.task !== undefined)) {
      return true;
    }
    return false;
  }

  width(): number {
    return this.canvasConfig.taskWidth;
  }

  height(): number {
    return this.canvasConfig.taskHeight;
  }

  private getHostUid(): string {
    return this.host.worker.uid;
  }

  constructor(private canvasConfig: CanvasConfig,
              private ngRedux: NgRedux<AppState>,
              public dialog: MatDialog,
              private taskCrudApi: TaskCrudApi,
              @Host() private host: WorkerComponent) {
    this.setPosition(-1, -1);
  }

  ngOnInit() {
  }

  getTop(): number {
    return +this.canvasConfig.taskGap + this.row * (this.canvasConfig.taskHeight + this.canvasConfig.taskGap);
  }

  getLeft(): number {
    return +this.canvasConfig.taskGap + this.column * (this.canvasConfig.taskWidth + +this.canvasConfig.taskGap);
  }

  createDefaultTask(): TaskModel {
    const task = new TaskModel();
    task.summary = '';
    task.id = '';
    task.actualDuration = 0;
    return task;
  }


  showEditTaskDialog(isEditMode: boolean): MatDialogRef<TaskEditFormComponent> {
    const dialogRef = this.dialog.open<TaskEditFormComponent>(TaskEditFormComponent, {
      width: '50%',
      data: {
        task: isEditMode ? Object.assign({}, this.task) : this.createDefaultTask(),
        isEditMode: isEditMode
      }
    });
    return dialogRef;
  }

  showMenu($event) {
    const x = $event.x;
    const y = $event.y;
  }

  editTask(isEditMode: boolean) {
    const dialogRef = this.showEditTaskDialog(isEditMode);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (isEditMode) {
        this.taskCrudApi.putTask(result).subscribe(t => {
          this.ngRedux.dispatch(TaskActions.updateTask(t));
          this.reload();
        });
      } else {
        this.taskCrudApi.postTask(this.getHostUid(), result).subscribe(t => {
          this.ngRedux.dispatch(TaskActions.addTask(this.getHostUid(), t));
          this.host.reload();
        });
      }
    });
  }
}
