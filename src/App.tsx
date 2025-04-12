/* eslint-disable prefer-const */
import { useState } from 'react';
import SelectTask from './components/selectTask/SelectTask';
import './App.css';
import Watches from './components/watches/Watches';
import Crud from './components/crud/Crud';

function App() {
  let [ curTask, setCurTask ] = useState('CHAT');
  const tasks = [
    { taskName: 'Мировые часы', solving: <Watches key={'WATCHES'} /> },
    { taskName: 'CRUD', solving: <Crud key={'CRUD'} /> },
  ];

  return (
    <>
      <SelectTask tasks={tasks} setTask={(task: string) => setCurTask(curTask = task)} curTask={curTask} />      
      <div>        
        { tasks.filter(task => task.taskName === curTask).map(task => task.solving) }
      </div>
    </>
  )
}

export default App;
