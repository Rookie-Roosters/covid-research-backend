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
    private sourceRegister: Repository<SourceRegister>,
  ) {}

  async create(createSourceRegisterDto: CreateSourceRegisterDto) {
    return await this.sourceRegister.save(createSourceRegisterDto);
  }

  async findAll() {
    return await this.sourceRegister.find();
  }

  async findOne(id: number) {
    return await this.sourceRegister.findOneBy({ id: id });
  }

  async update(id: number, updateSourceRegisterDto: UpdateSourceRegisterDto) {
    return await this.sourceRegister.update(
      { id: id },
      updateSourceRegisterDto,
    );
  }

  async remove(id: number) {
    return await this.sourceRegister.delete({ id: id });
  }
}
