"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const session = require("express-session");
const pgSession = require("connect-pg-simple");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: ['error', 'warn', 'debug', 'log', 'verbose'],
        });
        const configService = app.get(config_1.ConfigService);
        console.log('Environment Variables:');
        console.log('PORT:', configService.get('port'));
        console.log('DB_HOST:', configService.get('database.host'));
        console.log('FRONTEND_URL:', configService.get('frontend.url'));
        app.enableCors({
            origin: configService.get('FRONTEND_URL') || 'http://localhost:3000',
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
            preflightContinue: false,
            optionsSuccessStatus: 204,
        });
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
            disableErrorMessages: false,
            exceptionFactory: (errors) => {
                console.log('Validation errors:', JSON.stringify(errors, null, 2));
                return errors;
            },
        }));
        app.use(cookieParser());
        const pgSessionStore = pgSession(session);
        app.use(session({
            store: new pgSessionStore({
                conObject: {
                    ...configService.get('database'),
                },
            }),
            secret: configService.get('jwt.secret'),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            },
            name: 'bng.sid',
        }));
        const port = configService.get('port');
        await app.listen(port);
        console.log(`Application is running on: http://localhost:${port}`);
        console.log(`GraphQL Playground: http://localhost:${port}/graphql`);
    }
    catch (error) {
        console.error('Error starting the application:', error);
        process.exit(1);
    }
}
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
bootstrap();
//# sourceMappingURL=main.js.map