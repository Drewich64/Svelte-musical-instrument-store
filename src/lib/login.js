import { db } from "$lib/database/db";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export function generateSessionToken() {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(token, userId){
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session = {
		id: sessionId,
		userId: userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.execute(
		"INSERT INTO user_session (id, user_id, expires_at) VALUES (?, ?, ?)",
        [
            session.id,
            session.userId,
            session.expiresAt
        ]
	);
	return session;
}

export async function validateSessionToken(token) {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	let row = (await db.query(
		"SELECT user_session.id, user_session.user_id, user_session.expires_at, role.name as role, user.is_deleted FROM user_session INNER JOIN user ON user.id = user_session.user_id inner join role on role.id = user.role WHERE user_session.id = ?;",
		[sessionId]
	))[0];

	if (row.length <= 0) {
		return {session: null, user: null};
	}
	row = row[0];

	if (row.is_deleted) {
		return {session: null, user: null};
	}

	const session = {
		id: row["id"],
		userId: row["user_id"],
		expiresAt: row["expires_at"]
	};
	const user = {
		id: row["user_id"],
		role: row["role"]
	};
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.execute("DELETE FROM user_session WHERE id = ?", [session.id]);
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db.execute(
			"UPDATE user_session SET expires_at = ? WHERE id = ?",
			[
                session.expiresAt,
			    session.id
            ]
		);
	}
	return { session, user };
}

export async function invalidateSession(sessionId) {
	await db.execute("DELETE FROM user_session WHERE id = ?", [encodeHexLowerCase(sha256(new TextEncoder().encode(sessionId)))]);
}

export async function invalidateAllSessions(userId) {
	await db.execute("DELETE FROM user_session WHERE user_id = ?", [userId]);
}