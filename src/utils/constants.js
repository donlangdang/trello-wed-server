/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
// những domain đc truy cập vào server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173' // không cần localhost nữa vì ở file config/cors đã luôn cho phép môi trường dev đi qua
  // (env.BUILD_MODE === 'dev')
  'https://trello-wed-alpha.vercel.app'
  //  sau này deploy lên domain nào khác thì gắn vào đây
]

export const BOARD_TYPE = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}