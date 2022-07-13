import { IsString } from 'class-validator';

export class CreateSourceRegisterDto {
  @IsString()
  value: string;
}
