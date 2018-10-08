import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Task} from '../model/task.component';
import {TaskService} from '../services/task.service';
import {Router} from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { DialogService } from 'ng2-bootstrap-modal';
import {SearchProjectComponent} from '../searchComponent/search-project/search-project.component';
import {ProjectService} from '../services/project.service';
import {Project} from '../model/project.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  @ViewChild(NgForm) taskViewForm:NgForm
  @Input() task:Task;
  tasks:Task[];
  statusFlag:number;
  statusMessage:String;
  isDesc: boolean = false;
  column: string = '';
  projects:Project[];
  projectTaskSearchName:String;

  constructor(private taskService:TaskService, private router:Router,private dialogService:DialogService,
    private projectService:ProjectService) { }

  ngOnInit() {
    this.getTasks();
    this.getProjects();
  }

  initializeTask(){
    this.statusFlag=0;
    this.statusMessage='';
  }

  getTasks(): void { 
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }
  getProjects(): void { 
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  endTask(task:Task){
    this.task=task;
    this.task.taskStatus="1";
    this.taskService.updateTask(this.task).
    subscribe(task=>{
      if(this.taskService.errorMessage==''){
        const index=task?this.tasks.findIndex(h=>h.taskId===task.taskId):-1;
        if(index>-1){
          this.tasks[index]=task;
        }
        this.statusFlag=1;
        this.statusMessage="Record updated Successfully";
        this.taskViewForm.resetForm();
        this.taskViewForm.reset();
        setTimeout(() =>{this.initializeTask();}, 1000);
      }
      else{
        this.statusFlag=2;
        this.statusMessage="Record failed to update";
        setTimeout(() =>{this.initializeTask();}, 1000);
      }
    });
  }

  searchProjects() {
    let projectSearchInput={'projects':this.projects};
    this.dialogService.addDialog(SearchProjectComponent,projectSearchInput).
    subscribe((selectedProject:Project)=>{
      this.projectTaskSearchName=selectedProject.projectName;
    });
  }

  sortBy(property){
    this.isDesc = !this.isDesc; 
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.tasks.sort(function(a, b){
      if(property=='startDate' || property=='endDate'){
        if((a[property] || b[property]) && a[property]==null){
           return 1 * direction;
        }
        else if((a[property] || b[property]) && b[property]==null){
          return 1 * direction;
        }
        else{
          if((a[property] || b[property]) && (a[property]!=null &&  b[property]!=null )){
            let dateAPropertyArray : Array<string>=a[property].split("-");
            let dateBPropertyArray : Array<string>=b[property].split("-");
            let aObj=dateAPropertyArray[0].concat(dateAPropertyArray[1]).concat(dateAPropertyArray[2]);
            let bObj=dateBPropertyArray[0].concat(dateBPropertyArray[1]).concat(dateBPropertyArray[2]);
            if(aObj < bObj){
                  return -1 * direction;
              }
              else if( aObj > bObj){
                  return 1 * direction;
              }
              else{
                  return 0;
              }
          }
        }       
      }
      else{
          if(a[property] < b[property]){
              return -1 * direction;
          }
          else if( a[property] > b[property]){
              return 1 * direction;
          }
          else{
              return 0;
          }
      }
    });
};

}
