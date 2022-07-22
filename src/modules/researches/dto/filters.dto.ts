import { IsDateString, IsDefined, IsOptional, IsString } from "class-validator";

export class FiltersDto {
    @IsString()
    @IsDateString()
    @IsOptional()
    minLastRefreshedOn: Date; //Validar que el max no sea menor al min

    @IsString()
    @IsDateString()
    @IsOptional()
    maxLastRefreshedOn: Date; //Validar que el max no sea menor al min
}