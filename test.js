const { struct } = require('superstruct')
const validate = require('./index')

test('Returns middleware function', () => {
  const validator = validate({})
  expect(typeof validator).toBe('function')
  expect(validator.length).toBe(2)
})

test('calls next when it validates', () => {
  const schema = struct({
    body: {
      id: 'number',
      title: 'string',
      description: 'string'
    }
  })
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
  const schema = struct({
    body: {
      id: 'number',
      title: 'string',
      description: 'string'
    }
  })
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

test('supports query, body, params, headers', () => {
  const schema = struct({
    query: { page: 'number' },
    body: { title: 'string' },
    params: { slug: 'string' },
    headers: { 'X-Foo': 'string' }
  })
  const validator = validate(schema)
  const next = jest.fn()
  const ctx = { request: {} }
  ctx.request.query = { page: 2 }
  ctx.request.body = { title: 'foo' }
  ctx.params = { slug: 'foo-bar' }
  ctx.request.headers = { 'X-Foo': 'bar' }
  validator(ctx, next)
  expect(next).toBeCalled()
})
