import { IsString, IsOptional, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRouteStopDto } from './create-route-stop.dto';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsOptional()
  @IsInt()
  distance_km?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRouteStopDto)
  stops?: CreateRouteStopDto[];
}
