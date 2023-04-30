import { TASK_TYPES } from '@/utils/constants';
import { fetchTaskSubTree, patchTask, postTask } from '@/utils/api';
import { useState, useEffect } from 'react';

export const usePlan = () => {
    const [planTree, setPlanTree] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState([])
    const getPlanTree = async (plan_id) => {
        await fetchTaskSubTree(plan_id).then(({task_tree}) => setPlanTree([...task_tree])).catch((e) => setError(e))
      };
    const updatePlan = async (task) => {
        await patchTask(task).then(({task}) => {
            const newPlanTree = planTree.filter((e) => e?.id !== task?.id)
            setPlanTree([...newPlanTree, task])
        }).catch((e) => setError(e))
      };
    const createPlan = async (plan) => {
      if(plan?.type === TASK_TYPES.PLAN){
        setloading(true)
        await postTask(task)
          .then(({task}) => {
            if(task) setTaskTree([...taskTree, task])
            setloading(false)
          })
          .catch((e) => {
            setError(e)
          }
    
          );
      }
    }
    const addActivity = async (activity, plan_id) => {

    }
    return {planTree, updatePlan, getPlanTree, createPlan}
}