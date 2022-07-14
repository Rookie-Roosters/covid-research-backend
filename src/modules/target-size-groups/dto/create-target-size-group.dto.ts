import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateTargetSizeGroupDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  value: string;
}
