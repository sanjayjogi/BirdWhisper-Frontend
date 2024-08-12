import { create } from 'zustand'
import useAudioStore from './AudioStore'

export type ModalStore = {
  modal: boolean
  openModal: () => void
  closeModal: () => void
}

const useModalStore = create<ModalStore>((set) => ({
  modal: false,
  openModal: () => set({ modal: true }),
  closeModal: () => {
    set({ modal: false })
    useAudioStore.getState().reset()
  },
}))

export default useModalStore
