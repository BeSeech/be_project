import {UidTable} from './uidTable';
import {UidArray} from './uidArray';

export class UidTableManager {
  static init(rowCount: number, columnCount: number): UidTable {
    const table: UidTable = new UidTable();
    for (let r = 0; r < rowCount; r++) {
      table.push(new UidArray(columnCount));
    }
    return table;
  }

  static getElement(row: number, column: number, table: UidTable): string {
    return table[row][column];
  }

  static setElement(row: number, column: number, value: string, table: UidTable): void {
    table[row][column] = value;
  }

}
