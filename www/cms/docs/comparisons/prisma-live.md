---
index: 1
group: "comparisons"
title: "Prisma Live"
description: "This is a test description"
---

## What is Letsync?

TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze.

## Why Letsync?

Letsync is a tool that allows you to replicate your Replicate API locally.

## Package Design

We have designed the package functions to be separate for server-side and client-side to easily understand the server-side and client-side code. This does mean we have to write slightly more code, but we believe this is a small price to pay for the ease of understanding.

## Limitations

- We support connecting to a single database right now. In the future, we will support connecting to multiple server databases (of multiple types) to multiple client databases (of multiple types). This means, it might limit your ability to develop complex applications right now.
- We create separate databases (and separate devices) for each user / organization. This means, the client shall occupy a lot of space if more than one user logs in using the same client.
- Once published schemas go live to all devices, you cannot downgrade the schema version. This means, if you make a mistake, you cannot rollback, instead you have to improve and publish a new schema version.
- We are using JWT for authentication and authorization. This means, the JWT must be stored in a secure manner.
- Sync starts from the starting zero point. The entire data is fetched.
- Sync ends at the latest timestamp of the client and server.
-
