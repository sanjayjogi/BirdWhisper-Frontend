import AudioRecorder from './components/AudioRecorder'
import FeedBackModal from './components/FeedBackModal'

const App = () => {
  return (
    <>
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <AudioRecorder />
      </div>
      <FeedBackModal />
    </>
  )
}

export default App
