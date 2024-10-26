---
title: "NextJS"
description: "This is a test description"
---

We currently support NextJS v14 App Router only. We need open-source contributors to help us write tests and expand support to other versions of NextJS.

## Installation

```bash
pnpm install @letsync/nextjs
```

## Server Setup

You need to expose certain endpoints for Letsync to work. You can refer [Architecture > Server Endpoints](/docs/architecture#server-endpoints) to understand the endpoints and how to expose them.

```ts
// Path: app/api/letsync/[...slug]/route.ts

import { handlers } from "@/lib/letsync.server";

export const { GET, POST } = handlers;
```

<!-- ```ts
// Path: lib/letsync.server.ts

import { LetsyncHandlers } from "@letsync/nextjs";
import { LetsyncServerDb } from "@letsync/*";
import { PubSub_Backend } from "@letsync/*";

const pubsub = PubSub_Backend(/* PubSub Config */);

export const database = LetsyncServerDb(/* Database */);

export const handlers = LetsyncHandlers({
	database,
	pubsub,
	auth() {
		// TODO - AUTHENTICATION & AUTHORIZATION for backend endpoints
		return {
			authorized: true,
			provider: "cookies",
			endpoints: ["vasundhara-aakash"],
		};
	},
});
``` -->

## Client Setup

You need to wrap your application in a `LetsyncProvider` to use the Letsync hooks and components.

The `LetsyncProvider` shall establish connections to both the Client Database and PubSub. During this process, the rendering of your application will be blocked. To improve the user experience, you have the option to provide a fallback UI that will be displayed while the connections are being established. Once the connections are successfully established and the synchronization is complete, your main application content will be rendered.

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

import { LetsyncProvider } from '@letsync/nextjs'
import { LetsyncClientDb } from '@letsync/*' // Replace with the database service you want to use
import { PubSub_Frontend } from '@letsync/*' // Replace with the pubsub service you want to use

export default function Providers({ children }: { children?: React.ReactNode }) {

  const pubsub = PubSub_Frontend(/* PubSub Config */)
  const database = LetsyncClientDb(/* DB Client */)

  return (
    <LetsyncProvider
      pubsub={pubsub}
      database={database}
      fallback={<div>Loading...</div>}
    >
      {children}
    </LetsyncProvider>
  )
}
```

```ts
// Path: lib/letsync.client.ts

'use client'

import { LetsyncProvider } from '@letsync/nextjs'
import { LetsyncClientDb } from '@letsync/*'
import { PubSub_Frontend } from '@letsync/*'

interface LetsyncProviderProps {
  children?: React.ReactNode
  pubsub: Parameters<typeof PubSub_Frontend>[0]
}

export default function LetsyncProvider(props: LetsyncProviderProps) {

  const pubsub = PubSub_Frontend(/* PubSub Config */)
  const database = LetsyncClientDb(/* DB Client */)

  return (
    <LetsyncProvider
      pubsub={pubsub}
      database={database}
      fallback={<div>Loading...</div>}
    >
      {props.children}
    </LetsyncProvider>
  )
}
```

## Usage

Click here to go to the [Usage](/docs/usage) section.
