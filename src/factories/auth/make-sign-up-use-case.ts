import { SignUpUseCase } from "../../application/use-cases/auth/sign-up-use-case";

export function makeSignUpUseCase() {
	const SALT = 10

	return new SignUpUseCase(SALT)
}
