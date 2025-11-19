import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from '../entities/route.entity';
import { RouteStop } from '../entities/route-stop.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { UpdateRouteStopDto } from './dto/update-route-stop.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routeRepo: Repository<Route>,
    @InjectRepository(RouteStop)
    private stopRepo: Repository<RouteStop>,
  ) {}

  // Create a route (optionally with stops)
  async createRoute(dto: CreateRouteDto): Promise<Route> {
    const route = this.routeRepo.create({
      name: dto.name,
      origin: dto.origin,
      destination: dto.destination,
      distance_km: dto.distance_km,
      description: dto.description,
    });

    if (dto.stops && dto.stops.length) {
      route.stops = dto.stops.map((s) =>
        this.stopRepo.create({
          stopName: s.stopName,
          stopOrder: s.stopOrder,
          arrivalTime: s.arrivalTime,
          departureTime: s.departureTime,
          distanceFromStart: s.distanceFromStart,
        }),
      );
    }

    return this.routeRepo.save(route);
  }

  // Get all routes (no stops)
  async findAll(): Promise<Route[]> {
    return this.routeRepo.find();
  }

  // Get route with stops ordered
  async findOneWithStops(id: string): Promise<Route> {
    const route = await this.routeRepo.findOne({
      where: { id },
      relations: ['stops'],
      order: { stops: { stopOrder: 'ASC' } },
    });

    if (!route) throw new NotFoundException('Route not found');
    // ensure stops sorted client-side if needed
    route.stops = route.stops.sort((a, b) => a.stopOrder - b.stopOrder);
    return route;
  }

  async updateRoute(id: string, dto: UpdateRouteDto): Promise<Route> {
    const route = await this.routeRepo.preload({ id, ...dto });
    if (!route) throw new NotFoundException('Route not found');
    return this.routeRepo.save(route);
  }

  async removeRoute(id: string): Promise<void> {
    const res = await this.routeRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Route not found');
  }

  // Stops
  async addStop(routeId: string, dto: CreateRouteStopDto): Promise<RouteStop> {
    const route = await this.routeRepo.findOne({ where: { id: routeId } });
    if (!route) throw new NotFoundException('Route not found');

    const stop = this.stopRepo.create({
      route,
      stopName: dto.stopName,
      stopOrder: dto.stopOrder,
      arrivalTime: dto.arrivalTime,
      departureTime: dto.departureTime,
      distanceFromStart: dto.distanceFromStart,
    });

    return this.stopRepo.save(stop);
  }

  async updateStop(stopId: string, dto: UpdateRouteStopDto): Promise<RouteStop> {
    const stop = await this.stopRepo.preload({ id: stopId, ...dto });
    if (!stop) throw new NotFoundException('Stop not found');
    return this.stopRepo.save(stop);
  }

  async removeStop(stopId: string): Promise<void> {
    const res = await this.stopRepo.delete(stopId);
    if (res.affected === 0) throw new NotFoundException('Stop not found');
  }

  // List stops for a route
  async listStops(routeId: string): Promise<RouteStop[]> {
    const stops = await this.stopRepo.find({
      where: { route: { id: routeId } } as any,
      order: { stopOrder: 'ASC' },
    });
    return stops;
  }
}
