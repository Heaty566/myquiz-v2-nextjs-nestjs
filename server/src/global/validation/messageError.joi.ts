export const formatError = (override?: Record<string, any>) => {
        return {
                'string.base': `should be a string`,
                'string.min': `should contain at least {#limit} characters`,
                'string.max': `should contain less than or equal {#limit} characters`,
                'string.alphanum': `should contain letters and numbers`,
                'string.pattern.base': `should follow pattern`,
                'number.base': `should be a number`,
                'number.min': `should be greater than or equal {#limit}`,
                'number.max': `should be less than or equal {#limit}`,
                'any.required': `should not be empty`,
                'any.only': `should be match with`,
                'boolean.base': `should be a boolean`,
                ...override,
        };
};
