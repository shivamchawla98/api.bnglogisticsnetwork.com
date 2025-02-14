
### 3. `/docs/api/queries.md`

```markdown
// filepath: /Volumes/Shivam/Projects/Exacodel/BNG/bng1/docs/api/queries.md
# GraphQL Queries

## User Queries
```graphql
query Me {
  me {
    id
    email
    firstName
    lastName
    phone
    jobRole {
      id
      name
    }
    company {
      id
      companyName
    }
  }
}

query GetCompany($id: ID!) {
  company(id: $id) {
    id
    companyName
    legalName
    website
    description
    logo
    coverImage
    locations {
      id
      address
    }
    services {
      id
      name
    }
  }
}