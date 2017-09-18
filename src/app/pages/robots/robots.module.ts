import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgvasModule } from 'ngvas';
import { BrowserModule } from '@angular/platform-browser'

import { routing } from './robots.routing';
import { Robots } from './robots.component';
import { RobotManagement } from './components/robot-management/robot-management.component';
import { RobotRoutemap } from './components/robot-routemap/robot-routemap.component';
import { RobotTodo } from './components/robot-todo/robot-todo.component';
import { RobotTodoAdd } from './components/robot-todo/robot-todo-add.component';
import { RobotTodoList } from './components/robot-todo/robot-todo-list.component';
@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    NgvasModule,
  ],
  declarations: [
    Robots,
    RobotManagement,
    RobotRoutemap,
    RobotTodo,
    RobotTodoAdd,
    RobotTodoList,
  ]
})
export class RobotsModule {
}
