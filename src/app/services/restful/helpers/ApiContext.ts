export class ApiContext {
  private _host = 'bedell';
  private _publicPort = '8080';
  private _privatePort = '8181';
  private _appName = 'be_project_app';
  private _apiPrefix = 'api';
  private _apiPrivatePrefix = 'private';
  private _apiPublicPrefix = 'public';


  get host(): string {
    return this._host;
  }

  get publicPort(): string {
    return this._publicPort;
  }

  get privatePort(): string {
    return this._privatePort;
  }

  get appName(): string {
    return this._appName;
  }

  get apiPrefix(): string {
    return this._apiPrefix;
  }

  get apiPrivatePrefix(): string {
    return this._apiPrivatePrefix;
  }

  get apiPublicPrefix(): string {
    return this._apiPublicPrefix;
  }

  public getPublicBaseUrl(): String {
    return `http://${this._host}:${this._publicPort}/${this._appName}/${this._apiPrefix}/${this._apiPublicPrefix}/`;
  }

  public getPrivateBaseUrl(): String {
    return `http://${this._host}:${this._publicPort}/${this._appName}/${this._apiPrefix}/${this._apiPrivatePrefix}/`;
  }

}
