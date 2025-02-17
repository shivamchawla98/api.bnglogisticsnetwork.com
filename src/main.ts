import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    });
    
    const configService = app.get(ConfigService);
    
    // Debug logging
    console.log('Environment Variables:');
    console.log('PORT:', configService.get('port'));
    console.log('DB_HOST:', configService.get('database.host'));
    console.log('FRONTEND_URL:', configService.get('frontend.url'));
    
    // Enable CORS with specific origin
    app.enableCors({
      origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    });

    // Add global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        disableErrorMessages: false,
        exceptionFactory: (errors) => {
          console.log('Validation errors:', JSON.stringify(errors, null, 2));
          return errors;
        },
      }),
    );

    // Add cookie parser
    app.use(cookieParser());

    // Configure body parser limits
    // app.use(express.json({ limit: '50mb' }));
    // app.use(express.urlencoded({ limit: '50mb', extended: true }));

    const pgSessionStore = pgSession(session);

    // Configure session middleware
    app.use(
      session({
        store: new pgSessionStore({
          conObject: {
            ...configService.get('database'),
          },
        }),
        secret: configService.get('jwt.secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 24 hours
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        },
        name: 'bng.sid',
      }),
    );

    const port = configService.get('port');
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
    console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}

// Add global error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();
