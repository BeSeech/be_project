import { Guid } from 'guid-typescript';
import {TaskStateContainer} from '../model/state/taskStateContainer';
import {WorkerContainer} from '../model/worker/workerContainer';
import {TaskContainer} from '../model/task/taskContainer';
import {TaskStateModel} from '../model/state/taskState';
import {UidArray} from '../model/helpers/uidArray';
import {ContainerManager} from '../model/helpers/containerManager';
import {WorkerModel} from '../model/worker/worker';
import {UidTableManager} from '../model/helpers/uidTableManager';

export class AppState {
  mess: string;
  states: TaskStateContainer;
  workers: WorkerContainer;
  tasks: TaskContainer;
}

function createWorker(name: string, columnCount: number): WorkerModel {
  const worker: WorkerModel = new WorkerModel();
  worker.rowCount = 2;
  worker.name = name;
  worker.uid = Guid.create().toString();
  worker.columnCount = columnCount;
  worker.taskTable = UidTableManager.init(worker.rowCount, worker.columnCount);
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

export function getInitialState() {

  const appState: AppState = new AppState();
  appState.mess = 'Here';

  appState.states = new TaskStateContainer();
  appState.workers = new WorkerContainer();
  appState.tasks = new TaskContainer();

  ContainerManager.AppendElement<WorkerModel>(createWorker('Worker One', 2), appState.workers);
  ContainerManager.AppendElement<WorkerModel>(createWorker('Worker Two', 2), appState.workers);
  ContainerManager.AppendElement<WorkerModel>(createWorker('Worker three', 2), appState.workers);

  let taskState: TaskStateModel = createTaskState('State One', 'red');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(0, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);

  taskState = createTaskState('State Two', 'green');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(1, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);

  taskState = createTaskState('State Three', 'black');
  taskState.workers.push(ContainerManager.getElementByIndex<WorkerModel>(2, appState.workers).uid);
  ContainerManager.AppendElement<TaskStateModel>(taskState, appState.states);
  return appState;
}
