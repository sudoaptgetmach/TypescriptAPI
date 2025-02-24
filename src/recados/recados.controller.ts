import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {CreateTaskDto} from "./dto/CreateTaskDto";
import {UpdateTaskDto} from "./dto/UpdateTaskDto";
import {RecadosService} from "./recados.service";

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
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.recadosService.createTask(createTaskDto);
    }

    @Put('/update/')
    updateTask(@Body() updateTaskDto: UpdateTaskDto) {
        return this.recadosService.updateTask(updateTaskDto);
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.deleteTask(id);
    }
}