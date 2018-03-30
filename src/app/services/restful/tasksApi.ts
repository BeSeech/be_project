import {TasksCrudApi} from './tasksCrudApi';
import {TaskPositionApi} from './taskPositionApi';

export class TasksApi {
  public crud: TasksCrudApi = new TasksCrudApi();
  public position: TaskPositionApi = new TaskPositionApi();
}
