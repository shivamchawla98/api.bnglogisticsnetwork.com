import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '../resolver/user.resolver';
import { UserService } from '../services/user.service';
import { InviteTeamMemberInput } from '../input files/team-member.input';
import { JobRole } from '../../enums/job-profile.enums';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            inviteTeamMember: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should handle inviteUser mutation correctly', async () => {
    const input: InviteTeamMemberInput = {
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      JobRole: JobRole.Founder,
      password: 'Test@1234',
      confirmPassword: 'Test@1234',
      canManageTeam: true,
      location: []
    };

    await resolver.inviteUser(1, input);

    // Log the input that was received
    console.log('Test input:', JSON.stringify(input, null, 2));
  });
});
