import {Reducer} from './reducer';
import {AppState, getInitialState} from '../appState';
import {Action} from '../actions/action';
import {ADD_STATE, AddStateAction, DELETE_STATE, DeleteStateAction} from '../actions/stateActions';
import {ADD_WORKER, AddWorkerAction} from '../actions/workerActions';
import {ContainerManager} from '../../model/helpers/containerManager';
import {TaskStateModel} from '../../model/state/taskState';
import {WorkerModel} from '../../model/worker/worker';

export const taskReducer: Reducer<AppState> =
  (state: AppState = getInitialState(), action: Action): AppState => {
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
      default:
        return newState;
    }
  };
