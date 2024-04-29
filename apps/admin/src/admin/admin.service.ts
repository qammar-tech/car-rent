import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { email } });
  }

  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findById(id);
  }

  async findByUuid(uuid: string): Promise<Admin> {
    return this.adminRepository.findOne({ where: { uuid } });
  }

  async setPassword(email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    await this.adminRepository.update({ email }, { password: passwordHash });
  }

  async seed() {
    const adminExists = await this.adminRepository.findOne({
      where: { email: 'super@admin.com' },
    });

    if (!adminExists) {
      const passwordHash = await bcrypt.hash('test', 10);
      await this.adminRepository.save({
        email: 'super@admin.com',
        name: 'Super Admin',
        password: passwordHash,
      });
    }
  }
}
