# koa-superstruct
Use the [superstruct][superstruct] data validation library as middleware for your [koa][koa] app.

## usage
```javascript
const { struct } = require('superstruct')
const validate = require('koa-superstruct')

const schema = struct({
  id: 'number',
  title: 'string',
  isPublished: 'boolean?',
  tags: ['string'],
  author: {
    id: 'number'
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

[superstruct]: https://github.com/ianstormtaylor/superstruct
[koa]: https://github.com/koajs/koa
