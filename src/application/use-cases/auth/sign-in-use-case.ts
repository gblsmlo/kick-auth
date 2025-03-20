import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"
import { env } from "../../config/env"
import { InvalidCredentials } from "../../errors/invalid-credentials"
import { prisma } from "../../libs/prisma"

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

		const accessToken = jwt.sign(account.id, env.jwtSecret)

		return {
			accessToken
		}
	}
}