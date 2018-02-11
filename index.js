module.exports = function (model) {
  const keysToValidate = Object.keys(model.schema || {})

  return async function validate (ctx, next) {
    const data = {}
    for (let i = 0; i < keysToValidate.length; i++) {
      const key = keysToValidate[i]
      data[key] = ctx.request[key] || ctx[key] // ctx.params is outside request namespace
    }

    try {
      model(data)
    } catch (err) {
      ctx.throw(422, err)
      return
    }
    await next()
  }
}
