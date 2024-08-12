import { create } from 'zustand'
import axios from 'axios'
import useModalStore from './ModalStore'

export type AudioStore = {
  classifiedBird: string
  loading: boolean
  classifyAudio: (audioFile: File) => Promise<void>
  reset: () => void
}

const useAudioStore = create<AudioStore>((set) => ({
  classifiedBird: '',
  loading: false,
  classifyAudio: async (audioFile) => {
    set({ loading: true })
    const formData = new FormData()
    formData.append('file', audioFile)
    const { data } = await axios.post(
      'https://birdwhisper.onrender.com/upload-audio/',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    if (data.prediction) {
      const [prediction] = data.prediction
      set({ classifiedBird: prediction })
      useModalStore.getState().openModal()
    }
    set({ loading: false })
  },
  reset: () => {
    set({ classifiedBird: '', loading: false })
  },
}))
export default useAudioStore
