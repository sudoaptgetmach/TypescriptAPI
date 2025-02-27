import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query, UsePipes
} from '@nestjs/common';
import { PaginationDto } from "../common/dto/pagination.dto";
import { ParseIntIdPipe } from "../common/pipes/parse-int-id.pipe";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UsePipes(ParseIntIdPipe)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('/list')
    findAll(@Query() paginationDto: PaginationDto) {
        return this.userService.findAll(paginationDto);
    }

    @Get('/find/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(+id);
    }

    @Patch('/update/:id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/delete/:id')
    remove(@Param('id') id: number) {
        return this.userService.remove(+id);
    }
}
