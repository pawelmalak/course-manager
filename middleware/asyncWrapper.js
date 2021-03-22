const asyncWrapper = foo => (req, res, next) => {
  return Promise
    .resolve(foo(req, res, next))
    .catch(next);
}

module.exports = asyncWrapper;