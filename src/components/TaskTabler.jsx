import {useState} from 'react';

export default function  TaskTabler () {

   const [tasks, setTasks] = useState([
      {
         id: 1,
         title: 'Tarea 1',
         description: 'Descripcion de la tarea 1',
         status: 'Por Hacer'
      },
      {
         id: 2,
         title: 'Tarea 2',
         description: 'Descripcion de la tarea 2',
         status: 'Por Hacer'
      },
      {
         id: 3,
         title: 'Tarea 3',
         description: 'Descripcion de la tarea 3',
         status: 'Por Hacer'
      },
      {
         id: 4,
         title: 'Tarea 4',
         description: 'Descripcion de la tarea 4',
         status: 'En Proceso'
      },
      {
         id: 5,
         title: 'Tarea 5',
         description: 'Descripcion de la tarea 5',
         status: 'En Proceso'
      },
      {
         id: 6,
         title: 'Tarea 6',
         description: 'Descripcion de la tarea 6',
         status: 'En Proceso'
      },
      {
         id: 7,
         title: 'Tarea 7',
         description: 'Descripcion de la tarea 7',
         status: 'Completado'
      },
      {
         id: 8,
         title: 'Tarea 8',
         description: 'Descripcion de la tarea 8',
         status: 'Completado'
      },
      {
         id: 9,
         title: 'Tarea 9',
         description: 'Descripcion de la tarea 9',
         status: 'Completado'
      },
      {
         id: 10,
         title: 'Tarea 10',
         description: 'Descripcion de la tarea 10',
         status: 'Completado'
      },
      {
         id: 11,
         title: 'Tarea 11',
         description: 'Descripcion de la tarea 11',
         status: 'Por Hacer'
      },
      {
         id: 12,
         title: 'Tarea 12',
         description: 'Descripcion de la tarea 12',
         status: 'Por Hacer'
      },
      {
         id: 13,
         title: 'Tarea 13',
         description: 'Descripcion de la tarea 13',
         status: 'En Proceso'
      },
      {
         id: 14,
         title: 'Tarea 14',
         description: 'Descripcion de la tarea 14',
         status: 'En Proceso'
      },
      {
         id: 15,
         title: 'Tarea 15',
         description: 'Descripcion de la tarea 15',
         status: 'Completado'
      },
      {
         id: 16,
         title: 'Tarea 16',
         description: 'Descripcion de la tarea 16',
         status: 'Completado'
      }
   ]);

   const getList = (status) => {
      return tasks.filter(task => task.status == status);
   }

   const startDrag = (evt, task) => {
      evt.dataTransfer.setData('itemID', task.id);
      console.log(task.id);
   }

   const draggingOver = (evt) => {
      evt.preventDefault();
   }

   const onDrop = (evt, status) => {
      const id = JSON.parse(evt.dataTransfer.getData('itemID'));
      const item = tasks.find(task => task.id == id);
      item.status = status;


      const newState = tasks.map(task => {
         if (task.id === id) {
            return item;
         }
         return task;
      });

      setTasks(newState);
   }
   return (
     <>

      <div className='flex flex-wrap  gap-3 flex-row p-2 '>
         <div className='backdrop-blur-lg flex-grow  rounded-lg  border-t-4 p-2  border-purple-400 shadow-sm '>
            <h3 className=' text-purple-400 font-bold  text-2xl rounded-lg my-1  '>Por Hacer</h3>

            <div className="flex  flex-col h-full" droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 'Por Hacer'))}>
               {getList('Por Hacer').map(task => (

                  <div className="rounded-lg bg-white my-2 p-2" key={task.id} draggable="true" onDragStart={(evt) => startDrag(evt, task)} >
                  <h4 className='text-xl text-purple-400 font-bold  '> {task.title}</h4>

                  <p className='text-gray-500'>{task.description}</p>
               </div>
               ))}
            </div>
            
         </div>

         <div className='backdrop-blur-lg flex-grow  rounded-lg  border-t-4 p-2  border-blue-400'>
            <h3 className=' text-blue-400 font-bold  text-2xl rounded-lg my-1  '>En Proceso</h3>

            <div className="flex  flex-col h-full" droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 'En Proceso'))}>
               {getList('En Proceso').map(task => (

                  <div className="rounded-lg bg-white my-2 p-2" key={task.id} draggable="true" onDragStart={(evt) => startDrag(evt, task)} >
                  <h4 className='text-xl text-blue-400 font-bold  '> {task.title}</h4>

                  <p className='text-gray-500'>{task.description}</p>
               </div>
               ))}
            </div>
            
         </div>

         <div className='backdrop-blur-lg flex-grow  rounded-lg  border-t-4 p-2  border-green-400'>
            <h3 className=' text-green-400 font-bold  text-2xl rounded-lg my-1  '>Completado</h3>

            <div className="flex  flex-col h-full" droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, 'Completado'))}>
               {getList('Completado').map(task => (

                  <div className="rounded-lg bg-white my-2 p-2" key={task.id} draggable="true" onDragStart={(evt) => startDrag(evt, task)} >
                  <h4 className='text-xl text-green-400 font-bold  '> {task.title}</h4>

                  <p className='text-gray-500'>{task.description}</p>
               </div>
               ))}
            </div>
            
         </div>
        
         

      </div>

     </>
   )
}