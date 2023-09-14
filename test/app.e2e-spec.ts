import { addWaitHandler } from 'pactum/src/exports/handler';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

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

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Register', () => {
      it.todo('should register');
    });
    describe('Login', () => {});
  });

  describe('User', () => {
    describe('Get user', () => {});
    describe('Edit user', () => {});
    describe('Delete user', () => {});
  });

  describe('Bookmarks', () => {
    describe('Register Podcast', () => {});
    describe('Get podcast by id', () => {});
    describe('Edit podcast by id', () => {});
    describe('Delete podcast by id', () => {});
  });
});
