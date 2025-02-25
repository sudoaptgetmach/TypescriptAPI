import {IsString} from 'class-validator';

export class UpdateMessageDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}