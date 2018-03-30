import {Component, ElementRef, Host, Input, OnInit, ViewChild} from '@angular/core';
import {CanvasConfig} from '../canvasConfig';
import {TaskModel} from '../../data/model/task/task';
import {AppState} from '../../data/redux/appState';
import {NgRedux} from '@angular-redux/store';
import {MoveTaskAction, TaskActions} from '../../data/redux/actions/taskActions';
import {MatDialog} from '@angular/material';
import {TaskEditFormComponent} from '../dialogs/task-edit-form/task-edit-form.component';
import {TasksCrudApi} from '../../services/restful/tasksCrudApi';
import {WorkerComponent} from '../worker/worker.component';
import {ContainerManager} from '../../data/model/helpers/containerManager';
import {BeforeMenuEvent, IShContextMenuItem, IShContextOptions} from 'ng2-right-click-menu';
import {TaskContextMenu} from '../dialogs/taskContextMenu';
import {YesNoDialogComponent} from '../dialogs/yes-no-dialog/yes-no-dialog.component';
import {DropEvent} from 'ng-drag-drop';
import {TaskDragInfo} from '../helpers/taskDragInfo';
import {Api} from '../../services/restful/api';

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
  @Input() public taskIndex: number;
  @ViewChild('Task') public htmlTask: ElementRef;

  public contextMenu: TaskContextMenu = new TaskContextMenu();

  public getDragInfo(): TaskDragInfo {
    return new TaskDragInfo(this.task.uid, this.hostUid);
  }

  public draggedOver(): boolean {
    return (this.htmlTask && this.htmlTask.nativeElement.classList.contains('drag-target'));
  }


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
              private api: Api,
              @Host() private host: WorkerComponent) {
    this.setPosition(-1, -1);
  }

  ngOnInit() {
  }

  getDurationCaption(): string {
    let s = this.task.expectedDuration ? this.task.expectedDuration.toString() : '?';
    s = this.task.actualDuration ? `${this.task.actualDuration.toString()} / ${s}` : s;
    return s;
  }

  getTop(): number {
    return +this.canvasConfig.taskGap + this.row * (this.canvasConfig.taskHeight + this.canvasConfig.taskGap);
  }

  getLeft(): number {
    return this.getOffset() + this.canvasConfig.taskGap + this.column * (this.canvasConfig.taskWidth + this.canvasConfig.taskGap);
  }

  getOffset(): number {
    return this.draggedOver() ? 0 : 0;
  }

  createDefaultTask(): TaskModel {
    const task = new TaskModel();
    task.summary = '';
    task.id = '';
    task.actualDuration = 0;
    return task;
  }

  showMenu($event) {
    const x = $event.x;
    const y = $event.y;
  }

  deleteTask() {
    const dialogRef = YesNoDialogComponent.showDialog(
      this.dialog, 'Confirmation dialog', `Do you really want to delete the task: "${this.task.id}"?`);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.api.tasks.crud.deleteTask(this.task).subscribe(t => {
        this.ngRedux.dispatch(TaskActions.deleteTask(this.getHostUid(), t));
        this.host.reload();
      });
    });
  }

  editTask(isEditMode: boolean) {
    const dialogRef = TaskEditFormComponent.showDialog(
      this.dialog, isEditMode, isEditMode ? Object.assign({}, this.task) : this.createDefaultTask());

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (isEditMode) {
        this.api.tasks.crud.putTask(result).subscribe(t => {
          this.ngRedux.dispatch(TaskActions.updateTask(t));
          this.reload();
        });
      } else {
        this.api.tasks.crud.postTask(this.getHostUid(), result).subscribe(t => {
          this.ngRedux.dispatch(TaskActions.addTask(this.getHostUid(), t));
          this.host.reload();
        });
      }
    });
  }

  onItemDrop($event: DropEvent) {
    const dragData: TaskDragInfo = <TaskDragInfo>($event.dragData);
    this.api.tasks.position.postPosition(dragData.taskUid, this.hostUid, this.taskIndex);
  }
}
