import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSourceRegisterDto } from '../dto/create-source-register.dto';
import { SourceRegister } from '../entities/source-register.entity';

@Injectable()
export class SourceRegistersService {
    constructor(
        @InjectRepository(SourceRegister)
        private sourceRegisterRepository: Repository<SourceRegister>,
    ) {}

    async create(createSourceRegisterDto: CreateSourceRegisterDto): Promise<SourceRegister> {
        let sourceRegister: SourceRegister = await this.findByValue(createSourceRegisterDto.value);
        if (!sourceRegister) {
            sourceRegister = await this.sourceRegisterRepository.save(createSourceRegisterDto);
        }
        return sourceRegister;
    }

    async findAll(): Promise<SourceRegister[]> {
        return await this.sourceRegisterRepository.find({
            order: {
                value: 'ASC',
            },
        });
    }

    async findOne(id: number): Promise<SourceRegister> {
        return await this.sourceRegisterRepository.findOneBy({ id });
    }

    async findByValue(value: string): Promise<SourceRegister> {
        return await this.sourceRegisterRepository.createQueryBuilder().where('LOWER(value) = LOWER(:value)', { value }).getOne();
    }
}
