import {Body, Injectable, Param, ParseIntPipe} from '@nestjs/common';
import {CreateTaskDto} from "./dto/CreateTaskDto";
import {UpdateTaskDto} from "./dto/UpdateTaskDto";

@Injectable()
export class RecadosService {

    listOne(@Param('id', ParseIntPipe) id: number) {
        return 'ID ' + id + ' não foi encontrado.';
    }

    listAll() {
        return 'Lista todos os recados.';
    }

    createTask(@Body() createTaskDto: CreateTaskDto) {
        return `Task ${createTaskDto.id} created successfully: ` +
            `Name: ${createTaskDto.name} ` +
            `Description: ${createTaskDto.description}`;
    }

    updateTask(@Body() updateTaskDto: UpdateTaskDto) {
        return `Task ${updateTaskDto.id} updated successfully: ` +
            `Name: ${updateTaskDto.name} ` +
            `Description: ${updateTaskDto.description}`;
    }

    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return `Task ${id} deleted successfully.`;
    }

}
