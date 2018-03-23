export class CanvasConfig {
  private _taskWidth = 200;
  private _taskHeight = 150;
  private _taskGap = 10;
  private _workerNameHeight = 10;


  get taskGap(): number {
    return this._taskGap;
  }

  get taskWidth(): number {
    return this._taskWidth;
  }

  get taskHeight(): number {
    return this._taskHeight;
  }

  get workerNameHeight(): number {
    return this._workerNameHeight;
  }

}
