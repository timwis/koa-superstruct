const assert = require('assert')
const { struct } = require('superstruct')

module.exports = function (schema, defaults, options) {
  assert(schema, 'koa-superstruct: missing schema object')
  const Model = struct(schema, defaults, options)

  return async function validate (ctx, next) {
    const data = Object.assign(
      {},
      ctx.request.query,
      ctx.request.body,
      ctx.params
    )

    try {
      Model(data)
      await next()
    } catch (err) {
      ctx.throw(422, err)
    }
  }
}
