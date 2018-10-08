import { Component, OnInit,ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../model/user.component';
import { NgForm } from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  @Input() user: User;
  @ViewChild(NgForm) userForm :NgForm;
  statusMessage: String;
  statusFlag: any;
  users:User[];
  editUserMode:String='false';
  isDesc: boolean = false;
  column: string = '';

  constructor(private userService:UserService) { }

  initiliazeUser(){
    this.statusFlag=0;
    this.statusMessage='';
    this.user=new User();
  }

  ngOnInit() {
    this.editUserMode='false';
    this.getUsers();
    this.user=new User();
  }

  addUser(){
    if(this.editUserMode!=='true'){
      this.userService.addUser(this.user).subscribe(user=>{
        if(this.userService.errorMessage=='')
        {
          this.getUsers();
          this.statusFlag=1;
          this.statusMessage="Record saved Successfully";
          this.userForm.resetForm();
          this.userForm.reset();
          setTimeout(() =>{this.initiliazeUser();}, 1000);
        }
        else{
          this.statusFlag=2;
          this.statusMessage="Record failed to save";
        }
      })
    }
    else{
      this.userService.updateUser(this.user).
      subscribe(user=>{
        if(this.userService.errorMessage==''){
          const index=user?this.users.findIndex(h=>h.userId===user.userId):-1;
          if(index>-1){
             this.users[index]=user;
          }
          this.statusFlag=1;
          this.statusMessage="Record updated Successfully";
          this.editUserMode='false';
          this.userForm.resetForm();
          this.userForm.reset();
          setTimeout(() =>{this.initiliazeUser();}, 1000);
        }
        else{
          this.statusFlag=2;
          this.statusMessage="Record failed to update";
          setTimeout(() =>{this.statusFlag=0;}, 1000);
        }
      });
      
    }
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  editUser(user){
    this.user=user;
    this.editUserMode='true';
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.userId).subscribe(()=>{
      if(this.userService.errorMessage==''){
        this.users=this.users.filter(h=>h!=user);
        this.statusFlag=1;
        this.statusMessage="Record deleted Successfully";
        this.userForm.resetForm();
        setTimeout(() =>{this.initiliazeUser();}, 1000);
      }
      else{
        this.statusFlag=2;
        this.statusMessage="Record failed to delete";
      }
    });
  }

  sortBy(property){
    this.isDesc = !this.isDesc; 
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.users.sort(function(a, b){
          if(a[property] < b[property]){
              return -1 * direction;
          }
          else if( a[property] > b[property]){
              return 1 * direction;
          }
          else{
              return 0;
          }
    });
};


}
