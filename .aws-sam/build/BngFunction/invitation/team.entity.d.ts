import { User } from '../PersonalProfile/entity/profile.entity';
export declare class Team {
    id: number;
    name: string;
    owner: User;
    ownerId: number;
    createdAt: Date;
    updatedAt: Date;
}
