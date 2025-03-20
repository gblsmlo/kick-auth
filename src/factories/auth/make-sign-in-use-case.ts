import { SignInUseCase } from "../../application/use-cases/auth/sign-in-use-case";

export function makeSignInUseCase() {
	return new SignInUseCase()
}