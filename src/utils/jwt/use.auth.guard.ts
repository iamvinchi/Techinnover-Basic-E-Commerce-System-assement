// swagger.decorator.ts
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth.guard';
import { Role } from '../roles/roles.enum';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';


export function UseAuthGuard(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('isPublic', true),
    Roles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }), 
  );
}
