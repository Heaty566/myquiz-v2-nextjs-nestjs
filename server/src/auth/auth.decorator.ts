import { SetMetadata } from '@nestjs/common';

//* Internal import
import { UserRole } from './entities/userRole.enum';

export const Roles = (role: UserRole) => SetMetadata('role', role);
