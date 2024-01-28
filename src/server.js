/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { env } from './config/environment'

const STATR_SERVER = () => {
  const app = express()


  app.get('/', /*async*/ (req, res) => {
    // console.log(await GET_DB().listCollections().toArray())
    // Test Absolute import mapOrder
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Donlangdang, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })
  // thực hiện các tác vụ cleanup trước khi đóng server
  exitHook(() => {
    console.log('4. server is shutting down...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB Cloud Atlas')
  })
}
// chỉ khi kết nối với database thành công thì mới start server back-end lên.
// sau này code sẽ đi tử STATR_SERVER đi ra và chia các file cuối cùng cũng gắn vào STATR_SERVER để chạy
// học thêm try catch, IIFE javasript
CONNECT_DB()
  .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
  .then(() => STATR_SERVER())
  .catch(error => {
    console.error(error)
    process.exit(0)
  })
