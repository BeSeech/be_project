export class GeneralDragInfo {
  public draggedItemUid: string;
  public fromIndex: number;

  constructor(draggedItemUid: string, fromIndex: number) {
    this.draggedItemUid = draggedItemUid;
    this.fromIndex = fromIndex;
  }
}
