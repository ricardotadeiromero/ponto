import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckDto } from './dto/create-check.dto';
import { UpdateCheckDto } from './dto/update-check.dto';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Post('enter')
  async enter(@Body() createCheckDto: CreateCheckDto) {
    return await this.checkService.enter(createCheckDto);
  }

  @Post('exit')
  exit(@Body() createCheckDto: CreateCheckDto) {
    return this.checkService.enter(createCheckDto);
  }

  @Get()
  findAll() {
    return this.checkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckDto: UpdateCheckDto) {
    return this.checkService.update(+id, updateCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkService.remove(+id);
  }
}
