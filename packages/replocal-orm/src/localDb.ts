/**
 * Returns reads from local database
 */
function useDbQuery() {
	// return db.query.users.findMany()
}

/**
 * Returns only incoming changes from local database
 */
function useDbChanges() {
	// return db.query.users.findMany()
}

/**
 * Returns subscription (query + changes) to local database
 */
function useDbSubscription() {
	// return db.query.users.findMany()
}

/**
 *
 */
export default function localDb() {
	const localDb = "";
	return { localDb, useDbQuery, useDbChanges, useDbSubscription };
}
