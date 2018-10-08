import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Project} from '../model/project.component';
import {NgForm} from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';
import { UserService } from '../services/user.service';
import { User } from '../model/user.component';
import {SearchManagerComponent} from '../searchComponent/search-manager/search-manager.component';
import * as moment from 'moment';
import {ProjectService} from '../services/project.service';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  @ViewChild(NgForm) projectForm :NgForm;
  managers:User[];
  selectedManager:User;
  selectedManagerName:String
  modelStartDate:String;
  modelEndDate:String;
  modelPriority:number;
  editProjectMode:String;
  projects:Project[];
  statusFlag:number;
  statusMessage:String;
  isDesc: boolean = false;
  column: string = '';

  constructor(private dialogService:DialogService,private userService:UserService,
        private projectService:ProjectService) { }

  ngOnInit() {
    this.getUsers();
    this.getProjects();
    this.initializeProject()
  }

  initializeProject(){
    this.editProjectMode='false';
    this.statusFlag=0;
    this.statusMessage='';
    this.project=new Project();
    this.project.priority=0;
    this.project.completedStatus='No';
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(managers => this.managers = managers);
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }

  searchManager() {
    let managerSearchInput={'managers':this.managers}
    this.dialogService.addDialog(SearchManagerComponent,managerSearchInput).
    subscribe((selectedManager:User)=>{
      this.project.manager=selectedManager;
      if(selectedManager){
        this.selectedManagerName=selectedManager.firstName+' '+selectedManager.lastName;
      }
    });
  }

  setProjectDate(projectDateEnabled){
    if(projectDateEnabled){
      this.project.startDate=moment().format('YYYY-MM-DD');
      this.project.endDate=moment().add('days',1).format('YYYY-MM-DD');
    }
    else{
      this.project.startDate=null;
      this.project.endDate=null;
    }
  }

  editProject(project:Project){
    this.project=project;
    this.editProjectMode='true';
    if(null!=project.manager){
      this.selectedManagerName=project.manager.firstName+' '+project.manager.lastName;
    }
    this.project.enableProjectDate=this.project.startDate || this.project.endDate ? true : false;
  }

  

  submitProject(){
    if(this.editProjectMode!=='true'){
      this.projectService.addProject(this.project).
        subscribe(project=>{
          if(this.projectService.errorMessage==''){
            this.projects.push(this.project);
            this.getProjects();
            this.statusFlag=1;
            this.statusMessage="Record saved Successfully";
            this.projectForm.resetForm();
            this.projectForm.reset();
            setTimeout(() =>{this.initializeProject();}, 1000);
          }
          else{
            this.statusFlag=2;
            this.statusMessage="Record failed to save";
          }
        });
    }
    else{
      this.updateProject(this.project);
    }
  }

  updateProject(project:Project){
    this.projectService.updateProject(this.project).
    subscribe(project=>{
      if(this.projectService.errorMessage==''){
        const index=project?this.projects.findIndex(h=>h.projectId===project.projectId):-1;
        if(index>-1){
          this.projects[index]=project;
          this.selectedManagerName=project.manager.firstName+' '+project.manager.lastName;
        }
        this.statusFlag=1;
        this.statusMessage="Record updated Successfully";
        this.editProjectMode='false';
        this.projectForm.resetForm();
        this.projectForm.reset();
        setTimeout(() =>{this.initializeProject();}, 1000);
      }
      else{
        this.statusFlag=2;
        this.statusMessage="Record failed to update";
        setTimeout(() =>{this.statusFlag=0;}, 1000);
      }
    });
  }

  suspendProject(project:Project){
    this.project=project;
    this.project.completedStatus="Yes";
    this.updateProject(this.project);
  }

  sortBy(property){
    this.isDesc = !this.isDesc; 
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.projects.sort(function(a, b){
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
}


}
