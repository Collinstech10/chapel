import { IsString } from 'class-validator';

export class ScanAttendanceDto {
  @IsString()
  qrCode: string; // scanned from the member's digital ID card

  @IsString()
  serviceId: string;
}
