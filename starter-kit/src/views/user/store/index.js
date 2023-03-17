// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import fetchApi from '../../../utility/api'
import { getCurrentUser } from '../../../utility/api/user'

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await fetchApi().get('/users/getAllUser')
  return response.data.data.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await fetchApi().get('/users/getAllUser', params)
  return {
    params,
    data: response.data.data,
    totalPages:1
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await fetchApi().get(`/users/${id}`)
  return response.data.data
})

export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
  await axios.post('/apps/users/add-user', user)
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return user
})

export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
  await axios.delete('/apps/users/delete', { id })
  await dispatch(getData(getState().users.params))
  await dispatch(getAllData())
  return id
})
export const getUserForVerify = createAsyncThunk('appUsers/CurrentUser', async () => {
  const response = await getCurrentUser()
  return  {currentUser:response.data}
    
})

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    currentUser: {},
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUserForVerify.fulfilled, (state, action) => {
        state.currentUser = action.payload.currentUser
     
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appUsersSlice.reducer
