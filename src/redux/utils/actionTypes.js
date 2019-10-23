// 创建属于自己的actions
const randomString = () =>
    Math.random()
    .toString(37)
    .substring(7)
    .split('')
    .join('.')
const ActionType = {
    INIT: `@@redux/INIT${randomString()}`,
    REPLACE: `@@redux/REPLACE${randomString()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
}
export default ActionType