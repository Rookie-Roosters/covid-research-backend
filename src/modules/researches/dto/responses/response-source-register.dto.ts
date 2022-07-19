import { ApiProperty } from '@nestjs/swagger';
import { SourceRegisterDto } from '../source-register.dto';

export class ResponseSourceRegisterDto extends SourceRegisterDto {
    @ApiProperty({ description: 'Source Register primary key' })
    id: number;
}
