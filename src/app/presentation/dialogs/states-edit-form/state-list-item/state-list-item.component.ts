import {Component, Input, OnInit} from '@angular/core';
import {TaskStateModel} from '../../../../data/model/state/taskState';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../../data/redux/appState';
import {StateInEditFormActions} from '../../../../data/redux/actions/editStateFormActions';

@Component({
  selector: 'state-list-item',
  templateUrl: './state-list-item.component.html',
  styleUrls: ['./state-list-item.component.css']
})
export class StateListItemComponent implements OnInit {
  @Input() state: TaskStateModel;
  @Input() index: number;

  select() {
    this.ngRedux.dispatch(StateInEditFormActions.selectTask(this.index));
  }

  isSelected(): Boolean {
    return this.index === this.ngRedux.getState().presentation.editFormSelectedStateIndex;
  }

  constructor(private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
  }

}
