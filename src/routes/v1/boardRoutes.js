/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs  get list board' })
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({ message: 'APIs create new board' })
  })

export const boardRoutes = Router