import {TaskModel} from '../../data/model/task/task';
import {Guid} from 'guid-typescript';
import {Observable} from 'rxjs/Observable';
import { of as observableOf} from 'rxjs/observable/of';

export class TaskCrudApi {

  postTask(hostUid: string, task: TaskModel): Observable<TaskModel> {
    task.uid = Guid.create().toString();
    const result = observableOf(task);
    return result;
  }

  putTask(task: TaskModel): Observable<TaskModel> {
    const result = observableOf(task);
    return result;
  }
}
