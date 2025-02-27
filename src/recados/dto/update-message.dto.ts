import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;
}