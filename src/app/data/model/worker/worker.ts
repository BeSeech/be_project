import {ElementWithUid} from '../helpers/elementWithUid';
import {UidArray} from '../helpers/uidArray';

export class WorkerModel extends ElementWithUid {
  name: string;
  rowCount: number;
  tasks: UidArray = new UidArray();
}
