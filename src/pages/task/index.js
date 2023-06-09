import { useEffect } from 'react';
import { useTaskListContext } from '@/context/context';
import { TaskTree } from '@/component/TaskTree'
import { useRouter } from 'next/router';
import PageLoading from '@/component/PageLoading';
import { Folders } from '@/component/Folders';



const TaskListPage = () => {
  const { user, taskTree, getTaskTree,  } = useTaskListContext()

  const router = useRouter();

  useEffect(() => {
    if (user?.user) {
      getTaskTree()
    }
  }, [user, router])

  return (
    <PageLoading isLoading={(!user)}>
        {taskTree && <Folders folderTree={taskTree}/>}
      {/* {taskTree && <TaskTree elements={taskTree} />} */}
    </PageLoading>
  )
}
export default TaskListPage