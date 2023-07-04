import { Body, Controller, Post, Get, Patch, Param, Delete, DefaultValuePipe, Query, ParseIntPipe, Req } from '@nestjs/common';
import { CreateTodoDto } from 'src/dto/todos.dtos';
import { UpdateTodoDto } from 'src/dto/updateTodo.dtos';
import { TodosService } from 'src/todos/services/todos/todos.service';

@Controller('todos')
export class TodosController {

    constructor (private readonly todosService : TodosService){}

    @Post()
    create(@Body() createTodo : CreateTodoDto){
        return this.todosService.create(createTodo);
    }

    @Get("/all")
    async finAll(
        @Req() req : Request,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ){
        limit = limit > 100 ? 100 : limit;
        return this.todosService.paginate({
            page,
            limit,
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.todosService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() todo : CreateTodoDto){
        return this.todosService.update(id, todo);
    }

    @Delete(':id')
    remove(@Param('id') id : string){
        return this.todosService.remove(+id);
    }
}
