---
index: 0
title: PubSubAuthorizer
description: NONE
---
<a name="PubSubAuthorizer"></a>

## PubSubAuthorizer(props) ⇒ <code>function</code>
Creates an authorizer function for AWS IoT PubSub

**Kind**: global function  
**Returns**: <code>function</code> - Async function that validates tokens and returns allowed publish/subscribe topics  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Configuration properties |
| props.secret | <code>string</code> | Secret key used to verify JWT tokens |
| props.prefix | <code>string</code> | Topic prefix for MQTT topics |

