import { registerDecorator, ValidationOptions } from 'class-validator';

const validPasswordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export function IsValidPassword(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isValidPassword',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    //,args: ValidationArguments
                    if (value.length > 32) return false;
                    return validPasswordRegex.test(value);
                },
            },
        });
    };
}
