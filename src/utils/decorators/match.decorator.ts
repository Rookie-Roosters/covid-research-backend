import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                defaultMessage: (/*args: ValidationArguments*/) => `${propertyName} don't match with ${property}`,
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[relatedPropertyName];
                    return value === relatedValue;
                },
            },
        });
    };
}
