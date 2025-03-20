import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { env } from "../../config/env"
import { prisma } from "../../lib/prisma"
import { InvalidCredentials } from "../errors/invalid-credentials"

interface IInput {
	email: string
	password: string
}

interface IOutput {
	accessToken: string
}

export class SignInUseCase {
	async execute(input: IInput): Promise<IOutput> {
		const account = await prisma.account.findUnique({
			where: {
				email: input.email
			}
		})

		if (!account) {
			throw new InvalidCredentials()
		}

		const isPasswordValid = compare(input.password, account.password)

		if (!isPasswordValid) {
			throw new InvalidCredentials()
		}

		const accessToken = sign(
			account.id,
			env.jwtSecret,
			{ expiresIn: "1d" }
		)

		return {
			accessToken
		}
	}


}