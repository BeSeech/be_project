export class TaskDragInfo {
  public taskUid: string;
  public hostUid: string;

  constructor(taskUid: string, hostUid: string) {
    this.taskUid = taskUid;
    this.hostUid = hostUid;
  }
}
