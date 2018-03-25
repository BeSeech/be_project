import {Action} from './action';

export interface SelectTaskAction extends Action {
  taskUid: string;
}

export const SELECT_TASK = 'SELECT_TASK';

export class TaskActions {
  static selectTask(taskUid: string): SelectTaskAction {
    return {
      type: SELECT_TASK,
      taskUid: taskUid
    };
  }
}
