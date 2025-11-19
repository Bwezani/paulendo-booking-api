import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { Route } from './route.entity';

@Entity('route_stops')
export class RouteStop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Route, (r) => r.stops, { onDelete: 'CASCADE' })
  route: Route;

  @Column()
  stopName: string; // e.g. "Petauke"

  @Column('int')
  stopOrder: number; // 1,2,3,...

  @Column({ type: 'time', nullable: true })
  arrivalTime?: string;

  @Column({ type: 'time', nullable: true })
  departureTime?: string;

  @Column({ type: 'int', nullable: true })
  distanceFromStart?: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
