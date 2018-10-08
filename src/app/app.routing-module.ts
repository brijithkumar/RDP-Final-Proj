import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
    { path: '', redirectTo: '/addProject', pathMatch: 'full' },
    { path: 'addUser', component: UserComponent },
    { path: 'addProject', component: ProjectComponent },
    { path: 'addTask', component: TaskComponent },
    { path: 'viewTask', component: ViewTaskComponent },
    { path: 'editTask/:taskId', component:  TaskComponent}
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }