import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsString, ValidateNested } from "class-validator";
import { ListUserDto } from "../../user/dto/list-user.dto";
import { Recado } from "../entities/recados.entity";

export class ListMessageDto {
    constructor(recado: Recado) {
        this.id = recado.id;
        this.name = recado.name;
        this.description = recado.description;
        this.read = recado.read;
        this.data = recado.createdAt?.toDateString();
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
    @Type(() => ListUserDto)
    sender: ListUserDto;

    @ValidateNested()
    @Type(() => ListUserDto)
    receiver: ListUserDto;

    @IsBoolean()
    read: boolean;

    @IsDate()
    @Type(() => Date)
    data: string | undefined;

    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;
}
