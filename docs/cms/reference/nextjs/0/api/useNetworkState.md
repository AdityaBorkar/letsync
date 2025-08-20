---
index: 0
title: useNetworkState
description: NONE
---
<a name="useNetworkState"></a>

## useNetworkState() ⇒ <code>Object</code>
A React hook that provides access to the Letsync network state.

**Kind**: global function  
**Returns**: <code>Object</code> - An object containing:
  - database: The Letsync database instance
  - pubsub: The publish/subscribe messaging system instance  
**Example**  
```tsx
function MyComponent() {
  const { database, pubsub } = useNetworkState();

  // Use database or pubsub
  return <div>...</div>;
}
```
