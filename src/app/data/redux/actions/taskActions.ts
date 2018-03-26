import {Action} from './action';
import {TaskModel} from '../../model/task/task';


// region constants
export const SELECT_TASK = 'SELECT_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
// endregion

// region interfaces
export interface SelectTaskAction extends Action {
  taskUid: string;
}

export interface AddTaskAction extends Action {
  task: TaskModel;
  hostUid: string;
}

export interface UpdateTaskAction extends Action {
  task: TaskModel;
}

// endregion

// region action creator
export class TaskActions {
  static selectTask(taskUid: string): SelectTaskAction {
    return {
      type: SELECT_TASK,
      taskUid: taskUid
    };
  }

  static addTask(hostUid: string, task: TaskModel): AddTaskAction {
    return {
      type: ADD_TASK,
      task: task,
      hostUid: hostUid
    };
  }

  static updateTask(task: TaskModel): UpdateTaskAction {
    return {
      type: UPDATE_TASK,
      task: task
    };
  }

}

// endregion

