import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from "./country.entity";
import { Research } from "./research.entity";

@Entity()
export class ResearchCountry {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Research)
    research: Research;

    @ManyToOne(() => Country)
    country: Country;
}