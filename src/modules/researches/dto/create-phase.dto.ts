import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreatePhaseDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  value: string;
}
