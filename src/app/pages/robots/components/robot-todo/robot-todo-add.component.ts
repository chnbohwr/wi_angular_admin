import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-add',
  templateUrl: './robot-todo-add.component.html'
})
export class RobotTodoAdd {
  public todoText: string = '';
  @Output() onAdd: EventEmitter<string> = new EventEmitter<string>();
  public clickAdd(): void {
    this.onAdd.emit(this.todoText);
    this.todoText = '';
  }
}
