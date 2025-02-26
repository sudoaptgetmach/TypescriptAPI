import {PartialType} from '@nestjs/mapped-types';
import {CreateUserDto} from './create-user.dto';
import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    password?: string;
}
