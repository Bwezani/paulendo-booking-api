import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
// import { Schedule } from './schedule.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originCity: string;

  @Column()
  destinationCity: string;

//   @OneToMany(() => Schedule, (s) => s.route)
//   schedules: Schedule[];
}
