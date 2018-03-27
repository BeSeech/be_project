import {BeforeMenuEvent, IShContextMenuItem, IShContextOptions} from 'ng2-right-click-menu';

export class TaskContextMenu {
  public contextMenuItems: IShContextMenuItem[];
  public contextMenuOptions: IShContextOptions;

  private clickEvent($event: any) {
    const taskComonent: any = $event.dataContext;
    switch ($event.menuItem.label) {
      case 'Edit':
        taskComonent.editTask(true);
        return;
      case 'Delete':
        taskComonent.deleteTask();
        return;
      default:
        console.log($event.menuItem.label + ' task ' + taskComonent.task.uid);
    }
  }

  constructor() {
    this.initContextMenu();
  }

  public show(): void {
  }

  private initContextMenu() {
    this.contextMenuOptions = {
      theme: 'dark'
    };

    this.contextMenuItems = [
      {
        label: 'Edit',
        onClick: this.clickEvent
      },
      {
        label: 'Move',
        onClick: this.clickEvent
      },
      {
        label: 'Delete',
        onClick: this.clickEvent
      }
    ];
  }
}
