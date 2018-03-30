export class ApiCredentials {
  private _login: String;
  private _password: String;


  get login(): String {
    return this._login;
  }

  set login(value: String) {
    this._login = value;
  }

  get password(): String {
    return this._password;
  }

  set password(value: String) {
    this._password = value;
  }

  public setCredentials(login: String, password: String): void {
    this.login = login;
    this.password = password;
  }

  public getBasicAuthValue(): string {
    return `Basic ${btoa(this.login + ':' + this.password)}`;
  }
}
