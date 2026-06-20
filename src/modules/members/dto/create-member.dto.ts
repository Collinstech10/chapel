import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateMemberDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  matricNumber?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsString()
  branchId: string;
}
