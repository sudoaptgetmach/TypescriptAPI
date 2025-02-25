import {IsBoolean, IsDate, IsString} from "class-validator";
import {Type} from "class-transformer";

export class CreateMessageDto {

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