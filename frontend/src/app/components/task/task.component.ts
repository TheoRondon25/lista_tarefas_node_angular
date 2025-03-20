import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tasks: any[] = [];
  showTaskForm: boolean = false;
  newTask = { nome: '', descricao: '' };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    }, error => {
      console.error('Erro ao carregar tarefas:', error);
    });
  }

  toggleTaskForm(): void {
    this.showTaskForm = !this.showTaskForm;
  }

  addTask(): void {
    if (this.newTask.nome.trim() && this.newTask.descricao.trim()) {
      this.taskService.addTask(this.newTask).subscribe((task) => {
        this.tasks.push({ ...this.newTask });
        this.newTask = { nome: '', descricao: '' };
        this.showTaskForm = false;
      }, error => {
        console.error('Erro ao adicionar tarefas:', error);
      });
    }
  }
}
