import {Reducer} from './reducer';
import {AppState, getInitialState} from '../appState';
import {Action} from '../actions/action';
import {ADD_STATE, AddStateAction, DELETE_STATE, DeleteStateAction} from '../actions/stateActions';
import {ADD_WORKER, AddWorkerAction} from '../actions/workerActions';
import {ContainerManager} from '../../model/helpers/containerManager';
import {TaskStateModel} from '../../model/state/taskState';
import {WorkerModel} from '../../model/worker/worker';
import {ADD_TASK, AddTaskAction, SELECT_TASK, SelectTaskAction, UPDATE_TASK, UpdateTaskAction} from '../actions/taskActions';
import {TaskModel} from '../../model/task/task';

export const taskReducer: Reducer<AppState> =
  (state: AppState, action: Action): AppState => {
    const newState: AppState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case ADD_STATE:
        const stateValue = (<AddStateAction>action).state;
        ContainerManager.AppendElement<TaskStateModel>(stateValue, newState.states);
        return newState;
      case DELETE_STATE:
        const indexValue = (<DeleteStateAction>action).index;
        const taskState: TaskStateModel = ContainerManager.getElementByIndex<TaskStateModel>(indexValue, newState.states);
        ContainerManager.DeleteElement<TaskStateModel>(taskState, newState.states);
        return newState;
      case ADD_WORKER:
        const worker: WorkerModel = (<AddWorkerAction>action).worker;
        const targetUid: string = (<AddWorkerAction>action).targetUid;
        ContainerManager.AppendElement<WorkerModel>(worker, newState.workers);
        const targetState: TaskStateModel = ContainerManager.getElementByUid<TaskStateModel>(targetUid, newState.states);
        targetState.workers.push(worker.uid);
        return newState;
      case SELECT_TASK:
        newState.selectedTaskUid = (<SelectTaskAction>action).taskUid;
        return newState;
      case ADD_TASK:
        const newTask: TaskModel = (<AddTaskAction>action).task;
        const hostUid: string = (<AddTaskAction>action).hostUid;
        ContainerManager.AppendElement<TaskModel>(newTask, newState.tasks);
        const hostWorker: WorkerModel = ContainerManager.getElementByUid<WorkerModel>(hostUid, newState.workers);
        hostWorker.tasks.push(newTask.uid);
        return newState;
      case UPDATE_TASK:
        const editedTask: TaskModel = (<UpdateTaskAction>action).task;
        ContainerManager.DeleteElement<TaskModel>(editedTask, newState.tasks);
        ContainerManager.AppendElement<TaskModel>(editedTask, newState.tasks);
        return newState;
      default:
        return newState;
    }
  };
