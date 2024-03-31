import useTasksStore from '@/store/zustandStore/useTaskStore';

import { TaskForm } from '../../../taskForm/components/TaskForm/TaskForm';
import { DailyTask } from '../DailyTask/DailyTask';

import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import {
  AddIconButton,
  ContainerFormStyled,
  ContainerWraperStyled,
  NoTaskStyled,
  TaskListStyled,
} from './DayPlans.styled';

export const DayPlans = () => {
  const updateTasksOrder = useTasksStore.use.updateTasksOrder();
  const tasks = useTasksStore.use.tasks();
  console.log(`tasks:`, tasks);

  const selectedDay = useTasksStore.use.selectedDate();
  console.log(`selectedDay:`, selectedDay);
  const handleAddNewTaskDoubleClick = useTasksStore.use.addNewTaskDoubleClick();

  const isOpen = useTasksStore.use.isModalOpen();

  const onDragEnd = (result: DropResult) => {
    console.log(`result:`, result);
    if (!result.destination) return;
    updateTasksOrder(result.source.index, result.destination.index);
  };

  return (
    <ContainerWraperStyled>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided: DroppableProvided) => (
            <TaskListStyled
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable
                  key={task._id}
                  draggableId={task._id ?? 'fallback-id-' + index}
                  index={index}
                >
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DailyTask task={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TaskListStyled>
          )}
        </Droppable>
      </DragDropContext>
      <ContainerFormStyled $isOpen={isOpen}>
        {isOpen ? (
          <TaskForm />
        ) : (
          <>
            <AddIconButton
              size={45}
              onClick={() => handleAddNewTaskDoubleClick(selectedDay)}
            />
            <NoTaskStyled size={150} />
          </>
        )}
      </ContainerFormStyled>
    </ContainerWraperStyled>
  );
};
