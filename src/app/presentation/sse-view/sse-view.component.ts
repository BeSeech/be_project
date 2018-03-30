import {Component, OnInit} from '@angular/core';
import {EventSourcePolyfill} from 'ng-event-source';

@Component({
  selector: 'sse-view',
  templateUrl: './sse-view.component.html',
  styleUrls: ['./sse-view.component.css']
})
export class SseViewComponent implements OnInit {
  sseEvent: any;
  state: string;

  constructor() {
  }

  ngOnInit() {
    const eventSource = new EventSourcePolyfill(
      'http://bedell:8080/smbTest/sse',
      {
        // headers: {headerName: 'HeaderValue', header2: 'HeaderValue2'}
        headers: {}
      }
    );

    eventSource.onmessage = (data => {
      this.state = JSON.stringify(data);
        // this.sseEvent = data;
    });

    eventSource.onopen = (a) => {
      this.state = 'opened';
    };

    eventSource.onerror = (e) => {
      this.state = 'error: ' + e;
      console.error(e);
    };

  }

}
