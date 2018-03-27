import {Reducer} from './reducer';
import {AppState, getInitialState} from '../appState';
import {Action} from '../actions/action';
import {ADD_STATE, AddStateAction, DELETE_STATE, DeleteStateAction} from '../actions/stateActions';
import {ADD_WORKER, AddWorkerAction} from '../actions/workerActions';
import {ContainerManager} from '../../model/helpers/containerManager';
import {TaskStateModel} from '../../model/state/taskState';
import {WorkerModel} from '../../model/worker/worker';
import {
  ADD_TASK, AddTaskAction, DELETE_TASK, SELECT_TASK, SelectTaskAction, UPDATE_TASK,
  UpdateTaskAction
} from '../actions/taskActions';
import {TaskModel} from '../../model/task/task';

export const taskReducer: Reducer<AppState> =
  (state: AppState, action: Action): AppState => {
    const newState: AppState = JSON.parse(JSON.stringify(state));
    const task: TaskModel = 'task' in action ? (<any>action).task : null;
    const hostUid: string = 'hostUid' in action ? (<any>action).hostUid : '';
    const selfUid: string = 'selfUid' in action ? (<any>action).selfUid : '';
    const stateValue: TaskStateModel = 'state' in action ? (<any>action).state : null;
    const worker: WorkerModel = 'worker' in action ? (<any>action).worker : null;
    const getWorkerByUid = (uid: string): WorkerModel => {
      return ContainerManager.getElementByUid<WorkerModel>(uid, newState.workers)
    };

    switch (action.type) {
      case ADD_STATE:
        ContainerManager.AppendElement<TaskStateModel>(stateValue, newState.states);
        return newState;
      case DELETE_STATE:
        const indexValue = (<DeleteStateAction>action).index;
        const taskState: TaskStateModel = ContainerManager.getElementByIndex<TaskStateModel>(indexValue, newState.states);
        ContainerManager.DeleteElement<TaskStateModel>(taskState, newState.states);
        return newState;
      case ADD_WORKER:
        ContainerManager.AppendElement<WorkerModel>(worker, newState.workers);
        const targetState: TaskStateModel = ContainerManager.getElementByUid<TaskStateModel>(hostUid, newState.states);
        targetState.workers.push(worker.uid);
        return newState;
      case SELECT_TASK:
        newState.selectedTaskUid = selfUid;
        return newState;
      case ADD_TASK:
        ContainerManager.AppendElement<TaskModel>(task, newState.tasks);
        getWorkerByUid(hostUid).tasks.push(task.uid);
        return newState;
      case UPDATE_TASK:
        ContainerManager.DeleteElement<TaskModel>(task, newState.tasks);
        ContainerManager.AppendElement<TaskModel>(task, newState.tasks);
        return newState;
      case DELETE_TASK:
        ContainerManager.DeleteElement<TaskModel>(task, newState.tasks);
        const hostWorker: WorkerModel = getWorkerByUid(hostUid);
        const index = hostWorker.tasks.indexOf(task.uid, 0);
        if (index > -1) {
          hostWorker.tasks.splice(index, 1);
        }
        return newState;
      default:
        return newState;
    }
  };
