/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'


const createNew = async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    // điều hướng dữ liệu sang tầng Services
    const createBoard = await boardService.createNew(req.body)

    // có kết quả thì trả về client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) { next(error) }
}

export const boardControllers = {
  createNew
}