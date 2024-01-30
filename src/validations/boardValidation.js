/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {

  // note: mặc dù ko cần custom message ở phía BE vì để FE tự validate và custom message phía FE cho đẹp
  // BE chỉ cần validate đảm bào dữ liệu chuẩn xác, trả về message mặc định từ thư viện là được.
  // quan trọng: việc validate dữ liệu bắt buộc phải có ở BE vì đây là điểm cuối để lưu trữ dữ liệu vào Database
  // và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả BE và FE.
  const correctCondition = Joi.object({
    // trim().strict() bắt lỗi khoảng trống đầu cuối để cảnh báo vs user 2 cái này luôn đi kém với nhau
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (donlangdang)',
      'string.empty': 'Title is not alowed to be Empty (donlangdang)',
      'string.min': 'Title min 3 chars (donlangdang)',
      'string.max': 'Title max 50 chars (donlangdang)',
      'string.trim': 'Title must not have leading or trailing whitescape (donlangdang)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    //  chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi.
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate dữ liệu hợp lệ thì cho request đi tiếp sang controller
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
    // console.log(error)
    // console.log(new Error(error))
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
}

export const boardValidation = {
  createNew
}
