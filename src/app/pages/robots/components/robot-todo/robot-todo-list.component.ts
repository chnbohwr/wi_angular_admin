import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './robot-todo-list.component.html',
  inputs: ['list']
})
export class RobotTodoList {
  list: Array<string>;
}
