import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { LoginUserDto, RegisterUserDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreatePodcastDto } from '../src/podcast/dto';

describe('app-e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const registerDto: RegisterUserDto = {
      username: 'user1',
      email: 'user1@email.com',
      password: 'user1',
    };

    const loginDto: LoginUserDto = {
      email: 'user1@email.com',
      password: 'user1',
    };

    describe('Register', () => {
      it('should register user', () => {
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(registerDto)
          .expectStatus(201);
      });
      it('should throw if no username', () => {
        const { username, ...rest } = registerDto;

        return pactum
          .spec()
          .post('/auth/register')
          .withBody(rest)
          .expectStatus(400);
      });
      it('should throw if no email', () => {
        const { email, ...rest } = registerDto;
        return pactum
          .spec()
          .post('/auth/register')
          .withBody(rest)
          .expectStatus(400);
      });
      it('should throw if no password', () => {
        const { password, ...rest } = registerDto;

        return pactum
          .spec()
          .post('/auth/register')
          .withBody(rest)
          .expectStatus(400);
      });
      it('should throw if no username or email or password', () => {
        return pactum.spec().post('/auth/register').expectStatus(400);
      });
    });

    describe('Login', () => {
      it('should throw if no email', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(loginDto.password)
          .expectStatus(400);
      });
      it('should throw if no password', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(loginDto.email)
          .expectStatus(400);
      });
      it('should throw if no email or password', () => {
        return pactum.spec().post('/auth/login').expectStatus(400);
      });
      it('should login user', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(loginDto)
          .expectStatus(200)
          .stores('Token', 'accessToken');
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('Should get current user', () => {
        return pactum
          .spec()
          .get('/users/home')
          .withBearerToken('$S{Token}')
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          email: 'newEmail@email.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withBearerToken('$S{Token}')
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Podcasts', () => {
    describe('Get Podcasts when no podcasts added', () => {
      it('Should get empty list of podcasts', () => {
        return pactum
          .spec()
          .get('/podcasts')
          .withBearerToken('$S{Token}')
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Register Podcast', () => {
      it('Should register a new podcast', () => {
        const dto: CreatePodcastDto = {
          rssFeedUrl: 'www.rssfeed.com/feed/asfasdf;lkjasdf',
        };
        return pactum
          .spec()
          .post('/podcasts')
          .withBearerToken('${Token}')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Get podcast by id', () => {});
    describe('Edit podcast by id', () => {});
    describe('Delete podcast by id', () => {});
  });
});
