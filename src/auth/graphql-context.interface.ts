// src/graphql-context.interface.ts

import { Request } from 'express';

export interface GraphQLContext {
    req: Request;
    
}
