import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// The full permission key list — grows as each phase's modules are built.
// Format: "<module>:<action>"
const PERMISSIONS = [
  'organizations:read', 'organizations:write',
  'members:read', 'members:write',
  'attendance:read', 'attendance:write',
  'events:read', 'events:write',
  'communication:write',
  'finance:read', 'finance:write',
  // Phase 2+: 'departments:*', 'discipleship:*', 'workers:*',
  // 'prayer:*', 'counseling:*', 'sermons:*',
  // Phase 3+: 'expenses:*', 'assets:*',
  // Phase 4+: 'reports:read', 'certificates:write',
];

// Default permission grants per role. SUPER_ADMIN gets everything;
// others are scoped per the blueprint's role-capability tables.
const ROLE_PERMISSIONS: Record<string, string[]> = {
  SUPER_ADMIN: PERMISSIONS,
  CHAPEL_ADMIN: [
    'members:read', 'members:write',
    'attendance:read', 'attendance:write',
    'events:read', 'events:write',
    'communication:write',
    'finance:read', 'finance:write',
  ],
  PASTOR: ['members:read', 'attendance:read', 'events:read'],
  MINISTER: ['members:read', 'attendance:read'],
  DEPARTMENT_LEADER: ['members:read', 'attendance:read'],
  WORKER: ['attendance:write'],
  MEMBER: [],
};

async function main() {
  for (const key of PERMISSIONS) {
    await prisma.permission.upsert({ where: { key }, update: {}, create: { key } });
  }

  const org = await prisma.organization.upsert({
    where: { slug: 'demo-chapel' },
    update: {},
    create: {
      name: 'Demo Chapel',
      slug: 'demo-chapel',
      branches: { create: [{ name: 'Headquarters', isHeadquarters: true }] },
    },
  });

  for (const [roleName, permissionKeys] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await prisma.role.upsert({
      where: { organizationId_name: { organizationId: org.id, name: roleName } },
      update: {},
      create: { organizationId: org.id, name: roleName },
    });

    for (const key of permissionKeys) {
      const permission = await prisma.permission.findUnique({ where: { key } });
      if (!permission) continue;
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id },
      });
    }
  }

  console.log('Seed complete: demo-chapel organization + roles + permissions');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
