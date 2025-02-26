import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/create')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('/list')
    findAll() {
        return this.userService.findAll();
    }

    @Get('/find/:id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch('/update/:id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/delete/:id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
