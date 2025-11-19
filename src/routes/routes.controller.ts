import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { RoutesService } from './routes.service';
  import { CreateRouteDto } from './dto/create-route.dto';
  import { CreateRouteStopDto } from './dto/create-route-stop.dto';
  import { UpdateRouteDto } from './dto/update-route.dto';
  import { UpdateRouteStopDto } from './dto/update-route-stop.dto';
  
  @Controller('routes')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  export class RoutesController {
    constructor(private readonly routesService: RoutesService) {}
  
    @Post()
    create(@Body() dto: CreateRouteDto) {
      return this.routesService.createRoute(dto);
    }
  
    @Get()
    findAll() {
      return this.routesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.routesService.findOneWithStops(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRouteDto) {
      return this.routesService.updateRoute(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.routesService.removeRoute(id);
    }
  
    // Stops endpoints
    @Post(':id/stops')
    addStop(@Param('id') id: string, @Body() dto: CreateRouteStopDto) {
      return this.routesService.addStop(id, dto);
    }
  
    @Get(':id/stops')
    listStops(@Param('id') id: string) {
      return this.routesService.listStops(id);
    }
  
    @Patch('stops/:stopId')
    updateStop(@Param('stopId') stopId: string, @Body() dto: UpdateRouteStopDto) {
      return this.routesService.updateStop(stopId, dto);
    }
  
    @Delete('stops/:stopId')
    removeStop(@Param('stopId') stopId: string) {
      return this.routesService.removeStop(stopId);
    }
  }
  