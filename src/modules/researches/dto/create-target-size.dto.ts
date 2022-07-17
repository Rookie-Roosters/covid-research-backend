import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTargetSizeDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  researchId: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  targetSizeGroup?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  count?: number;
}
