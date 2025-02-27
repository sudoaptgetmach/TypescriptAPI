import {Type} from "class-transformer";
import {IsBoolean, IsDate, IsInt, IsString, ValidateNested} from "class-validator";
import {Recado} from "../entities/recados.entity";
import {ListUserDto} from "../../user/dto/list-user.dto";

export class ListMessageDto {
    constructor(recado: Recado) {
        this.id = recado.id;
        this.name = recado.name;
        this.description = recado.description;
        this.read = recado.read;
        this.data = new Date(recado.data);
        this.sender = new ListUserDto(recado.sender);
        this.receiver = new ListUserDto(recado.receiver);
    }

    @Type(() => Number)
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @ValidateNested()
    @Type(() => ListUserDto) // Usando ListUserDto
    sender: ListUserDto;

    @ValidateNested()
    @Type(() => ListUserDto) // Usando ListUserDto
    receiver: ListUserDto;

    @IsBoolean()
    read: boolean;

    @IsDate()
    @Type(() => Date)
    data: Date;

    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;
}
