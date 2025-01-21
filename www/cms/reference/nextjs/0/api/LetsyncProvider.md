---
index: 0
title: LetsyncProvider
description: NONE
---
<a name="LetsyncProvider"></a>

## LetsyncProvider(props) ⇒
Provider component that initializes the Letsync client and makes it available to child components.

**Kind**: global function  
**Returns**: A React component that provides Letsync context to its children  

| Param | Description |
| --- | --- |
| props | The component props |

**Example**  
```tsx
<LetsyncProvider
  database={myDatabase}
  pubsub={myPubSub}
  fallback={<LoadingSpinner />}
>
  <App />
</LetsyncProvider>
```
