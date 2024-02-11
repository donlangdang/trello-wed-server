import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardControllers } from '~/controllers/cardController'

const Router = express.Router()

Router.route('/')
  .post(cardValidation.createNew, cardControllers.createNew)

export const cardRoute = Router