import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/database/prisma.service';
import { checkScheduleDTO } from './dto/check-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}
  hourFormat = 'HH:mm:ss';

  async create(data: CreateScheduleDto) {
    console.log(data);
    return await this.prisma
      .$executeRaw`INSERT into schedule (teacher_id,day_of_week,start_time,end_time,break_time,total_hours)
     values (${data.teacher_id},${data.day_of_week},${data.start_time},${data.end_time},${data.break_time},TIME_FORMAT(TIMEDIFF(end_time,start_time),"%H:%i:%s"));`;
  }

  async checkSchedule(data: checkScheduleDTO) {
    return await this.prisma.schedule.findMany({
      where: {
        teacher_id: data.teacher_id,
        day_of_week: data.day_of_week,
      },
      select: {
        total_hours: true,
      },
    });
  }

  findAll() {
    return `This action returns all schedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
