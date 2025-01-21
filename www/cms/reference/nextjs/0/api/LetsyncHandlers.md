---
index: 0
title: LetsyncHandlers
description: NONE
---
<a name="LetsyncHandlers"></a>

## LetsyncHandlers(props) ⇒ <code>Object</code>
Creates handlers for HTTP methods (GET, POST, DELETE) with authentication and routing.

**Kind**: global function  
**Returns**: <code>Object</code> - An object containing async functions for handling GET, POST, and DELETE requests.  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | The properties for the handlers. |
| props.db | <code>ServerDB.Adapter.&lt;unknown&gt;</code> | The database instance. |
| props.fs | <code>ServerFS.Adapter.&lt;unknown&gt;</code> | The filesystem instance. |
| props.pubsub | <code>ServerPubsub.Adapter</code> | The pub/sub backend instance. |
| props.auth | <code>function</code> | The authentication function that returns user and device IDs or an error message with a status code. |

