import { IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Recado } from "../entities/recados.entity";

export class CreateMessageDto {
    constructor(recado: Recado) {}

    @IsString()
    name: string;

    @IsString()
    description: string;

    @Type(() => Number)
    @IsInt()
    senderId: number;

    @Type(() => Number)
    @IsInt()
    receiverId: number;
}