import { ApiProperty } from '@nestjs/swagger';
import { RecruitmentStatusDto } from '../recruitment-status.dto';

export class ResponseRecruitmentStatusDto extends RecruitmentStatusDto{
    @ApiProperty({description: "Recruiment Status primary key"})
    id: number;
}
