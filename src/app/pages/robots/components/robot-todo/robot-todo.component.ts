import { Component } from '@angular/core';

@Component({
  selector: 'app-robot-todo',
  templateUrl: './robot-todo.component.html'
})
export class RobotTodo {
  private todos: Array<string> = ['buy a apple', 'go to home'];
  private addTodo(todo: string): void {
    this.todos.push(todo);
  }
}
