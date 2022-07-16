import { CovidInfo } from 'src/modules/covid-info/entities/covid-info.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CovidInfo, (covidInfo) => covidInfo.iso_code, {nullable: true})
    covidInfo?: string;

    @Column({type: 'varchar', length: 64})
    value: string;
}