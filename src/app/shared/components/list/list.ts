import { Component, input } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [],
  template: `
  <ul>
    @for(item of list(); track $index) {
      <li>{{ item }}</li>
    }
  </ul> `,
  styleUrl: './list.scss',
})
export class List {
  list = input.required<string[]>();
}
