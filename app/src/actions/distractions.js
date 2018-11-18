export const TRACK_DISTRACTION = 'TRACK_DISTRACTION'

export function trackDistraction (createdAt) {
  return {type: TRACK_DISTRACTION, payload: createdAt || new Date()}
}
