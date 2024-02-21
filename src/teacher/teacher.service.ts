import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTeacherDto) {
    return this.prisma.teacher.create({ data });
  }

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(id: number) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
