---
index: 4
group: "Getting Started"
title: "Usage (Commercial)"
description: "This is a test description"
# pubDate: "2024-01-01"
# updatedDate: "2024-01-01"
---

We currently support NextJS v14 App Router only. We need open-source contributors to help us write tests and expand support to other versions of NextJS.

## Installation

```bash
pnpm install @letsync/nextjs
```

## Server Setup

You need to expose certain endpoints for Letsync to work. You can refer [Architecture > Server Endpoints](/docs/architecture#server-endpoints) to understand the endpoints and how to expose them.

<!-- ```ts
// Path: app/api/letsync/[...slug]/route.ts

import { LetsyncHandlers } from "@letsync/nextjs";
import Letsync from "@letsync/letsync/server";

const letsync = Letsync();

const handlers = LetsyncHandlers({
	...letsync,
	auth() {
		// TODO - AUTHENTICATION & AUTHORIZATION for backend endpoints
		return {
			authorized: true,
			provider: "cookies",
			endpoints: ["vasundhara-aakash"],
		};
	},
});

export const { GET, POST } = handlers;
``` -->

## Client Setup

You need to wrap your application in a `LetsyncProvider` to use the Letsync hooks and components.

The `LetsyncProvider` shall establish connections to both the Client Database and PubSub. During this process, the rendering of your application will be blocked. To improve the user experience, you have the option to provide a fallback UI that will be displayed while the connections are being established. Once the connections are successfully established and the synchronization is complete, your main application content will be rendered.

```ts
// Path: app/layout.tsx

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
// Path: app/Providers.tsx

'use client'

import { LetsyncProvider } from '@letsync/nextjs'
import Letsync from '@letsync/letsync/client'

export default function Providers({ children }: { children: React.ReactNode }) {
  const letsync = Letsync()
  return (
    <LetsyncProvider
      {...letsync}
      fallback={<div>Loading...</div>}
    >
      {children}
    </LetsyncProvider>
  )
}
```
