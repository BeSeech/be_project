import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ApiContext} from '../helpers/ApiContext';
import {ApiCredentials} from '../helpers/Credentials';

export class GuidApi {
  guidUrl: string;
  private httpHeaders: HttpHeaders;
  private httpOptions: { headers: HttpHeaders; withCredentials: false, responseType: 'text' };

  private initHttpOptions(): void {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Host', `${this.apiContext.host}:${this.apiContext.publicPort}`);
    this.httpHeaders.append('User-Agent', 'Angular5');
    this.httpHeaders.append('Content-Type', 'text');
    this.httpOptions = {headers: this.httpHeaders, withCredentials: false, responseType: 'text'};
  }


  constructor(private http: HttpClient, private apiContext: ApiContext, private credentials: ApiCredentials) {
    this.guidUrl = `${this.apiContext.getPublicBaseUrl()}guid`;
    this.initHttpOptions();
  }

  getGuid(): Observable<Object> {
    return this.http.get(`${this.guidUrl}`, this.httpOptions);
  }

}
