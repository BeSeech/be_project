export class TaskModel {
  private _summary: string;
  private _id: string;
  private _expectedDuration: number;
  private _actualDuration: number;

  get summary(): string {
    return this._summary;
  }

  set summary(value: string) {
    this._summary = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get expectedDuration(): number {
    return this._expectedDuration;
  }

  set expectedDuration(value: number) {
    this._expectedDuration = value;
  }

  get actualDuration(): number {
    return this._actualDuration;
  }

  set actualDuration(value: number) {
    this._actualDuration = value;
  }
}
