import {UidArray} from './uidArray';
import {ElementWithUid} from './elementWithUid';

export class Container<T extends ElementWithUid> {
  elementsSequence: UidArray = new UidArray();
  elementsMap: Map<string, T> = new Map<string, T>();
}
