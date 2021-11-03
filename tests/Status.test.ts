import { strict as assert } from "assert";
import { getStatus } from "../src/index";

describe("MC Status", () => {
  it("should check hypixel server status", async () => {
    const status = await getStatus("mc.hypixel.net");
    assert.ok(status);
  });
});
