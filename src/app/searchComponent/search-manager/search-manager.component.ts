import { Component, OnInit } from '@angular/core';
import { DialogComponent,DialogService } from 'ng2-bootstrap-modal';
import {User} from '../../model/user.component';
import {SearchManager} from '../../model/searchManager';

@Component({
  selector: 'app-search-manager',
  templateUrl: './search-manager.component.html',
  styleUrls: ['./search-manager.component.css']
})
export class SearchManagerComponent extends DialogComponent<SearchManager,any> implements SearchManager {
  
  managers:User[];
  managerSearchName:String='';

  constructor(public dialogService:DialogService) {
    super(dialogService);
   }

  ngOnInit() {
  }

  selectManager(manager:User){
    this.result=manager;
    this.close();
  }

  closeModalWindow(){
    this.close();
  }

}
