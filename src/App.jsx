import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [titleText, settitleText] = useState('Open Garage')
  const [pressText, setPressText] = useState('Press E')
  const [keyText, setKeyText] = useState('E')
  const [isVisible, setIsVisible] = useState(false) // New state variable for visibility

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'hideTextUI') {
        setIsVisible(false) // Hide the UI
      }

      if (event.data.type === 'showTextUI') {
        setIsVisible(true) // Show the UI
        if (event.data.titleText) {
          settitleText(event.data.titleText)
        }
        if (event.data.pressText) {
          setPressText(event.data.pressText)
        }
        if (event.data.keyText) {
          setKeyText(event.data.keyText)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  if (!isVisible) {
    return null // Render nothing if not visible
  }

  return (
    <>
      <div className='text_ui_container'>
        <div className='text_ui_box'>
          <div className='text_ui'>
            <h1>{keyText}</h1>
          </div>
          <h1 className='text_ui_text'>{titleText}</h1>
          <h3 className='text_ui_description'>{pressText}</h3>
        </div>
      </div>
    </>
  )
}

export default App
