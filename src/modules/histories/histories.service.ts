import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities';
import { DeleteResult, Repository } from 'typeorm';
import { ResponseHistoryDto } from './dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoriesService {
    constructor(
        @InjectRepository(History)
        private historiesRepository: Repository<History>,
    ) {}

    async exists(id: number, user: User): Promise<boolean> {
        const count = await this.historiesRepository.count({
            where: {
                id,
                user: {
                    id: user.id,
                },
            },
        });
        return count != 0;
    }

    async findByUser(user: User): Promise<ResponseHistoryDto[]> {
        return await this.historiesRepository.find({
            where: {
                user: {
                    id: user.id,
                },
            },
        });
    }

    async removeOne(id: number, user: User): Promise<DeleteResult> {
        if (await this.exists(id, user)) {
            return await this.historiesRepository.delete(id);
        } else throw new NotFoundException('History not found');
    }
}
