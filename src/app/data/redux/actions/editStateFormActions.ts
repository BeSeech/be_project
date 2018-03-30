import {Action} from './action';


// region constants
export const SELECT_STATE_IN_EDIT_FORM = 'SELECT_STATE_IN_EDIT_FORM';
// endregion

// region interfaces
export interface SelectStateAction extends Action {
  index: number;
}
// endregion

// region action creator
export class StateInEditFormActions {
  static selectTask(index: number): SelectStateAction {
    return {
      type: SELECT_STATE_IN_EDIT_FORM,
      index: index
    };
  }
}
// endregion

