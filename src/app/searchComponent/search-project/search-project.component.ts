import { Component, OnInit } from '@angular/core';
import { DialogComponent,DialogService } from 'ng2-bootstrap-modal';
import {SearchProject} from '../../model/searchProject';
import {Project} from '../../model/project.component';


@Component({
  selector: 'app-search-project',
  templateUrl: './search-project.component.html',
  styleUrls: ['./search-project.component.css']
})
export class SearchProjectComponent extends DialogComponent<SearchProject,any> implements SearchProject {

  projects:Project[];
  constructor(public dialogService:DialogService) {
    super(dialogService);
   }

  ngOnInit() {
  }

  selectProject(project:Project){
    this.result=project;
    this.close();
  }

  closeModalWindow(){
    this.close();
  }

}
