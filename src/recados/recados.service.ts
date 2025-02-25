import {Body, HttpException, Injectable, Param, ParseIntPipe} from '@nestjs/common';
import {CreateMessageDto} from "./dto/CreateMessageDto";
import {UpdateMessageDto} from "./dto/UpdateMessageDto";
import {Recado} from './entities/recados.entity';

@Injectable()
export class RecadosService {

    listOne(@Param('id', ParseIntPipe) id: number) {
        return 'ID ' + id + ' não foi encontrado.';
    }

    listAll() {
        return 'Lista todos os recados.';
    }

    createTask(@Body() recado: Recado) {
        try {
            return new CreateMessageDto();
        } catch (e) {
            return HttpException.getDescriptionFrom(e);
        }
    }

    updateTask(@Body() updateTaskDto: UpdateMessageDto) {
        return `Task ${updateTaskDto.id} updated successfully: ` +
            `Name: ${updateTaskDto.name} ` +
            `Description: ${updateTaskDto.description}`;
    }

    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return `Task ${id} deleted successfully.`;
    }

}
