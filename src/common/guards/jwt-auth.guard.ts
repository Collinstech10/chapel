import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Validates the JWT and attaches the decoded user (with branchId + roles)
// to request.user. See modules/auth/strategies/jwt.strategy.ts.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
