import create from 'zustand';

const useProjectStore = create((set) => ({
   shouldUpdateProjects: false,
   toggleShouldUpdateProjects: () => set((state) => ({
      shouldUpdateProjects: !state.shouldUpdateProjects
   })),
}));

export default useProjectStore;