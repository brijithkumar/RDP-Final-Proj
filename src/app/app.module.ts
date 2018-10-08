import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing-module';
import {UserService} from './services/user.service';
import { HttpClientModule, } from '@angular/common/http';
import { ProjectComponent } from './project/project.component';
import { SearchManagerComponent } from './searchComponent/search-manager/search-manager.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ManagerFilterPipe } from './filters/manager-filter.pipe';
import {ProjectService} from './services/project.service';
import { TaskComponent } from './task/task.component';
import {TaskService} from './services/task.service';
import { SearchProjectComponent } from './searchComponent/search-project/search-project.component';
import { ProjectFilterPipe } from './filters/project-filter.pipe';
import { SearchParentTaskComponent } from './searchComponent/search-parent-task/search-parent-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ParentTaskFilterPipe } from './filters/parent-task-filter.pipe';
import { ProjectTaskFilterPipe } from './filters/project-task-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    SearchManagerComponent,
    ManagerFilterPipe,
    TaskComponent,
    SearchProjectComponent,
    ProjectFilterPipe,
    SearchParentTaskComponent,
    ViewTaskComponent,
    ParentTaskFilterPipe,
    ProjectTaskFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BootstrapModalModule.forRoot({container:document.body})
  ],
  entryComponents:[
    SearchManagerComponent,SearchProjectComponent,SearchParentTaskComponent
  ],
  providers: [UserService,DialogService,ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
