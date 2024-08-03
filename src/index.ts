import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { macAddress } from "../macAddress";

const app = new Hono();

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get("/invoke", (c) => {
	console.log("invoked!");
	return c.text("invoked!");
});

app.get("/wake", (c) => {
	var wol = require("wake_on_lan");

	wol.wake(macAddress, function (error) {
		if (error) {
			return c.text("error");
		} else {
			return c.text("wol!");
		}
	});

	return c.text("huh");
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
