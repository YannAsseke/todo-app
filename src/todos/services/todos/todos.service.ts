import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { CreateTodoDto } from 'src/dto/todos.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoRepository } from 'src/repo/todo.repository';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class TodosService {
    constructor(private TodosRepository : TodoRepository){}

      async create(createTodoDto : CreateTodoDto){
            let todo : Todo = new Todo();
            todo.title = createTodoDto.title;
            todo.description = createTodoDto.description;
            todo.status = false;

            return this.TodosRepository.save(todo);
      }

      async paginate(options: IPaginationOptions): Promise<Pagination<Todo>> {
        const queryBuilder = this.TodosRepository.createQueryBuilder('id');
        queryBuilder.orderBy('id', 'ASC'); // Or whatever you need to do
    
        return paginate<Todo>(queryBuilder, options);
      }

      async findAll(){
        return this.TodosRepository.find();
      };

      async findAllandCount(){
        return this.TodosRepository.findAndCount();
      };

      async findOne(id : number){
        return this.TodosRepository.findOneBy({id});
      }

      async update(id, todo){
        const todoUpdate = await this.TodosRepository.findOneBy({id});
        console.log(todo);
        if (!todoUpdate) {
            return new NotFoundException('Error Not Found');
        }

        this.TodosRepository.save({...todoUpdate, ...todo});
      }

      async remove(todoId : number){
        return this.TodosRepository.delete(todoId);
      }
    
      
}
