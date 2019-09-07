/* eslint-disable camelcase */

const MINUTES = 60 * 1000

const nowToISOString = () => {
  return (new Date()).toISOString()
}

const toTimestamp = (date) => {
  return (new Date(date)).getTime()
}

class Pomodoro {
  constructor (pomodoro = {}) {
    const { type, minutes, startedAt, cancelledAt } = pomodoro
    this.type = type
    this.minutes = minutes
    this.startedAt = startedAt
    if (cancelledAt) {
      this.cancelledAt = cancelledAt
    }
  }

  toJSON () {
    const json = {
      type: this.type,
      minutes: this.minutes,
      startedAt: this.startedAt
    }
    if (this.cancelledAt) {
      json.cancelledAt = this.cancelledAt
    }
    return json
  }

  duration () {
    const { startedAt, cancelledAt, minutes } = this
    if (cancelledAt) {
      return toTimestamp(cancelledAt) - toTimestamp(startedAt)
    }
    return minutes * MINUTES
  }

  isType (type) {
    return this.type === type
  }

  timestamps () {
    const { startedAt, cancelledAt } = this
    const timestamps = {
      startedAt: toTimestamp(startedAt),
      ended_at: toTimestamp(startedAt) + this.minutes * MINUTES
    }
    if (cancelledAt) {
      timestamps.cancelledAt = toTimestamp(cancelledAt)
      timestamps.ended_at = timestamps.cancelledAt
    }
    return timestamps
  }

  cancel () {
    this.cancelledAt = nowToISOString()
  }

  isCancelled () {
    const { cancelledAt } = this
    return !!cancelledAt
  }
}

Pomodoro.create = ({ type, minutes }) => {
  return new Pomodoro({
    type,
    minutes,
    startedAt: nowToISOString()
  })
}

export default Pomodoro
