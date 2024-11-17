---
title: "NextJS"
description: "This is a test description"
---

We currently support App Router only. We need open-source contributors to help us write tests and expand support to other versions of NextJS.

## Installation

```bash
bun add @letsync/nextjs
```

## Server Setup

You need to expose certain endpoints for Letsync to work. You can refer [Architecture > Server Endpoints](/docs/architecture#server-endpoints) to understand the endpoints and how to expose them.

```ts
// Path: app/api/letsync/[...slug]/route.ts

import { handlers } from "@/lib/letsync.server";

export const { GET, POST } = handlers;
```

```ts
// Path: lib/letsync.server.ts

import { LetsyncHandlers } from "@letsync/nextjs";
import { LetsyncServerDB } from "@letsync/*";
import { LetsyncServerFS } from "@letsync/*";
import { PubSub_Backend } from "@letsync/*";

const pubsub = PubSub_Backend(/* PubSub Config */);

export const database = LetsyncServerDB(/* Database */);

export const filesystem = LetsyncServerFS(/* Filesystem */);

export function auth() {
  // TODO - AUTHENTICATION & AUTHORIZATION for backend endpoints
  return {
    authorized: true,
    provider: "cookies",
    endpoints: ["vasundhara-aakash"],
  };
}

export const handlers = LetsyncHandlers({
  db: database,
  fs: filesystem,
  pubsub,
  auth,
});
```

## Client Setup

You need to wrap your application in a `LetsyncProvider` to use the Letsync hooks and components.

The `LetsyncProvider` shall establish connections to both the Client Database and PubSub. During this process, the rendering of your application will be blocked. To improve the user experience, you have the option to provide a fallback UI that will be displayed while the connections are being established. Once the connections are successfully established and the synchronization is complete, your main application content will be rendered.

```ts
// Path: app/page.ts

import { LetsyncProvider } from '@/lib/letsync.client';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LetsyncProvider>
        {children}
    </LetsyncProvider>
  )
}
```

```ts
// Path: lib/letsync.client.ts

'use client'

import { LetsyncProvider } from '@letsync/nextjs'
import { LetsyncClientDB } from '@letsync/*'
import { LetsyncClientFS } from '@letsync/*'
import { PubSub_Frontend } from '@letsync/*'

interface LetsyncProviderProps {
  children?: React.ReactNode
  pubsub: Parameters<typeof PubSub_Frontend>[0]
}

export default function LetsyncProvider(props: LetsyncProviderProps) {
  const pubsub = PubSub_Frontend(/* PubSub Config */);
  const database = LetsyncClientDB(/* DB Client */);
  const filesystem = LetsyncClientFS(/* Filesystem Client */);

  return (
    <LetsyncProvider
      db={database}
      fs={filesystem}
      pubsub={pubsub}
      fallback={<div>Loading...</div>}
    >
      {props.children}
    </LetsyncProvider>
  )
}
```

## Usage

Click here to go to the [Usage](/docs/usage) section.
