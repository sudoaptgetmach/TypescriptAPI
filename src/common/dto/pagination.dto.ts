import {IsInt, IsOptional, Max, Min} from "class-validator";
import {Type} from "class-transformer";

export class PaginationDto {

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(50)
    @Type(() => Number)
    limit: number;

    @IsOptional()
    @Type(() => Number)
    offset: number;

    @IsOptional()
    @Type(() => String)
    order: string;
}