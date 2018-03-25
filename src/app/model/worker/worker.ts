import {ElementWithUid} from '../helpers/elementWithUid';
import {UidTable} from '../helpers/uidTable';

export class WorkerModel extends ElementWithUid {
  name: string;
  color: string;
  columnCount: number;
  rowCount: number;
  taskTable: UidTable;
}
