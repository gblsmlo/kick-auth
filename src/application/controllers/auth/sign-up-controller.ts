import { ZodError, z } from "zod";
import { AccountAlreadyExists } from "../../errors/account-already-exists";
import type {
	IController,
	IRequest,
	IResponse,
} from "../../interfaces/controller";
import type { SignUpUseCase } from "../../use-cases/auth/sign-up-use-case";

const schema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	password: z.string().min(8),
});

export class SignUpController implements IController {
	constructor(private readonly signUpUseCase: SignUpUseCase) { }

	async handle(request: IRequest): Promise<IResponse> {
		const { body } = request;

		try {
			const { name, email, password } = schema.parse(body);

			await this.signUpUseCase.execute({
				name,
				email,
				password,
			});

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			if (error instanceof ZodError) {
				return {
					statusCode: 400,
					body: error.issues,
				};
			}

			if (error instanceof AccountAlreadyExists) {
				return {
					statusCode: 409,
					body: {
						error: "This email is already in use.",
					},
				};
			}

			throw error;
		}
	}
}
