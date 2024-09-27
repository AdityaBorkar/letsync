---
title: "NextJS"
description: "This is a test description"
---

We currently support NextJS v14 App Router only. We need open-source contributors to help us write tests and expand support to other versions of NextJS.

## Installation

```bash
pnpm install @replocal/nextjs
```

## Server Setup

You need to expose certain endpoints for Replocal to work. You can refer <a href="/docs/architecture#server-endpoints">Architecture > Server Endpoints</a> to understand the endpoints and how to expose them.

```ts
// Path: app/api/replocal/[...slug]/route.ts

import { ReplocalHandlers } from "@replocal/nextjs";
import { database, pubsub } from "@/lib/replocal.server";
import config from "@/lib/replocal.config";

const handlers = ReplocalHandlers({ config, database, pubsub });

export const { GET, POST } = handlers;
```

## Client Setup

You need to wrap your application in a `ReplocalProvider` to use the Replocal hooks and components.

The `ReplocalProvider` shall establish connections to both the Client Database and PubSub. During this process, the rendering of your application will be blocked. To improve the user experience, you have the option to provide a fallback UI that will be displayed while the connections are being established. Once the connections are successfully established and the synchronization is complete, your main application content will be rendered.

```ts
// Path: app/page.ts

import Providers from './Providers'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
        {children}
    </Providers>
  )
}
```

```ts
// Path: app/Providers.ts

'use client'

import { ReplocalProvider } from '@replocal/nextjs'
import { ReplocalClientDb } from '@replocal/*' // Replace with the database service you want to use
import { PubSub_Frontend } from '@replocal/*' // Replace with the pubsub service you want to use

export default function Providers({ children }: { children?: React.ReactNode }) {

  const pubsub = PubSub_Frontend(/* PubSub Config */)
  const database = ReplocalClientDb(/* DB Client */)

  return (
    <ReplocalProvider
      pubsub={pubsub}
      database={database}
      fallback={<div>Loading...</div>}
    >
      {children}
    </ReplocalProvider>
  )
}
```

## Usage

Click here to go to the [Usage](/docs/usage) section.
