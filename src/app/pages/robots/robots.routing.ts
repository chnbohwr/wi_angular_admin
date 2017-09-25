import { RobotFormComponent } from './components/robot-form/robot-form.component';
import { RobotHttp } from './components/robot-http/robot-http.component';
import { Routes, RouterModule } from '@angular/router';

import { Robots } from './robots.component';
import { RobotManagement } from './components/robot-management';
import { RobotRoutemap } from './components/robot-routemap';
import { RobotTodo } from './components/robot-todo/robot-todo.component';
import { RobotHi } from './components/robot-hi/robot-hi.component';

const routes: Routes = [
  {
    path: '',
    component: Robots,
    children: [
      { path: 'robot-management', component: RobotManagement },
      { path: 'robot-routemap', component: RobotRoutemap },
      { path: 'robot-http', component: RobotHttp },
      {
        path: 'robot-todo',
        component: RobotTodo,
        children: [
          { path: 'robot-hi', component: RobotHi },
        ]
      },
      {
        path: 'robot-form',
        component: RobotFormComponent,
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
