/* eslint-disable no-unused-vars */
const RET_OK = 0
const RET_EXCEPTION = 1
const RET_NOT_LOGIN = 2
const RET_ADMIN_LOGIN_BASE = 100
const RET_ADMIN_LOGIN_FAILED = RET_ADMIN_LOGIN_BASE + 1
const TO_LOGIN = 401
const NO_AUTH = 403
export default
{
  RET_OK,
  RET_EXCEPTION,
  RET_NOT_LOGIN,
  RET_ADMIN_LOGIN_BASE,
  RET_ADMIN_LOGIN_FAILED,
  TO_LOGIN,
  NO_AUTH
}