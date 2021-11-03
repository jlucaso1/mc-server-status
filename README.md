# Minecraft Server Status

A small library for getting the description, player count
and ping of a Minecraft server.

```js
const { getStatus } = require("mc-server-status")

const status = await getStatus("2b2t.org")
console.log(status)
```
