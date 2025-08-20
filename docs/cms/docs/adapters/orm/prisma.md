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

4. Write a model with `@@server-model` or `@@client-model` or `@@server-fields-block` or `@@client-fields-block`.

5. Generate your Prisma client:
```bash
bun add @letsync/prisma
bunx letsync-prisma generate
```

> [!WARNING]
> If you are using any other package along-side @letsync/prisma, you may encounter issues. Raise the issue on [Twitter](https://x.com/MrAdityaBorkar) (preferred) or [Discord](https://discord.gg/letsync) and we'll help you out!

## Letsync Options

- `letsync_type` - Choose 'server' or 'local'
- `letsync_common_fields` - Include/exclude common fields
- `letsync_models` - Specify which models to include
- `letsync_optimistic_column_name` - Column name for optimistic locking
- `datasource_provider` - Your database provider (postgresql, mysql, etc.)
- `datasource_url` - Your database connection URL

## Known Limitations

- Any `datasource` blocks shall be ignored. TO BE FIXED.
- Any `generator` blocks in other file than main schema shall be ignored. TO BE FIXED.
- Inline comments in your schema shall be moved to the next line.

