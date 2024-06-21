import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { AppService } from './app.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  @ViewChild('todoTask') todoTask:any;
  task = '';
  todos:Todo[] = [];

  ngOnInit(): void {
    this.getList();
  }

  constructor(private appService: AppService) {
  }


  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  getList(){
    this.appService.getTodoList().subscribe(
    response => { 
    this.todos = response;
      }
    )
  }

  updateTodo(e:CheckboxChangeEvent, todo: Todo){
    this.appService.updateTodo({ ...todo, completed: e.checked}).subscribe(
      response =>console.log(response)
    )
  }
  deleteTodo(e:unknown, id: Todo['id']){
    this.appService.deleteTodo(id).subscribe(
     response => this.getList()
    )
  }


  addtodo(){
    this.appService.addTodo({task: this.task, completed: false}).subscribe(
      response => {
        this.todoTask.reset();
        this.getList();
      }
    )
    
  }
}
