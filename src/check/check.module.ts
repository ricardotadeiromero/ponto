import { Module } from '@nestjs/common';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ScheduleModule } from 'src/schedule/schedule.module';
import { ScheduleService } from 'src/schedule/schedule.service';

@Module({
  controllers: [CheckController],
  providers: [CheckService,PrismaService,ScheduleService],
})
export class CheckModule {}
