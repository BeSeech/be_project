export class CanvasConfig {
  private _taskWidth = 200;
  private _taskHeight = 150;
  private _taskGap = 10;
  private _workerNameHeight = 10;
  private _stateNameHeight = 40;
  private _statesGap = 10;


  get statesGap(): number {
    return this._statesGap;
  }

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

  get stateNameHeight(): number {
    return this._stateNameHeight;
  }


  getWorkerWidthByColumnCount(columnCount: number): number {
      return this.taskGap + columnCount * (this.taskWidth + this.taskGap);
  }

  getWorkerHeightByRowCount(rowCount: number): number {
    return this.workerNameHeight + this.taskGap +
      rowCount * (this.taskHeight + this.taskGap);
  }
}
