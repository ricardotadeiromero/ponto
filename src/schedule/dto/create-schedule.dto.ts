export class CreateScheduleDto {
    teacher_id: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
    break_time: string;
}
