/* global expect */
import loading, {defaultState} from './loading'
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  GET_TODO_ERROR
} from '../actions'

const dummyAction = (type) => ({type, payload: {}})

describe('loading reducer', () => {
  it('sets default state when not specified', () => {
    expect(
      loading(undefined, dummyAction('DUMMY_ACTION'))
    ).to.deep.eql(defaultState)
  })

  it('is true after loading actions', () => {
    expect(
      loading(undefined, dummyAction(ADD_TODO_REQUEST))
    ).to.deep.eql(true)
    expect(
      loading(undefined, dummyAction(DELETE_TODO_REQUEST))
    ).to.deep.eql(true)
    expect(
      loading(undefined, dummyAction(GET_TODO_REQUEST))
    ).to.deep.eql(true)
  })

  it('is false after request actions', () => {
    expect(
      loading(true, dummyAction(ADD_TODO_SUCCESS))
    ).to.deep.eql(false)
    expect(
      loading(true, dummyAction(ADD_TODO_ERROR))
    ).to.deep.eql(false)
    expect(
      loading(true, dummyAction(DELETE_TODO_SUCCESS))
    ).to.deep.eql(false)
    expect(
      loading(true, dummyAction(DELETE_TODO_ERROR))
    ).to.deep.eql(false)
    expect(
      loading(true, dummyAction(GET_TODO_SUCCESS))
    ).to.deep.eql(false)
    expect(
      loading(true, dummyAction(GET_TODO_ERROR))
    ).to.deep.eql(false)
  })
})
