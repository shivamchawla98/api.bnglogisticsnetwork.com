"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express = require("express");
let app;
async function bootstrapServer() {
    if (!app) {
        console.log('Initializing NestJS application...');
        const expressApp = express();
        const adapter = new platform_express_1.ExpressAdapter(expressApp);
        try {
            app = await core_1.NestFactory.create(app_module_1.AppModule, adapter, {
                logger: ['error', 'warn', 'debug', 'log'],
            });
            app.enableCors({
                origin: '*',
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
                optionsSuccessStatus: 204,
                credentials: true,
            });
            await app.init();
            console.log('NestJS application initialized successfully');
        }
        catch (error) {
            console.error('Error initializing NestJS application:', error);
            throw error;
        }
    }
}
const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        if (!app) {
            await bootstrapServer();
        }
        event.rawPath = event.rawPath.replace(/^\/Prod/, '');
        const expressApp = app.getHttpAdapter().getInstance();
        return await new Promise((resolve) => {
            const req = {
                method: event.requestContext.http.method,
                url: event.rawPath +
                    (event.rawQueryString ? `?${event.rawQueryString}` : ''),
                headers: event.headers,
                body: event.body ? JSON.parse(event.body) : {},
                query: event.queryStringParameters || {},
                params: event.pathParameters || {},
                rawBody: event.body || '',
                get: function (header) {
                    return this.headers[header];
                },
                pipe: function (destination) {
                    if (this.body) {
                        const buffer = Buffer.from(this.body);
                        destination.write(buffer);
                        destination.end();
                    }
                    else {
                        destination.end();
                    }
                    return destination;
                },
                unpipe: function () {
                    return this;
                },
                on: function (event, handler) {
                    if (event === 'data' && this.body) {
                        process.nextTick(() => {
                            const data = typeof this.body === 'string' ? this.body : JSON.stringify(this.body);
                            handler(Buffer.from(data));
                        });
                    }
                    else if (event === 'end') {
                        process.nextTick(() => {
                            handler();
                        });
                    }
                    return this;
                },
                readable: true,
                readableFlowing: null,
            };
            let responseBody = '';
            let statusCode = 200;
            let responseHeaders = {};
            const res = {
                headersSent: false,
                statusCode,
                locals: {},
                status(code) {
                    this.statusCode = code;
                    return this;
                },
                setHeader(header, value) {
                    responseHeaders[header] = value;
                    return this;
                },
                set(header, value) {
                    if (typeof header === 'object') {
                        responseHeaders = { ...responseHeaders, ...header };
                    }
                    else {
                        responseHeaders[header] = value;
                    }
                    return this;
                },
                getHeader(header) {
                    return responseHeaders[header];
                },
                removeHeader(header) {
                    delete responseHeaders[header];
                    return this;
                },
                get(header) {
                    return this.getHeader(header);
                },
                getHeaders() {
                    return responseHeaders;
                },
                end(data) {
                    if (data)
                        this.send(data);
                    else
                        this.send('');
                },
                writeHead(status, headers) {
                    this.status(status);
                    this.set(headers);
                    return this;
                },
                send(body) {
                    if (this.headersSent)
                        return;
                    this.headersSent = true;
                    responseBody = body;
                    resolve({
                        statusCode: this.statusCode,
                        headers: {
                            'Content-Type': 'application/json',
                            ...responseHeaders,
                        },
                        body: typeof body === 'string' ? body : JSON.stringify(body),
                    });
                },
                json(body) {
                    this.set('Content-Type', 'application/json');
                    this.send(body);
                },
            };
            expressApp(req, res, (err) => {
                if (err) {
                    console.error('Express middleware error:', err);
                    if (!res.headersSent) {
                        resolve({
                            statusCode: 500,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ error: 'Internal Server Error' }),
                        });
                    }
                }
            });
        });
    }
    catch (error) {
        console.error('Handler error:', error);
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map