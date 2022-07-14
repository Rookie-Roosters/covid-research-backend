import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSourceRegisterDto } from './dto/create-source-register.dto';
import { UpdateSourceRegisterDto } from './dto/update-source-register.dto';
import { SourceRegister } from './entities/source-register.entity';

@Injectable()
export class SourceRegistersService {
  constructor(
    @InjectRepository(SourceRegister)
    private sourceRegisterRepository: Repository<SourceRegister>,
  ) {}

  async create(
    createSourceRegisterDto: CreateSourceRegisterDto,
  ): Promise<SourceRegister> {
    return await this.sourceRegisterRepository.save(createSourceRegisterDto);
  }

  async findAll(): Promise<SourceRegister[]> {
    return await this.sourceRegisterRepository.find();
  }

  async findOne(id: number): Promise<SourceRegister> {
    return await this.sourceRegisterRepository.findOneBy({ id });
  }

  async findByValue(value: string): Promise<SourceRegister> {
    return await this.sourceRegisterRepository
      .createQueryBuilder()
      .where('LOWER(value) = LOWER(:value)', { value })
      .getOne();
  }

  async update(id: number, updateSourceRegisterDto: UpdateSourceRegisterDto) {
    return await this.sourceRegisterRepository.update(
      { id },
      updateSourceRegisterDto,
    );
  }

  async remove(id: number) {
    return await this.sourceRegisterRepository.delete({ id });
  }
}
