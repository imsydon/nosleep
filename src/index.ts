import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { macAddress } from "../macAddress";
import * as wol from "wake_on_lan";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/invoke", (c) => {
	console.log("invoked!");
	return c.text("invoked!");
});

app.get("/wake", async (c) => {
	// var wol = require("wake_on_lan");

	let res;
	await wol.wake(macAddress, function (error) {
		if (error) {
			res = "error";
		} else {
			res = "wol!";
		}
	});

	return c.text(res ?? "huh");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
