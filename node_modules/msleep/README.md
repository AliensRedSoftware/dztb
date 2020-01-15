<img src="http://rawgit.com/caiogondim/msleep/master/img/logo.svg">

# msleep

Small function that mimics the `usleep` C function, blocking the main thread.
But instead of microseconds works with miliseconds, to feel more JS-like.

Useful for:
- Debugging race conditions
- Simulate blocked UI thread on the browser

## Installation

```shell
npm install --save msleep
```

## Usage

```js
msleep(5000) // Will block the main thread for half a second
```

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
