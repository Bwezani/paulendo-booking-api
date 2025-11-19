import { IsString, IsInt, IsOptional, IsNumberString } from 'class-validator';

export class CreateRouteStopDto {
  @IsString()
  stopName: string;

  @IsInt()
  stopOrder: number;

  @IsOptional()
  @IsString()
  arrivalTime?: string; // "14:30:00"

  @IsOptional()
  @IsString()
  departureTime?: string; // "14:40:00"

  @IsOptional()
  @IsInt()
  distanceFromStart?: number;
}
