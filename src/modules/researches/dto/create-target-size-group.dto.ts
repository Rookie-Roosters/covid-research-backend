import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateTargetSizeGroupDto {
  @IsDefined()
  @IsString()
  @MaxLength(256)
  value: string;
}
