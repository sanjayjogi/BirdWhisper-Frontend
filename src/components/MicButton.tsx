import { MdiMicrophone, MdiMicrophoneOff, TdesignLoad } from './icons'
import useAudioStore from '../zustand/AudioStore'

type MicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  recording: boolean
}

const MicButton = ({ recording, ...props }: MicButtonProps) => {
  const { loading } = useAudioStore()
  const contentJSX = () => {
    if (loading) {
      return <TdesignLoad fontSize={40} className="animate-spin" />
    }
    if (recording) {
      return <MdiMicrophone fontSize={40} />
    }
    return <MdiMicrophoneOff fontSize={40} />
  }
  return (
    <div className="rounded-full bg-white/15 h-[6rem] w-[6rem] flex justify-center items-center">
      <button
        disabled={loading}
        {...props}
        className="rounded-full bg-white opacity-100 h-20 w-20 flex justify-center items-center"
      >
        {contentJSX()}
      </button>
    </div>
  )
}

export default MicButton
