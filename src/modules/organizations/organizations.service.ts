import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

// Default roles + permission matrix seeded for every new organization,
// mirroring the 7 roles in the blueprint (Super Admin -> Member).
const DEFAULT_ROLES = [
  'SUPER_ADMIN',
  'CHAPEL_ADMIN',
  'PASTOR',
  'MINISTER',
  'DEPARTMENT_LEADER',
  'WORKER',
  'MEMBER',
] as const;

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrganizationDto) {
    return this.prisma.organization.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        roles: {
          create: DEFAULT_ROLES.map((name) => ({ name })),
        },
        branches: {
          create: [{ name: 'Headquarters', isHeadquarters: true }],
        },
      },
      include: { roles: true, branches: true },
    });
  }

  findAll() {
    return this.prisma.organization.findMany({ include: { branches: true } });
  }

  // TODO Phase 5 (multi-branch): createBranch(), listBranchAnalytics(),
  // assignBranchAdmin()
}
