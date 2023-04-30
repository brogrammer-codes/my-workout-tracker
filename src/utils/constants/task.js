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