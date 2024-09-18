"use client";

import React, { useContext } from "react";

import { ReplocalContext } from "./provider.js";

export function useReplocal() {
	const { db } = useContext(ReplocalContext);
	return {
		get(props: { tableName: TableName; fields: any; filters: any }) {
			const { tableName, fields, filters } = props;
			if (tableName === "financial_assets")
				return [
					{ id: "cash", name: "Cash-in-Hand" },
					{ id: "credit_card", name: "Credit Card" },
					{ id: "bank1", name: "State Bank of India" },
					{ id: "bank2", name: "Saraswat Co-op. Bank" },
					{ id: "bank3", name: "Bank of Baroda" },
				];
			return [];
		},
	};
}

type TableName =
	| "entity"
	| "invoices"
	| "expenses"
	| "receipts"
	| "payments"
	| "transactions"
	| "sops"
	| "compliance"
	| "vehicles"
	| "waybills"
	| "trips"
	| "navigation"
	| "financial_assets"
	| "financial_accounts"
	| "routes"
	| "places"
	| "shipments";
