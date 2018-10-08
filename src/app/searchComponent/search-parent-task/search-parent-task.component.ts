import { Component, OnInit } from '@angular/core';
import { DialogComponent,DialogService } from 'ng2-bootstrap-modal';
import {SearchParentTask} from '../../model/searchParentTask';
import { ParentTask } from '../../model/parentTask.component';

@Component({
  selector: 'app-search-parent-task',
  templateUrl: './search-parent-task.component.html',
  styleUrls: ['./search-parent-task.component.css']
})
export class SearchParentTaskComponent extends DialogComponent<SearchParentTask,any> implements SearchParentTask{

  parentTasks:ParentTask[];

  constructor(public dialogService:DialogService) {
    super(dialogService);
   }

  ngOnInit() {
  }

  selectParentTask(parentTask:ParentTask){
    this.result=parentTask;
    this.close();
  }

  closeModalWindow(){
    this.close();
  }

}
