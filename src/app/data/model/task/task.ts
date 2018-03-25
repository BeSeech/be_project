import {ElementWithUid} from '../helpers/elementWithUid';

export class TaskModel extends ElementWithUid {
  summary: string;
  id: string;
  expectedDuration: number;
  actualDuration: number;
}
