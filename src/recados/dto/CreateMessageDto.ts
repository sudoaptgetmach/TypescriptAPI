import {IsBoolean, IsDate, IsInt, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateMessageDto {

    @Type(() => Number)
    @IsInt({ message: "O ID informado precisa ser um número inteiro." })
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    sender: string;

    @IsString()
    receiver: string;

    @IsBoolean()
    read: boolean;

    @IsDate()
    @Type(() => Date)
    data: Date;
}