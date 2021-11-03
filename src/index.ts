import { Client, PacketWriter, State } from "mcproto";

export interface Status {
  version: {
    name: string;
    protocol: number;
  };
  players: {
    max: number;
    online: number;
  };
  description: string;
  favicon?: string;
}

export interface StatusOptions {
  /** @default 5000 // ms */
  timeout?: number;
  /** @default 736 // 1.16.1 */
  protocol?: number;
}

const defaultOptions: Partial<StatusOptions> = {
  timeout: 5000,
  protocol: 736,
};

export async function getStatus(
  host: string,
  port?: number | null,
  options?: StatusOptions
): Promise<Status> {
  options = { ...defaultOptions, ...options };

  const client = await Client.connect(host, port, {
    connectTimeout: options.timeout,
    timeout: options.timeout,
  });

  client.send(
    new PacketWriter(0x0)
      .writeVarInt(options.protocol!)
      .writeString(host)
      .writeUInt16(client.socket.remotePort!)
      .writeVarInt(State.Status)
  );

  client.send(new PacketWriter(0x0));
  const status: Status = (await client.nextPacket()).readJSON();

  client.end();

  return status;
}
