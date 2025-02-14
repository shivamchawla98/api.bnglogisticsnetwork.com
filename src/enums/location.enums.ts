import { RESOLVER_TYPE_METADATA, registerEnumType } from '@nestjs/graphql';

export enum location{
    Chandigarh_India = 'Chandigarh_India',
    Chennai_India = 'Chennai_India',
    Dehradun_India = 'Dehradun_India',
    Kochin_India = 'Kochin_India',
    Mumbai_India = 'Mumbai_India',
    Noida_India = 'Noida,India'
}

registerEnumType(location,{
    name:"location",
    description:"Location of member"
})