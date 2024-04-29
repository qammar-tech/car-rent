import { Injectable } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class AdminSeederService {
  constructor(private readonly adminService: AdminService) {}

  async seed() {
    await this.adminService.seed();
  }
}
