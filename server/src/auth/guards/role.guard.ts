
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from '../emuns/role.enum';
import RequestWithUser from '../requestWithUser';



 
const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user?.role.includes(role);
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;



// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";
// import { ROLES_KEY } from "../decorators/roles.decorator";
// import { Role } from "../emuns/role.enum";
// import RequestWithUser from '../../../dist/auth/requestWithUser';
// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     console.log(requiredRoles)
//     const { user } = context.switchToHttp().getRequest();
//     console.log(user)
//     return user?.role.includes(requiredRoles);
//     // return requiredRoles.some((role) => user.role?.includes(role));
//   }
// }