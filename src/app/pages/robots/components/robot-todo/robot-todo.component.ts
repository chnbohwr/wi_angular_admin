import { Component } from '@angular/core';

@Component({
  selector: 'app-robot-todo',
  templateUrl: './robot-todo.component.html'
})
export class RobotTodo {
  private num: number = 34;
  private increment(): void {
    this.num++;
  }
}
