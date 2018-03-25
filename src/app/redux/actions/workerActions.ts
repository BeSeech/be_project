import {Action} from './action';
import {WorkerModel} from '../../model/worker/worker';
import {TaskStateModel} from '../../model/state/taskState';

export interface AddWorkerAction extends Action {
  worker: WorkerModel;
  targetName: string;
}

export const ADD_WORKER = 'ADD_WORKER';

export class WorkerActions {
  static addWorker(targetName: string, worker: WorkerModel): AddWorkerAction {
    return {
      type: ADD_WORKER,
      worker: worker,
      targetName: targetName
    };
  }
}
