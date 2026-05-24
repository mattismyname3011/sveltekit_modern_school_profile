import { eq } from 'drizzle-orm';
import { db } from '$lib/db';
import { users, type User } from '$lib/db/schema';
import { hashPassword, verifyPassword } from './password';

export const usersRepo = {
	findByEmail(email: string): Promise<User | null> {
		const normalized = email.trim().toLowerCase();
		return db
			.select()
			.from(users)
			.where(eq(users.email, normalized))
			.limit(1)
			.then((rows) => rows[0] ?? null);
	},

	async create(input: { email: string; name: string; password: string; role?: string }) {
		const [row] = await db
			.insert(users)
			.values({
				email: input.email.trim().toLowerCase(),
				name: input.name.trim(),
				passwordHash: await hashPassword(input.password),
				role: input.role ?? 'admin'
			})
			.returning();
		return row;
	},

	async authenticate(email: string, password: string): Promise<User | null> {
		const user = await this.findByEmail(email);
		if (!user) {
			// Run a dummy hash to avoid leaking that the email doesn't exist via timing.
			await verifyPassword(password, 'scrypt$16384$8$1$00$00').catch(() => false);
			return null;
		}
		const ok = await verifyPassword(password, user.passwordHash);
		return ok ? user : null;
	},

	async touchLogin(userId: number) {
		await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, userId));
	}
};
