import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private TasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.TasksRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.TasksRepository.findOneBy({ id });
  }

  async create(task: Task): Promise<Task> {
    return await this.TasksRepository.save(task);
  }

  async update(id: number, Task: Task): Promise<Task> {
    const TaskToUpdate = await this.TasksRepository.findOneBy({ id });
    if (!TaskToUpdate) {
      throw new Error('Task not found');
    }
    return await this.TasksRepository.save({
      ...TaskToUpdate,
      isDone: Task.isDone,
    });
  }

  async remove(id: number): Promise<void> {
    await this.TasksRepository.delete(id);
  }
}
