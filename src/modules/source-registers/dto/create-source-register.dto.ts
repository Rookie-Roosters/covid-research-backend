import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateSourceRegisterDto {
  @IsDefined()
  @IsString()
  @MaxLength(64)
  value: string;
}
