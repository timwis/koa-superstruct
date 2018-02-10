const validate = require('./index')

const schema = {
  id: 'number',
  title: 'string',
  description: 'string'
}

test('Returns middleware function', () => {
  const validator = validate({})
  expect(typeof validator).toBe('function')
  expect(validator.length).toBe(2)
})

test('calls next when it validates', () => {
  const validator = validate(schema)
  const next = jest.fn()
  const ctx = { request: {} }
  ctx.request.body = {
    id: 1,
    title: 'foo',
    description: 'bar'
  }
  validator(ctx, next)
  expect(next).toBeCalled()
})

test('calls ctx.throw and not next when validation fails', () => {
  const validator = validate(schema)
  const next = jest.fn()
  const ctx = { request: {} }
  ctx.throw = jest.fn()
  ctx.request.body = {
    id: 'foo'
  }
  validator(ctx, next)
  expect(ctx.throw).toBeCalledWith(422, expect.any(Object))
  expect(next).not.toBeCalled()
})

test('merges query, body, params', () => {
  const validator = validate(schema)
  const next = jest.fn()
  const ctx = { request: {} }
  ctx.request.query = { id: 1 }
  ctx.request.body = { title: 'foo' }
  ctx.params = { description: 'bar' }
  validator(ctx, next)
  expect(next).toBeCalled()
})
