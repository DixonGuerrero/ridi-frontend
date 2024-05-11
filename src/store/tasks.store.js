import create from 'zustand';

const useTaskStore = create((set) => ({
  shouldUpdateTasks: false,
  toggleShouldUpdateTasks: () => set((state) => ({ 
   shouldUpdateTasks: !state.shouldUpdateTasks })),
}));


export default useTaskStore;
