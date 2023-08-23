import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRouteDto: CreateRouteDto) {
    return this.prismaService.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          lat: Math.random() * -100,
          lng: Math.random() * 100,
        },
        destination: {
          lat: Math.random() * -100,
          lng: Math.random() * 100,
        },
      },
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }
}
