import { Routes, RouterModule } from '@angular/router';

import { Robots } from './robots.component';
import { RobotManagement } from './components/robot-management';
import { RobotRoutemap } from './components/robot-routemap';
import { RobotTodo } from './components/robot-todo/robot-todo.component';

const routes: Routes = [
  {
    path: '',
    component: Robots,
    children: [
      { path: 'robot-management', component: RobotManagement },
      { path: 'robot-routemap', component: RobotRoutemap },
      { path: 'robot-todo', component: RobotTodo },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
