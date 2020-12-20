import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { ObjectSchema } from 'joi';
import { JoiErrorMapper } from '../helper/JoiErrorMapper';

@Injectable()
export class JoiValidatorPipe implements PipeTransform {
        constructor(private readonly schema: ObjectSchema) {}

        transform(input: any, metaData: ArgumentMetadata) {
                const { error, value } = this.schema.validate(input, { abortEarly: false });
                if (error) throw new BadRequestException({ data: JoiErrorMapper(error) });

                return value;
        }
}
