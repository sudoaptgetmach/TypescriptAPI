import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UsePipes } from '@nestjs/common';
import { PaginationDto } from "../common/dto/pagination.dto";
import { ParseIntIdPipe } from "../common/pipes/parse-int-id.pipe";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { RecadosService } from "./recados.service";

@Controller('recados')
@UsePipes(ParseIntIdPipe)
export class RecadosController {
    constructor(private readonly recadosService: RecadosService) {
    }

    @Get('/list/:id')
    listOne(@Param('id') id: number) {
        return this.recadosService.listOne(id);
    }

    @Get('/list')
    @HttpCode(HttpStatus.OK)
    listAll(@Query() paginationDto: PaginationDto) {
        return this.recadosService.listAll(paginationDto);
    }

    @Post('/create')
    createTask(@Body() createMessageDto: CreateMessageDto) {
        return this.recadosService.createMessage(createMessageDto);
    }

    @Put('/update/:id')
    updateTask(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
        return this.recadosService.updateMessage(id, updateMessageDto);
    }

    @Delete('/delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteTask(@Param('id') id: number) {
        return this.recadosService.deleteMessage(id);
    }
}