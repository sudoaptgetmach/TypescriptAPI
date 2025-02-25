import {IsBoolean, IsDate, IsInt, IsString} from "class-validator";
import {Type} from "class-transformer";

export class Recado {

    @Type(() => Number)
    @IsInt()
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