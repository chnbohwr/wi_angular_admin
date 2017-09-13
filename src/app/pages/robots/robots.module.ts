import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing } from './robots.routing';
import { Robots } from './robots.component';
import { RobotManagement } from './components/robot-management/robot-management.component';
import { RobotRoutemap } from './components/robot-routemap/robot-routemap.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Robots,
    RobotManagement,
    RobotRoutemap,
  ]
})
export class RobotsModule {
}
