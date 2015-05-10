pomodoro
-----------

[![Circle CI](https://circleci.com/gh/christian-fei/pomodoro.svg?style=svg)](https://circleci.com/gh/christian-fei/pomodoro)

[![pomodoro docker](http://dockeri.co/image/christianfei/pomodoro)](https://hub.docker.com/u/christianfei/pomodoro/)

# Boost your productivity
## Manage your time more effectively

[Pomodoro.cc](http://pomodoro.cc) is an online time tracking tool to plan and review the tasks for the day.

It takes advantage of the guidelines described in the [Pomodoro-technique](http://pomodorotechnique.com) to work more effectively with frequent, mind refreshing breaks.

With the help of insightful statistics you'll be able to better understand how much you worked on each task and how concentrated you were.





# Requirements

- node
- bower



# Setup

`make bootstrap`


# Docker

Take a look at [Pomodoro garden](https://github.com/christian-fei/pomodoro-garden)


# Development

- `gulp watch` spins up a server @ localhost:9000, watches assets, livereloads changes in the browser, bundles assets

- `make build` to package everything up nicely



# Test

## unit

```
npm test
```

Watch tests during development

```
npm run watch-unit-tests
```

## e2e

```
make i_web_driver
```

```
make e2e-tests
```


# [License](http://wtfpl.org/)

```
         DO WHATEVER THE FUCK YOU WANT, PUBLIC LICENSE
 TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

          0. You just DO WHATEVER THE FUCK YOU WANT.
```
