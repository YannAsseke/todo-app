import { Module } from '@nestjs/common';
import { TodosController } from './controllers/todos/todos.controller';
import { TodosService } from './services/todos/todos.service';
import { Todo } from 'src/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from 'src/repo/todo.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo])
  ],
  providers: [TodosService, TodoRepository],
  exports: [TypeOrmModule],
  controllers: [TodosController],
})
export class TodosModule {}
