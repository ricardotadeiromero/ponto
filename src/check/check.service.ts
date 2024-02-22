import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ScheduleService } from 'src/schedule/schedule.service';
import { addHours, format } from 'date-fns';
import { Console } from 'console';
import { parse } from 'path';

@Injectable()
export class CheckService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scheduleService: ScheduleService,
  ) {}

  async exit(data: CreateCheckDto) {
    return await this.prisma.check_records.create({
      data: {
        teacher_id: data.teacher_id,
        schedule: new Date(),
        enter: 1,
      },
    });
  }

  async enter(data: CreateCheckDto) {
    const haveEnter = await this.haveEnter(data.teacher_id);
    if (haveEnter) {
      const [totalHours] = await this.scheduleService.checkSchedule({
        teacher_id: data.teacher_id,
        day_of_week: new Date().getDay(),
      });
      console.log(new Date().getDay());
      if (!totalHours) {
        throw new NotFoundException('Horário não encontrado');
      }
      await this.prisma
        .$executeRaw`INSERT into check_records (teacher_id, schedule, enter) VALUES (${data.teacher_id}, NOW(),0)`;
      const results = await this.prisma.$queryRaw`
        SELECT 
          e.teacher_id,
          TIME_FORMAT(TIMEDIFF(l.schedule, e.schedule), '%H:%i:%s') AS work_hours,
          TIME_FORMAT(TIMEDIFF(TIME_FORMAT(TIMEDIFF(l.schedule, e.schedule), '%H:%i:%s'),${totalHours['total_hours']}), '%H:%i:%s') as time_difference
        FROM check_records e
        JOIN check_records l ON e.teacher_id = l.teacher_id
        WHERE e.teacher_id = ${data.teacher_id}
          AND DATE(e.schedule) = CURDATE()
          AND DATE(l.schedule) = CURDATE()
          AND e.enter = 1
          AND l.enter = 0
        HAVING work_hours > ${totalHours['total_hours']};
      `;
      console.log('result', results);
      if (results) {
      
      }
      return;
    }
    return await this.prisma
      .$executeRaw`INSERT into check_records (teacher_id, schedule, enter) VALUES (${data.teacher_id}, NOW(),1 )`;
  }

  async haveEnter(id: number): Promise<boolean> {
    const check = await this.prisma.check_records.findMany({
      where: {
        teacher_id: id,
        schedule: {
          gte: new Date(new Date().setHours(-3, 0, 0, 0)),
        },
        enter: 1,
      },
    });
    return check.length > 0;
  }

  create(createCheckDto: CreateCheckDto) {
    return 'This action adds a new check';
  }

  findAll() {
    return `This action returns all check`;
  }

  findOne(id: number) {
    return `This action returns a #${id} check`;
  }

  update(id: number, updateCheckDto: UpdateCheckDto) {
    return `This action updates a #${id} check`;
  }

  remove(id: number) {
    return `This action removes a #${id} check`;
  }
}
