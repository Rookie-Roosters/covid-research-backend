import { Research } from 'src/modules/researches/entities/research.entity';
import { TargetSizeGroup } from 'src/modules/target-size-groups/entities/target-size-group.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TargetSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Research, (research) => research.trialID)
  research: string;

  @ManyToOne(() => TargetSizeGroup, (targetSizeGroup) => targetSizeGroup.id)
  targetSizeGroup: number;

  @Column({ type: Number })
  count: number;
}
