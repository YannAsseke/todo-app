import { Repository } from "typeorm";
import { Todo } from "../entities/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";


export class TodoRepository extends Repository<Todo>{
    constructor(
        @InjectRepository(Todo)
          private readonly repository: Repository<Todo>
      ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async paginate(options : IPaginationOptions) : Promise<Pagination<Todo>> {
        return paginate<Todo>(this.repository, options);
      }
}