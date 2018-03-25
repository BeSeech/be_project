import {Container} from './container';
import {ElementWithUid} from './elementWithUid';

export class ContainerManager {
  static getElementByUid<T extends ElementWithUid>(uid: string, container: Container<T>): T {
    return (<T>container.elementsMap.get(uid));
  }

  static getElementByIndex<T extends ElementWithUid>(index: number, container: Container<T>): T {
    return ContainerManager.getElementByUid<T>(container.elementsSequence[index], container);
  }

  static getElementsCount<T extends ElementWithUid>(container: Container<T>): number {
    return container.elementsSequence.length;
  }

  static AppendElement<T extends ElementWithUid>(element: T, container: Container<T>): void {
    container.elementsMap.set(element.uid, element);
    container.elementsSequence.push(element.uid);
  }

  static DeleteElement<T extends ElementWithUid>(element: T, container: Container<T>): void {
    container.elementsMap.delete(element.uid);
    const index = container.elementsSequence.indexOf(element.uid, 0);
    if (index > -1) {
      container.elementsSequence.splice(index, 1);
    }
  }

  static InsertElement<T extends ElementWithUid>(element: T, position: number, container: Container<T>): void {
    container.elementsMap.set(element.uid, element);
    container.elementsSequence.splice(position, 0, element.uid);
  }
}
