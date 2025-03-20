import { SignUpController } from "../../application/controllers/auth/sign-up-controller"
import { makeSignUpUseCase } from "./make-sign-up-use-case"

export function makeSignUpController() {
	const signUpUseCase = makeSignUpUseCase()

	return new SignUpController(signUpUseCase)
}
