import { create } from 'zustand'
import axios from 'axios'

type FeedBackStore = {
  fileName: string
  feedBack: string
  isLoading: boolean
  isError: boolean
  setFileName: (fileName: string) => void
  setFeedback: (feedBack: string) => void
  postFeedback: (fileName: string, feedback: string) => Promise<void>
  reset: () => void
}

const useFeedBackStore = create<FeedBackStore>((set) => ({
  fileName: '',
  feedBack: '',
  isLoading: false,
  isError: false,
  error: null,
  setFileName: (fileName) => set({ fileName }),
  setFeedback: (feedBack) => set({ feedBack }),
  postFeedback: async (fileName, feedBack) => {
    set({ isLoading: true, isError: false })
    try {
      await axios.post('https://birdwhisper.onrender.com/feedback', {
        fileName,
        feedBack,
      })
    } catch (error) {
      console.log(error)
      set({ isError: true })
    }
    set({ isLoading: false })
  },
  reset: () => {
    set({ fileName: '', feedBack: '', isLoading: false, isError: false })
  },
}))

export default useFeedBackStore