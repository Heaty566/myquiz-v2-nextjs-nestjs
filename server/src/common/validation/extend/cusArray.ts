import * as Joi from 'joi';
import { Root } from 'joi';

interface ArrayExtend extends Joi.ArraySchema {
        some: (compare: any) => any;
}

interface JoiCusArrayExtend extends Root {
        array(): ArrayExtend;
}

export const JoiCusArray: JoiCusArrayExtend = Joi.extend((joi) => {
        return {
                type: 'array',
                base: joi.array(),
                messages: {
                        'array.some': 'should contain at least {#compareValue}',
                },
                rules: {
                        some: {
                                method(containValue: any) {
                                        return this.$_addRule({ name: 'some', args: { containValue } });
                                },
                                args: [
                                        {
                                                name: 'containValue',
                                                assert: (value) => value,
                                                message: 'must have value',
                                        },
                                ],
                                validate: (value: any[], helpers: Joi.CustomHelpers, { containValue }: any) => {
                                        if (!value.some((item) => item === containValue)) {
                                                return helpers.error('array.some', { compareValue: containValue });
                                        }

                                        return value;
                                },
                        },
                },
        };
});
