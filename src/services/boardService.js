/* eslint-disable no-useless-catch */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

// service thường dùng để xử lí logic các hàm các thứ như kiểu truy xuất dữ liệu trong database rồi chuyển sang cho controller để đẩy qua route chứ service ko chứa route hay điều hướng hoặc những gì tương tự.
const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu đặc thù tùy dự án
    const newBoard = {
      ...reqBody,
      // slug là gì ?
      slug: slugify(reqBody.title)
    }
    // gọi tới tầng Model để xử lí lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard)

    // lấy bản ghi board sau khi gọi (tuy thuộc dự án)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log(getNewBoard)
    // làm thêm các xử lí logic khác với các collection khác tùy đặc thù dự án...vv
    // bắn Email, Notification về cho admin khi có 1 board mới đc tạo... v v
    // trả kết quả về trong services luôn phải có return
    return getNewBoard
  } catch (error) { throw error }

}
const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    const resBoard = cloneDeep(board)
    // đưa card về đúng với column của nó
    resBoard.columns.forEach(column => {
      // cách dùng equals này là bởi vì MongoDB có support thằng equals với kiểu ObjectId
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })
    // xóa mảng cards khỏi board ban đầu
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }

}

export const boardService = {
  createNew,
  getDetails
}