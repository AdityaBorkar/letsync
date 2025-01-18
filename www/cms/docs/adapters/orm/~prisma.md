---
index: 1
group: "adapters/orm"
title: "Prisma"
description: "This is a test description"
---

The Prisma adapter for Letsync works seamlessly with your existing Prisma setup. No complex configuration needed! 🚀

## Quick Setup

1. First, add this line to your `.gitignore`:
```
.letsync-orm
```

2. Update your Prisma generator config. The generator name should match your Letsync database name. Available [Letsync options](/ref/config/latest/config-options):

```prisma
generator your_db_name {
    // Required: Choose 'server' or 'local'
    letsync_type = "server"
    
    // Optional: Include/exclude common fields
    // Default: "include" for server, "exclude" for local
    letsync_common_fields = "include"
    
    // Optional: Specify which models to include
    // Default: All models in the schema
    letsync_models = ["User", "Post"]
    
    // Optional: Column name for optimistic locking
    // Default: "$optimistic"
    // NOTE - This is NOT supported for server databases.
    letsync_optimistic_column_name = "version"
}
```

3. Move your database connection details from the `datasource` block to your generator:
```prisma
generator your_db_name {
    // [Existing Fields From Above]
    // ...
    // ...
    // ...
    // ...

    // Your database provider (postgresql, mysql, etc.)
    datasource_provider = "postgresql"
    
    // Your database connection URL
    datasource_url = "postgresql://user:password@localhost:5432/mydb"
}
```

4. Generate your Prisma client:
```bash
bun add @letsync/prisma
bunx letsync-prisma generate
```

## What's Happening Behind the Scenes?

When you run `letsync-prisma generate`, the CLI:
- Creates a customized Prisma Client with your Letsync settings
- Generates the necessary schema files
- Sets up everything you need for Letsync integration

## Known Limitations

- Any `generator` blocks in other file than main schema will be ignored
- Any `datasource` blocks will be ignored
- Inline comments in your schema will be moved to their own lines
- If you hit any errors, check if they're coming from Letsync or Prisma (this helps us fix bugs faster!)
