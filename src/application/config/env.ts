import 'dotenv/config'

export const env = {
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	jwtSecret: process.env.JWT_SECRET!
}