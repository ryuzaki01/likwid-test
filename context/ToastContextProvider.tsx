import {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  FC,
  ReactNode,
} from 'react'
import { Provider as ToastProvider } from '@radix-ui/react-toast'
import Toast, { ToastViewport } from 'components/primitives/Toast'
import { v4 as uuidv4 } from 'uuid'

type ToastType = {
  id?: string
  title?: string
  description?: string | ReactNode
  action?: ReactNode
  status?: 'success' | 'error'
}

export const ToastContext = createContext<{
  toasts: Array<ToastType>
  setToasts: Dispatch<SetStateAction<Array<ToastType>>> | null
  addToast: ((toast: ToastType) => void) | null
}>({
  toasts: [],
  setToasts: null,
  addToast: null,
})

const ToastContextProvider: FC<any> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastType>>([])

  const addToast = (toast: ToastType) => {
    toast.id = uuidv4()
    setToasts([...toasts, toast])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, setToasts }}>
      <ToastProvider duration={3000}>
        {children}
        {toasts.map((toast, idx) => {
          return (
            <Toast
              key={idx}
              id={toast.id}
              title={toast.title}
              description={toast.description}
              action={toast.action}
              status={toast.status}
            />
          )
        })}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

export default ToastContextProvider
