import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { DirectionsService } from '../maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private prismaService: PrismaService,
    private directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { routes } = await this.directionsService.getDirections(
      createRouteDto.source_id,
      createRouteDto.destination_id,
    );

    const legs = routes[0].legs[0];
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          lat: legs.start_location.lat,
          lng: legs.start_location.lng,
        },
        destination: {
          lat: legs.end_location.lat,
          lng: legs.end_location.lng,
        },
      },
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }
}
