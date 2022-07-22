import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FiltersDto } from "@researches/dto/filters.dto";
import { validate } from "class-validator";

export const  FiltersDecorator = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const query = request.query;
        let filterDto = new  FiltersDto();
        for(const attr in query) {
            filterDto[attr] = query[attr];
        }
        const errors = await validate(filterDto);
        if(errors.length > 0) throw new BadRequestException(errors);
        return {
            filters: filterDto,
            url: request.url,
        };
    },
);