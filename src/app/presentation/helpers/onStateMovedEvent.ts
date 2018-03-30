export class OnStateMovedEvent {
  movedStateUid: string;
  oldPosition: number;
  newPosition: number;

  constructor (movedStateUid: string, oldPosition: number, newPosition: number) {
    this.movedStateUid = movedStateUid;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
  }
}
