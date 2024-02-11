import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnControllers } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/')
  .post(columnValidation.createNew, columnControllers.createNew)

export const columnRoute = Router