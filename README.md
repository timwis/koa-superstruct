# koa-superstruct
Use the [superstruct][superstruct] data validation library as middleware for your [koa][koa] app.

## usage
```javascript
const { struct } = require('superstruct')
const validate = require('koa-superstruct')

const schema = struct({
  body: {
    id: 'number',
    title: 'string',
    isPublished: 'boolean?',
    tags: ['string'],
    author: {
      id: 'number'
    }
  }
})

router.post('/entry', validate(schema), handler)
```

If validation fails, it throws an HTTP 422 error (Unprocessable Entity) with descriptive message, ex:

> Expected a value of type `string` for `title` but received `undefined`.

## intallation
```bash
npm install koa-superstruct
```
Install `superstruct` separately, allowing you to pass custom types and avoid peer dependency.

## api

### `validate`
`validate(schema: Function) => Function`

Accepts a [Struct validator function][validator-function]. The top-level keys should map to koa's [`ctx.request` object][request-object] (ex. `body`, `query`, `headers`) and, failing that, to the `ctx` object (ex. `ctx.params`).

```javascript
const schema = struct({
  headers: {
    'X-Foo': 'string'
  },
  body: {
    'count': 'number'
  },
  query: {
    'page': 'number?'
  },
  params: {
    'slug': 'string'
  }
})
validate(schema)
```

[superstruct]: https://github.com/ianstormtaylor/superstruct
[koa]: https://github.com/koajs/koa
[validator-function]: https://github.com/ianstormtaylor/superstruct/blob/master/docs/reference.md
[request-object]: http://koajs.com/#request
