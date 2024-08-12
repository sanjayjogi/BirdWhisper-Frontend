import Modal from './ui/Modal'
import useAudioStore from '../zustand/AudioStore'
import useModalStore from '../zustand/ModalStore'
import useFeedBackStore from '../zustand/FeedBackStore'
import { makeFirstCapital } from '../utils'

const FeedBackModal = () => {
  const { classifiedBird } = useAudioStore()
  const { modal, closeModal } = useModalStore()

  const { feedBack, setFeedback, postFeedback, isError, isLoading } =
    useFeedBackStore()

  const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await postFeedback(classifiedBird, feedBack)
    setFeedback('')
  }

  const image = classifiedBird
    ? `https://images.unsplash.com/photo-1630970460907-50c5d2a0313c`
    : ''
  return (
    <Modal open={modal} onClose={() => closeModal()}>
      <div className="space-y-3">
        <img
          className="h-[40vh] w-[90vw]   md:h-[50vh] md:w-[30vw]"
          src={image}
          alt=""
        />
        <div className="text-center p-3 rounded-md bg-slate-300">
          <p>{makeFirstCapital(classifiedBird)}</p>
        </div>
        <div>
          <p className="font-bold">Feedback :</p>
          <form onSubmit={submit} className="space-y-3">
            <textarea
              value={feedBack}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-12 p-1 bg-slate-300 border border-gray-300 rounded-lg"
            />
            <center>
              {isError && (
                <p className="text-red-500">
                  Something went wrong. Please try again later.
                </p>
              )}
              {isLoading && <p className="text-blue-500">Loading...</p>}
              <button
                disabled={isLoading}
                className="bg-blue-300 p-2 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      </div>
    </Modal>
  )
}

export default FeedBackModal
