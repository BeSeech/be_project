import {TaskStateModel} from '../../model/state/taskState';
import {Action} from './action';

export interface AddStateAction extends Action {
  state: TaskStateModel;
}

export interface DeleteStateAction extends Action {
  index: number;
}

export const ADD_STATE = 'ADD_STATE';
export const DELETE_STATE = 'DELETE_STATE';

export class StateActions {
  static addState(state: TaskStateModel): AddStateAction {
    return {
      type: ADD_STATE,
      state: state
    };
  }

  static deleteState(index: number): DeleteStateAction {
    return {
      type: DELETE_STATE,
      index: index
    };
  }

}

