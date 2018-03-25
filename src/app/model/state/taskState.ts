import {WorkerModel} from '../worker/worker';
import {UidArray} from '../helpers/uidArray';
import {ElementWithUid} from '../helpers/elementWithUid';

export class TaskStateModel extends ElementWithUid {
  name: string;
  color: string;
  columnCount: number;
  maxTaskCount: number;
  workers: UidArray = new UidArray();
}
