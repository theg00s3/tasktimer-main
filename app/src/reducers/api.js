/*@flow*/
import {
  GET_TODAYS_POMODORI_SUCCESS,
  GET_TODAYS_POMODORI_ERROR,
  GET_TODAYS_COMPLETED_TASKS_SUCCESS,
  GET_TODAYS_COMPLETED_TASKS_ERROR,
} from '../actions/api'

const initialState = {
  todaysPomodori: [],
  todaysCompletedTodos: [],
}

export default function api(state=initialState, action) {
  switch(action.type){
    case GET_TODAYS_POMODORI_SUCCESS: {
      return {
        ...state,
        todaysPomodori: action.payload
      }
    }
    case GET_TODAYS_COMPLETED_TASKS_SUCCESS: {
      return {
        ...state,
        todaysCompletedTodos: action.payload
      }
    }
    case GET_TODAYS_POMODORI_ERROR: {
      if( window.development ){
        return {
          ...state,
          todaysPomodori: dummyTodaysPomodori()
        }
      }
      return state
    }
    case GET_TODAYS_COMPLETED_TASKS_ERROR: {
      if( window.development ){
        return {
          ...state,
          todaysCompletedTodos: dummyTodaysCompletedTodos()
        }
      }
      return state
    }
  }
  return state
}

function dummyTodaysPomodori() {return [{"updated_at":"2016-01-03T17:37:05Z","type":"pomodoro","started_at":"2016-01-03T17:12:04.582000Z","minutes":25,"inserted_at":"2016-01-03T17:37:05Z","id":3,"cancelled_at":null},{"updated_at":"2016-01-03T17:42:27Z","type":"pomodoro","started_at":"2016-01-03T17:42:24.030000Z","minutes":25,"inserted_at":"2016-01-03T17:42:27Z","id":4,"cancelled_at":"2016-01-03T17:42:27.295000Z"},{"updated_at":"2016-01-03T17:47:33Z","type":"break","started_at":"2016-01-03T17:42:32.654000Z","minutes":5,"inserted_at":"2016-01-03T17:47:33Z","id":6,"cancelled_at":null},{"updated_at":"2016-01-03T18:09:47Z","type":"pomodoro","started_at":"2016-01-03T17:49:46.318000Z","minutes":25,"inserted_at":"2016-01-03T18:09:47Z","id":7,"cancelled_at":null},{"updated_at":"2016-01-03T18:20:47Z","type":"break","started_at":"2016-01-03T18:15:46.905000Z","minutes":5,"inserted_at":"2016-01-03T18:15:46Z","id":8,"cancelled_at":null},{"updated_at":"2016-01-03T18:54:42Z","type":"pomodoro","started_at":"2016-01-03T18:43:41.126000Z","minutes":25,"inserted_at":"2016-01-03T18:54:42Z","id":9,"cancelled_at":"2016-01-03T18:54:42.305000Z"},{"updated_at":"2016-01-03T19:20:13Z","type":"pomodoro","started_at":"2016-01-03T18:55:13.879000Z","minutes":25,"inserted_at":"2016-01-03T19:20:13Z","id":10,"cancelled_at":null},{"updated_at":"2016-01-03T19:33:54Z","type":"break","started_at":"2016-01-03T19:31:41.868000Z","minutes":5,"inserted_at":"2016-01-03T19:33:54Z","id":11,"cancelled_at":null},{"updated_at":"2016-01-03T19:46:22Z","type":"break","started_at":"2016-01-03T19:44:08.054000Z","minutes":5,"inserted_at":"2016-01-03T19:46:22Z","id":12,"cancelled_at":null},{"updated_at":"2016-01-03T20:13:38Z","type":"pomodoro","started_at":"2016-01-03T19:51:24.518000Z","minutes":25,"inserted_at":"2016-01-03T20:13:38Z","id":13,"cancelled_at":null},{"updated_at":"2016-01-03T20:19:48Z","type":"break","started_at":"2016-01-03T20:17:34.513000Z","minutes":5,"inserted_at":"2016-01-03T20:19:48Z","id":14,"cancelled_at":null},{"updated_at":"2016-01-03T20:45:07Z","type":"pomodoro","started_at":"2016-01-03T20:22:52.602000Z","minutes":25,"inserted_at":"2016-01-03T20:45:07Z","id":15,"cancelled_at":null},{"updated_at":"2016-01-03T21:14:53Z","type":"pomodoro","started_at":"2016-01-03T20:52:36.308000Z","minutes":25,"inserted_at":"2016-01-03T21:14:53Z","id":16,"cancelled_at":null},{"updated_at":"2016-01-03T21:20:05Z","type":"break","started_at":"2016-01-03T21:17:48.486000Z","minutes":5,"inserted_at":"2016-01-03T21:20:05Z","id":17,"cancelled_at":null},{"updated_at":"2016-01-03T22:07:45Z","type":"pomodoro","started_at":"2016-01-03T21:45:27.163000Z","minutes":25,"inserted_at":"2016-01-03T22:07:45Z","id":18,"cancelled_at":null},{"updated_at":"2016-01-03T22:22:02Z","type":"break","started_at":"2016-01-03T22:21:57.776000Z","minutes":5,"inserted_at":"2016-01-03T22:22:02Z","id":19,"cancelled_at":"2016-01-03T22:22:02.162000Z"},{"updated_at":"2016-01-03T22:27:02Z","type":"break","started_at":"2016-01-03T22:22:02.814000Z","minutes":5,"inserted_at":"2016-01-03T22:27:02Z","id":20,"cancelled_at":null}]}
function dummyTodaysCompletedTodos() {return [{"updated_at":"2016-01-05T15:12:43Z","text":"test","inserted_at":"2016-01-05T14:29:27Z","id":12,"deleted":false,"completed_at":"2016-01-05T15:12:43Z","completed":true}]}
