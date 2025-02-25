import {IsInt, IsString} from 'class-validator';
import {Type} from "class-transformer";

export class UpdateMessageDto {
    @Type(() => Number)
    @IsInt({ message: "O ID informado precisa ser um número inteiro." })
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}