import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupsData: [],
  userData: [],
  userGroupsData: [],
  itemsData: [],
  groupItemsData: [],
  groupInfo: null,
  userInfo: null,
  itemInfo: null,
  groupItemInfo: null,
};

const userReqSlice = createSlice({
  name: "userReq",
  initialState,
  reducers: {
    setGroupsData: (state, action) => {
      state.groupsData = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setUserGroupsData: (state, action) => {
      state.userGroupsData = action.payload;
    },

    setItemsData: (state, action) => {
      state.itemsData = action.payload;
    },

    setGroupItemsData: (state, action) => {
      state.groupItemsData = action.payload;
    },

    setGroupInfo: (state, action) => {
      state.groupInfo = action.payload;
    },

    setItemInfo: (state, action) => {
      state.itemInfo = action.payload;
    },

    setGroupItemInfo: (state, action) => {
      state.groupItemInfo = action.payload;
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    addGroupItemsDataById: (state, action) => {
      state.groupItemsData = [action.payload, ...state.groupItemsData];
    },

    removeGroupItemsDataById: (state, action) => {
      state.groupItemsData = state.groupItemsData.filter(
        (item) => item._id !== action.payload
      );
    },

    addItemsDataById: (state, action) => {
      state.itemsData = [action.payload, ...state.itemsData];
    },

    removeItemsDataById: (state, action) => {
      state.itemsData = state.itemsData.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  setGetGroupStatus,
  setGetUserStatus,
  setGetItemsStatus,
  setGroupsData,
  setUserData,
  setUserGroupsData,
  setItemsData,
  setGroupItemsData,
  setGetUserGroupsStatus,
  setGroupInfo,
  setUserInfo,
  setItemInfo,
  setGroupItemInfo,
  addGroupItemsDataById,
  removeGroupItemsDataById,
  addItemsDataById,
  removeItemsDataById,
} = userReqSlice.actions;

export default userReqSlice.reducer;
