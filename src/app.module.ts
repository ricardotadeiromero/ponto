import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CheckModule } from './check/check.module';

@Module({
  imports: [TeacherModule, ScheduleModule, CheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
