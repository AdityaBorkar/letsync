"use client";

import React, { useContext } from "react";

import { LetsyncContext } from "./context.js";

export function useLetsync() {
	const { database, pubsub } = useContext(LetsyncContext);
	return { database, pubsub };
}
