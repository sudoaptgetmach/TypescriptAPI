import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {UpdateMessageDto} from "./dto/UpdateMessageDto";
import {RecadosService} from "./recados.service";
import {Recado} from './entities/recados.entity';

@Controller('recados')
export class RecadosController {
    constructor(private readonly recadosService: RecadosService) {
    }

    @Get('/list/:id')
    listOne(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.listOne(id);
    }

    @Get('/list')
    @HttpCode(HttpStatus.OK)
    listAll() {
        return this.recadosService.listAll();
    }

    @Post('/create')
    createTask(@Body() recado: Recado) {
        return this.recadosService.createTask(recado);
    }

    @Put('/update/')
    updateTask(@Body() updateTaskDto: UpdateMessageDto) {
        return this.recadosService.updateTask(updateTaskDto);
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.deleteTask(id);
    }
}