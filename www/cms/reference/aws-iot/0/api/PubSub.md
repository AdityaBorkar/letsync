---
index: 0
title: PubSub
description: NONE
---
<a name="PubSub"></a>

## PubSub(props) ⇒
Creates an AWS IoT PubSub frontend instance that connects to AWS IoT Core MQTT broker.
Can be initialized either with an existing MQTT client or with AWS IoT endpoint details.

**Kind**: global function  
**Returns**: A PubSub frontend instance for real-time messaging  

| Param | Description |
| --- | --- |
| props | Configuration options |
| props.client | Optional existing MQTT client instance to use |
| props.authorizer | Name of the AWS IoT custom authorizer (required if client not provided) |
| props.endpoint | AWS IoT endpoint URL (required if client not provided) |
| props.prefix | Topic prefix for MQTT topics |

