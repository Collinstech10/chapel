import { IsDateString, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  branchId: string;

  @IsString()
  name: string; // Sunday Service, Midweek, Bible Study, Vigil...

  @IsString()
  category: string;

  @IsDateString()
  date: string;
}
