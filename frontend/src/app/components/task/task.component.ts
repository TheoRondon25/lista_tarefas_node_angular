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
  newTask = { nome: '', descricao: '', concluido: 0 };
  editingTaskId: number | null = null;
  successMessage: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    
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
    this.successMessage = ''; // Limpa a mensagem ao abrir o formulário
    if (!this.showTaskForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newTask = { nome: '', descricao: '', concluido: 0 };
    this.editingTaskId = null;
  }

  addTask(): void {
    if (this.newTask.nome.trim() && this.newTask.descricao.trim()) {
      this.taskService.addTask(this.newTask).subscribe((task) => {
        this.successMessage = "Tarefa adicionada com sucesso!"; 
          
        setTimeout(() => {
          this.successMessage = ''; 
        }, 3000);

        this.resetForm();
        this.showTaskForm = false;
        this.tasks = [];
      }, error => {
        console.error('Erro ao adicionar tarefas:', error);
      });
    }
  }

  editTask(task: any): void {
    this.newTask = { nome: task.nome, descricao: task.descricao, concluido: task.concluido !== undefined ? task.concluido : 0 };
    this.editingTaskId = task.id;
    this.showTaskForm = true;
  }

  updateTask(): void {
    console.log('Clicou em Atualizar');
    if (this.editingTaskId !== null) {
      if (!this.newTask.nome || !this.newTask.descricao) {
        console.error('Erro: Nome ou descrição estão vazios!');
        return;
      }
      const taskToUpdate = {
        nome: this.newTask.nome,
        descricao: this.newTask.descricao,
        concluido: this.newTask.concluido !== undefined ? this.newTask.concluido : 0
      };
      console.log('Atualizando a tarefa com ID:', this.editingTaskId, 'Dados:', taskToUpdate);
      this.taskService.editTask(this.editingTaskId, this.newTask).subscribe((updatedTask) => {
        console.log('Resposta do servidor:', updatedTask);
        const index = this.tasks.findIndex(task => task.id === this.editingTaskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.loadTasks();
        this.showTaskForm = false;
      }, error => {
        console.error('Erro ao atualizar tarefa:', error);
      });
    }
  }
}
