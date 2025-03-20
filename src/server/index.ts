import express from 'express'

import { SignInController } from '../application/controllers/auth/sign-in-controller'
import { SignUpController } from '../application/controllers/auth/sign-up-controller'
import { SignInUseCase } from '../application/use-cases/auth/sign-in-use-case'
import { SignUpUseCase } from '../application/use-cases/auth/sign-up-use-case'
import { makeSignInController } from '../factories/auth/make-sign-in-controller'
import { makeSignUpController } from '../factories/auth/make-sign-up-controller'
import { makeSignUpUseCase } from '../factories/auth/make-sign-up-use-case'
import { routeAdapter } from './adapter/router-adapter'

const app = express()

app.use(express.json())

app.post('/sign-up', routeAdapter(makeSignUpController()))
app.post('sign-in', routeAdapter(makeSignInController()))

app.listen('3001', () => {
	console.log('🚀 Server started at http://localhost:3001')
})
