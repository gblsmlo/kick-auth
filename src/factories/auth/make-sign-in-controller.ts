import { SignInController } from "../../application/controllers/auth/sign-in-controller";
import { makeSignInUseCase } from "./make-sign-in-use-case";

export function makeSignInController() {
	const signInUseCase = makeSignInUseCase()

	return new SignInController(signInUseCase)
}