import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";

export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {

        if (metadata.type !== 'param' || metadata.data !== 'id') {
            return value;
        }

        const parsedValue = Number(value);

        if (isNaN(parsedValue)) {
            throw new BadRequestException("ID should not be a string.");
        }

        if (parsedValue < 0) {
            throw new BadRequestException("ID should not be less than zero.");
        }

        return parsedValue;
    }
}