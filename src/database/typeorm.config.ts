// src/database/typeorm.config.ts
import { DataSourceOptions } from 'typeorm';
// import { User } from '../entities/user.entity';
// import { BusCompany } from '../entities/bus-company.entity';
// import { Bus } from '../entities/bus.entity';
import { Route } from '../entities/route.entity';
// import { Schedule } from '../entities/schedule.entity';
// import { Booking } from '../entities/booking.entity';

const isProd = process.env.NODE_ENV === 'production';

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: !isProd, // dev: true to auto-create tables; prod: use migrations
  logging: false,
  entities: [
    // User, 
    // BusCompany, 
    // Bus, 
    Route, 
    // Schedule, 
    // Booking

  ],
  // You can set extra TLS options for production if required
};

export default typeOrmConfig;
