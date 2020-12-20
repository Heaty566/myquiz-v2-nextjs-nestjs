import { UserRole } from './entities/userRole.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (role: UserRole) => SetMetadata('role', role);
