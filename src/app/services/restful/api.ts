import {TasksCrudApi} from './tasksCrudApi';
import {TasksApi} from './tasksApi';
import {GuidApi} from './public/guidApi';
import {ApiCredentials} from './helpers/Credentials';
import {ApiContext} from './helpers/ApiContext';
import {HttpClient} from '@angular/common/http';

export class Api {
  public tasks: TasksApi = new TasksApi();
  public guid: GuidApi = new GuidApi(this.http, this.apiContext, this.credentials);

  constructor(private http: HttpClient, private apiContext: ApiContext, private credentials: ApiCredentials) {
  }
}
