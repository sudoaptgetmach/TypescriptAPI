import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {UpdateMessageDto} from "./dto/update-message.dto";
import {RecadosService} from "./recados.service";
import {CreateMessageDto} from "./dto/create-message.dto";

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
    createTask(@Body() createMessageDto: CreateMessageDto) {
        return this.recadosService.createMessage(createMessageDto);
    }

    @Put('/update/:id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateMessageDto: UpdateMessageDto) {
        return this.recadosService.updateMessage(id, updateMessageDto);
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.recadosService.deleteMessage(id);
    }
}