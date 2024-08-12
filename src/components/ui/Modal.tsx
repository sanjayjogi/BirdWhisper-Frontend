export type ModalProps = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
} & React.HTMLAttributes<HTMLDivElement>

const Modal = ({ open, onClose, children, ...props }: ModalProps) => {
  return (
    <div
    onClick={onClose}
    className={`
    fixed inset-0 flex justify-center items-center transition-colors
    ${open ? 'visible bg-black/50' : 'invisible'}
    `}
      {...props}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-md transition-all py-6 px-5  overflow-y-auto ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          className="w-auto p-1  absolute top-1 right-1 z-10"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
