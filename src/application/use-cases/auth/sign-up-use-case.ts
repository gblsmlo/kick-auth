import { hash } from "bcryptjs"
import { AccountAlreadyExists } from "../../errors/account-already-exists";
import { prisma } from "../../libs/prisma";

interface IInput {
	name: string;
	email: string;
	password: string;
}

interface IOutput {
	account: {
		id: string
		name: string
		email: string
		password: string
	}
};

export class SignUpUseCase {
	constructor(private readonly salt: number) { }

	async execute(input: IInput): Promise<IOutput> {

		const accountAlreadyExist = await prisma.account.findUnique({
			where: {
				email: input.email
			}
		})

		if (accountAlreadyExist) {
			throw new AccountAlreadyExists()
		}

		const hashedPassword = await hash(input.password, this.salt)

		const account = await prisma.account.create({
			data: {
				name: input.email,
				email: input.email,
				password: hashedPassword
			}
		})

		return {
			account
		}
	}
}
