import { Guid } from 'guid-typescript';
import {TaskStateContainer} from '../model/state/taskStateContainer';
import {WorkerContainer} from '../model/worker/workerContainer';
import {TaskContainer} from '../model/task/taskContainer';
import {TaskStateModel} from '../model/state/taskState';
import {UidArray} from '../model/helpers/uidArray';
import {ContainerManager} from '../model/helpers/containerManager';
import {WorkerModel} from '../model/worker/worker';
import {TaskModel} from '../model/task/task';

export class AppState {
  selectedTaskUid: string;
  states: TaskStateContainer;
  workers: WorkerContainer;
  tasks: TaskContainer;
}

function createWorker(name: string, columnCount: number, rowCount: number): WorkerModel {
  const worker: WorkerModel = new WorkerModel();
  worker.rowCount = rowCount;
  worker.name = name;
  worker.uid = Guid.create().toString();
  worker.tasks = new UidArray();
  return worker;
}

function createTaskState(name: string, color: string): TaskStateModel {
  const taskState: TaskStateModel = new TaskStateModel();
  taskState.uid = Guid.create().toString();
  taskState.color = color;
  taskState.columnCount = 2;
  taskState.name = name;
  taskState.workers = new UidArray();
  return taskState;
}

function createTask(summary: string): TaskModel {
  const task = new TaskModel();
  task.summary = summary;
  task.uid = Guid.create().toString();
  task.expectedDuration = 10;
  task.actualDuration = 1;
  task.id = '1';
  return task;
}

export function getInitialState() {

  const appState: AppState = new AppState();
  appState.selectedTaskUid = '';

  appState.states = new TaskStateContainer();
  appState.workers = new WorkerContainer();
  appState.tasks = new TaskContainer();

  // Tasks
  ContainerManager.AppendElement<TaskModel>(createTask('Task 1'), appState.tasks);
  ContainerManager.AppendElement<TaskModel>(createTask('Task 2'), appState.tasks);
  ContainerManager.AppendElement<TaskModel>(createTask('Task 3'), appState.tasks);
  ContainerManager.AppendElement<TaskModel>(createTask('Task 4'), appState.tasks);
  ContainerManager.AppendElement<TaskModel>(createTask('Task 5'), appState.tasks);
  ContainerManager.AppendElement<TaskModel>(createTask('Task 6'), appState.tasks);

  // Workers
  let worker: WorkerModel;
  worker = createWorker('', 2, 4);
  worker.tasks.push(ContainerManager.getElementByIndex<TaskModel>(0, appState.tasks).uid);
  ContainerManager.AppendElement<WorkerModel>(worker, appState.workers);

  worker = createWorker('Worker Two', 2, 2);
  worker.tasks.push(ContainerManager.getElementByIndex<TaskModel>(1, appState.tasks).uid);
  worker.tasks.push(ContainerManager.getElementByIndex<TaskModel>(2, appState.tasks).uid);
  ContainerManager.AppendElement<WorkerModel>(worker, appState.workers);

  worker = createWorker('', 2, 2);
  worker.tasks.push(ContainerManager.getElementByIndex<TaskModel>(3, appState.tasks).uid);
  worker.tasks.push(ContainerManager.getElementByIndex<TaskModel>(5, appState.tasks).uid);
  ContainerManager.AppendElement<WorkerModel>(worker, appState.workers);

  worker = createWorker('Worker four', 2, 2);
  worker.tasks.push(ContainerManager.getElementByIndex<TaskModel>(4, appState.tasks).uid);
  ContainerManager.AppendElement<WorkerModel>(worker, appState.workers);

  worker = createWorker('Worker Five', 2, 4);
  ContainerManager.AppendElement<WorkerModel>(worker, appState.workers);

  // States
  let taskState: TaskStateModel = createTaskState('State One', 'red');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(0, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);

  taskState = createTaskState('State Two', 'green');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(1, appState.workers).uid);
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(3, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);

  taskState = createTaskState('State Three', 'black');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(2, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);

  taskState = createTaskState('State Four', 'blue');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(4, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);
  return appState;
}
