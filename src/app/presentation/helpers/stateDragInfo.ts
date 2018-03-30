export class StateDragInfo {
  public stateUid: string;
  public fromIndex: number;

  constructor(stateUid: string, fromIndex: number) {
    this.stateUid = stateUid;
    this.fromIndex = fromIndex;
  }
}
