declare const _default: () => {
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
    };
    session: {
        secret: string;
        expiresIn: number;
    };
    frontend: {
        url: string;
    };
};
export default _default;
