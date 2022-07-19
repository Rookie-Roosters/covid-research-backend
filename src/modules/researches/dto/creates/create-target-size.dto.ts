import { IsDefined, IsOptional, IsString, MaxLength } from 'class-validator';
import { TargetSizeDto } from '../target-size.dto';

export class CreateTargetSizeDto extends TargetSizeDto {
    @IsDefined()
    @IsString()
    @MaxLength(64)
    researchId: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    targetSizeGroup?: string;
}
