import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import{ Task } from '../model/task.component';
import {User} from '../model/user.component';
import {Project} from '../model/project.component';
import { UserService } from '../services/user.service';
import { DialogService } from 'ng2-bootstrap-modal';
import {ProjectService} from '../services/project.service';
import {SearchManagerComponent} from '../searchComponent/search-manager/search-manager.component';
import {SearchProjectComponent} from '../searchComponent/search-project/search-project.component';
import {SearchParentTaskComponent} from '../searchComponent/search-parent-task/search-parent-task.component';
import { TaskService } from '../services/task.service';
import { ParentTask } from '../model/parentTask.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map }                from 'rxjs/operators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  @Input() task: Task;
  @ViewChild(NgForm) taskForm :NgForm;
  taskOwners:User[];
  selectedTaskOwnerName:String;
  selectedProjectName:String;
  statusFlag:number;
  statusMessage:String;
  projects:Project[];
  tasks:Task[];
  parentTasks:ParentTask[];
  selectedParentTask:String;
  editTaskMode:String='false';

  constructor(private dialogService:DialogService,private userService:UserService,
    private projectService:ProjectService, private taskService:TaskService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
    this.getProjects();
    this.getParentTasks();
    this.getTasks();
    this.initializeTask()
    this.route.paramMap.subscribe(pmap => this.setTask(+pmap.get('taskId')));
  }

  initializeTask(){
    this.statusFlag=0;
    this.statusMessage='';
    this.task=new Task();
    this.task.project=new Project();
    this.task.parentTask=new ParentTask();
    this.task.priority=0;
    this.task.parentTaskSelectionModel=false;
    this.editTaskMode='false';
  }

  setTask(taskId:number){
    if(taskId && taskId!=0){
      this.editTaskMode='true';
      this.taskService.getTask(taskId)
      .subscribe((task) => {
      this.task = task;
      if(this.task){
        this.selectedProjectName=this.task.project.projectName;
        this.selectedParentTask=this.task.parentTask.parentTaskName;
        if(this.task.startDate){
          this.task.parentTaskSelectionModel=false;
        }
        else{
          this.task.parentTaskSelectionModel=true;
        }
        if(this.task.taskOwner){
          this.selectedTaskOwnerName=this.task.taskOwner.firstName+" "+this.task.taskOwner.lastName;
        }
      }
    });
    }
    
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(taskOwners => this.taskOwners = taskOwners);
  }

  getTasks(): void { 
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getProjects(): void { 
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  getParentTasks(): void { 
    this.taskService.getParentTasks()
      .subscribe((parentTasks:ParentTask[])=>{
        this.parentTasks = parentTasks;
        if(null==parentTasks || parentTasks.length<1){
          this.task.parentTaskSelectionModel=true;
        }
        else{
          this.task.parentTaskSelectionModel=false;
        }
      });
  }

  /**
   * Reusing the same dialogue component used for Manager search.
   */
  searchTaskOwner() {
    let taskOwnerSearchInput={'managers':this.taskOwners}
    this.dialogService.addDialog(SearchManagerComponent,taskOwnerSearchInput).
    subscribe((selectedTaskOwner:User)=>{
      this.task.taskOwner=selectedTaskOwner;
      if(selectedTaskOwner){
        this.selectedTaskOwnerName=selectedTaskOwner.firstName+' '+selectedTaskOwner.lastName;
      }
    });
  }

  searchProjects() {
    let projectSearchInput={'projects':this.projects};
    this.dialogService.addDialog(SearchProjectComponent,projectSearchInput).
    subscribe((selectedProject:Project)=>{
      this.task.project=selectedProject;
      this.selectedProjectName=selectedProject.projectName;
    });
  }

  searchParentTasks() {
    let parentTaskSearchInput={'parentTasks':this.parentTasks};
    this.dialogService.addDialog(SearchParentTaskComponent,parentTaskSearchInput).
    subscribe((selectedParentTask:ParentTask)=>{
      if(selectedParentTask){
        this.task.parentTask=selectedParentTask;
        this.selectedParentTask=selectedParentTask.parentTaskName;
      }
    });
  }

  submitTask(){
    if(null==this.parentTasks || this.parentTasks.length<1){
      this.task.parentTaskSelectionModel=true;
      this.selectedParentTask=this.task.taskName;
      this.task.parentTask.parentTaskName=this.task.taskName;
    }
    else{
      if(this.task.parentTaskSelectionModel){
        this.selectedParentTask=this.task.taskName;
        this.task.parentTask.parentTaskName=this.task.taskName;
      }
    }
    if(this.editTaskMode!=='true'){
        this.taskService.addTask(this.task).
          subscribe(task=>{
            if(this.taskService.errorMessage==''){
              //this.tasks.push(this.task);
              //this.getTasks();
              this.statusFlag=1;
              this.statusMessage="Record saved Successfully";
              this.taskForm.resetForm();
              this.taskForm.reset();
              setTimeout(() =>{this.initializeTask();}, 1000);
            }
            else{
              this.statusFlag=2;
              this.statusMessage="Record failed to save";
            }
          })
        }
        else{
          this.updateTask(this.task);
        }
  }

  updateTask(task:Task){
    this.taskService.updateTask(this.task).
    subscribe(task=>{
      if(this.taskService.errorMessage==''){
        const index=task?this.tasks.findIndex(h=>h.taskId===task.taskId):-1;
        if(index>-1){
          this.tasks[index]=task;
        }
        this.statusFlag=1;
        this.statusMessage="Record updated Successfully";
        this.editTaskMode='false';
        this.taskForm.resetForm();
        this.taskForm.reset();
        setTimeout(() =>{this.initializeTask();}, 1000);
      }
      else{
        this.statusFlag=2;
        this.statusMessage="Record failed to update";
        setTimeout(() =>{this.statusFlag=0;}, 1000);
      }
    });
  }

}
