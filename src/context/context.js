import { useUser, useTask, useApi } from "@/hooks/api";
import { createContext, useState, useEffect, useContext } from "react";

export const Task_List = createContext(null);

export const Context = ({ children }) => {
  const { setToken, token } = useApi()
  const { getUser, user, updateUserProfile, loginUser, logoutUser, error, loading: userLoading, getProfiles, profiles } = useUser()
  const { getTaskTree, taskTree, addTask, updateTask, deleteTask, copyTask, loading: taskLoading, copyTaskToShared } = useTask()
  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token])
  const providerValue = {
    user,
    updateUserProfile,
    loginUser,
    logoutUser,
    getTaskTree,
    addTask,
    updateTask,
    deleteTask,
    copyTask,
    copyTaskToShared,
    taskTree,
    setToken,
    getUser,
    error,
    userLoading,
    taskLoading,
    getProfiles,
    profiles
  }
  return (
    <Task_List.Provider value={{ ...providerValue }}>
      {children}
    </Task_List.Provider>
  );
}

export const useTaskListContext = () => useContext(Task_List);
