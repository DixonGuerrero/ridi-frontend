// Definir un tipo para los estados de las tareas
enum TaskStatus {
   PorHacer = 1,
   EnProceso = 2,
   Completado = 3
 }
 
 // Definir la interfaz de una tarea
 interface Task {
   id: number;
   title: string;
   description: string;
   status: TaskStatus;
 }
 