import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnControllers } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/')
  .post(columnValidation.createNew, columnControllers.createNew)

Router.route('/:id')
  .put(columnValidation.update, columnControllers.update)
  .delete(columnValidation.deleteItem, columnControllers.deleteItem)
export const columnRoute = Router
