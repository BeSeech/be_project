import {Reducer} from './reducer';
import {AppState} from '../../model/appState';
import {Action} from '../actions/action';
import {ADD_STATE, AddStateAction, DELETE_STATE, DeleteStateAction} from '../actions/stateActions';
import {ADD_WORKER, AddWorkerAction} from '../actions/workerActions';

export const taskReducer: Reducer<AppState> =
  (state: AppState, action: Action): AppState => {
    const newState: AppState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case ADD_STATE:
        const stateValue = (<AddStateAction>action).state;
        newState.states.push(stateValue);
        return newState;
      case DELETE_STATE:
        const indexValue = (<DeleteStateAction>action).index;
        newState.states.splice(indexValue, 1);
        return newState;
      case ADD_WORKER:
        const worker = (<AddWorkerAction>action).worker;
        const target = (<AddWorkerAction>action).targetName;
        return newState;
      default:
        return newState;
    }
  };
