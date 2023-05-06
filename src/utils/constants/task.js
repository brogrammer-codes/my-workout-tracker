import moment, { unitOfTime } from "moment";

export const TASK_TYPES = {
    FOLDER: 'folder',
    TASK: 'task',
    ROUTINE: 'routine',
    PLAN: 'plan',
    ACTIVITY: 'activity',
    SUPERSET: 'superset',
    HEADER: 'header'
}
export const TASK_TAGS = ['tag_1','tag_2','tag_3','tag_4','tag_5','tag_6',]

export const getPossibleSubtask = (parentTask) => {
    switch (parentTask?.type) {
        case TASK_TYPES.FOLDER:
            return parentTask?.name
        case TASK_TYPES.ROUTINE:
            return TASK_TYPES.PLAN
        case TASK_TYPES.PLAN:
            return TASK_TYPES.ACTIVITY
        case TASK_TYPES.TASK:
            return TASK_TYPES.TASK
        default:
            break;
    }
}

export const getPageType = (parentTask, currentTask) => {
    if(currentTask?.type === TASK_TYPES.FOLDER) return parentTask?.name
    return currentTask?.type
}

export const getChildTreeLength = (parentTask, elements) => {
    if(!elements?.length) return 0
    const childElements = elements.filter(el => el.parent_id === parentTask.id);
    let count = childElements.length
    childElements.forEach(element => {
      count += getChildTreeLength(element)
    });
    return count
  }

export const getSubTreeStats = (parentTask, elements) => {
    let sub_tree = getSubTree(parentTask, elements)
    
    sub_tree = sub_tree.sort((a, b) => moment(b.inserted_at).valueOf() - moment(a.inserted_at).valueOf())
    let stats = {
        latest_updated_task: sub_tree[0],
        total_tasks: sub_tree.length,
        child_elements: elements.filter(el => el.parent_id === parentTask.id),
        sub_tree,
    }
    if(parentTask?.name === TASK_TYPES.ROUTINE && sub_tree?.length){
        stats.upcoming_plan = sub_tree.find((subtask) => subtask?.type === TASK_TYPES.PLAN && subtask?.complete !== true)
        stats.number_complete =  sub_tree.filter((task) => task?.complete === true).length
    }
    return stats
}

export const getSubTree = (parentTask, elements) => {
    if(!elements?.length) return 0
    let childElements = elements.filter(el => el.parent_id === parentTask.id);
    // let count = childElements.length
    // childElements = childElements.sort((a, b) => moment(b.inserted_at).valueOf() - moment(a.inserted_at).valueOf())
    childElements.forEach(element => {
        childElements = [...childElements,  ...getSubTree(element, elements)]
    });
    return [...childElements]
}