import type { PGlite } from "@electric-sql/pglite";

export default function exportData(
	compression: "auto" | "gzip" | "none",
	database: PGlite,
): Promise<File | Blob> {
	return database.dumpDataDir(compression);
}
