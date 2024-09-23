"use client";

import React, { useContext } from "react";

import { ReplocalContext } from "./provider.js";

export function useReplocal() {
	const { database, pubsub } = useContext(ReplocalContext);
	return { database, pubsub };
}
