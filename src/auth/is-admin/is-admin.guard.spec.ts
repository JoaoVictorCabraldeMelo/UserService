import { IsAdminGuard } from './is-admin.guard';
import { UserService } from 'src/users/user.service';

describe('IsAdminGuard', () => {
  it('should be defined', () => {
    expect(new IsAdminGuard()).toBeDefined();
  });
});
