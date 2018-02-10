module.exports = function (model) {
  return async function validate (ctx, next) {
    const data = Object.assign(
      {},
      ctx.request.query,
      ctx.request.body,
      ctx.params
    )

    try {
      model(data)
      await next()
    } catch (err) {
      ctx.throw(422, err)
    }
  }
}
