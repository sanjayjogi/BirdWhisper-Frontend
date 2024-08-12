import { useState, useRef, useEffect } from 'react'
import MicButton from './MicButton'
import useAudioStore from '../zustand/AudioStore'
import { useTimer } from 'react-timer-hook'
// @ts-expect-error no type definition for lib
import { LiveAudioVisualizer } from 'react-audio-visualize'

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])
  const { classifyAudio, loading } = useAudioStore()

  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp: new Date(new Date().getTime() + 1 * 59 * 1000),
    onExpire: () => {
      stopRecording()
    },
    autoStart: false,
  })

  useEffect(() => {
    if (!loading && recording) {
      restart(new Date(new Date().getTime() + 1 * 59 * 1000))
    }
  }, [loading, recording, restart])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    mediaRecorderRef.current = new MediaRecorder(stream)
    mediaRecorderRef.current.start()
    start()
    setRecording(true)

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data)
    }

    mediaRecorderRef.current.onstop = () => {
      pause()
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/mp3' })
      const file = new File([audioBlob], 'recording.mp3', {
        type: 'audio/mp3',
        lastModified: Date.now(),
      })
      classifyAudio(file)
      audioChunks.current = []
    }
    setMediaRecorder(mediaRecorderRef.current)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setRecording(false)
      setMediaRecorder(null)
    }
  }

  const onClick = () => {
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="relative flex justify-center">
      <div className="absolute -top-20 p-2 bg-white/30 rounded-md">{`${minutes}:${
        59 - seconds
      }`}</div>
      <MicButton recording={recording} onClick={() => onClick()} />
      <div className="absolute -bottom-[7rem]">
        {mediaRecorder && (
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            width={window.innerWidth * (70 / 100)}
            height={75}
            barWidth={6} // Make bars wider for a smoother look
            gap={10} // Reduce the gap between bars for continuity
            barColor="#82b1ff" // Light blue for unplayed bars
            barPlayedColor="#ffffff" // White for played bars
            style={{
              borderRadius: '15px', // Rounded corners
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // Optional shadow for a more polished look
            }}
          />
        )}
      </div>
    </div>
  )
}

export default AudioRecorder
