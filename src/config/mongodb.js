/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */


import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment'
// tạo ra đối tượng trelloDatabaseInstance bắt đâù là null(vì chưa connect)
let trelloDatabaseInstance = null
// khởi tạo đối tượng Client Instance (MongoClientInstance) để connect tới mongodb
const MongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // lưu ý: serverAPI có từ phiên bản 5.0.0 trở lên, có thể không dùng nó, còn nêú dùng thì sẽ chỉ định 1 cái Stable API Version của mongoDB.
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// kết nối Database
export const CONNECT_DB = async () => {
  // gọi kết nối tới mongodb Atlas với URI đã khai báo trong thân MongoClientInstance
  await MongoClientInstance.connect()
  // kết nối thành công thì lấy ra database theo tên và gán ngược lại nó lại vào biến trelloDatabaseInstance.
  trelloDatabaseInstance = MongoClientInstance.db(env.DATABASE_NAME)
}
// Function GET_DB(không async) này có nhiệm vụ export ra trelloDatabaseInstance sau khi đã connect thành công tới mongodb để sử dụng nhiều nơi khác trong code.
// lưu ý: phải đảm bảo chỉ luôn gọi GET_DB sau khi đã kết nối thành công
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

// đóng kết nối database khi cần
export const CLOSE_DB = async () => {
  await MongoClientInstance.close()
}