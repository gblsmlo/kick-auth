import { ZodError, z } from "zod";
import { InvalidCredentials } from "../../errors/invalid-credentials";
import type {
	IController,
	IRequest,
	IResponse,
} from "../../interfaces/controller";
import type { SignInUseCase } from "../../use-cases/auth/sign-in-use-case";

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export class SignInController implements IController {
	constructor(private readonly signInUseCase: SignInUseCase) { }

	async handle(request: IRequest): Promise<IResponse> {
		const { body } = request;

		try {
			const { email, password } = schema.parse(body);

			const { accessToken } = await this.signInUseCase.execute({
				email,
				password,
			});

			return {
				statusCode: 200,
				body: { accessToken },
			};
		} catch (error) {
			if (error instanceof ZodError) {
				return {
					statusCode: 400,
					body: error.issues,
				};
			}

			if (error instanceof InvalidCredentials) {
				return {
					statusCode: 401,
					body: {
						error: "Invalid credentials.",
					},
				};
			}

			throw error;
		}
	}
}
