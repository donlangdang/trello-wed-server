/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardControllers } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs  get list board' })
  })
  .post(boardValidation.createNew, boardControllers.createNew)

Router.route('/:id')
  .get(boardControllers.getDetails)
  .put(boardValidation.update, boardControllers.update) //update

// api hỗ trợ việc di chuyển card giữa các column khác nhau trong 1 board
Router.route('/supports/moving_card')
  .put(boardValidation.moveCardToDifferentColumn, boardControllers.moveCardToDifferentColumn)

export const boardRoute = Router