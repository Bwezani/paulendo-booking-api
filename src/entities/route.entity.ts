import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { RouteStop } from './route-stop.entity';
// import { Schedule } from './schedule.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g. "Lusaka → Chipata"

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column({ type: 'int', nullable: true })
  distance_km?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => RouteStop, (stop) => stop.route, { cascade: true })
  stops: RouteStop[];

//   @OneToMany(() => Schedule, (s) => s.route)
//   schedules: Schedule[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

