import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/page/PageNotFound';
import MainPage from './components/page/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Introduction />} />
        <Route path='/record' element={<MainPage />} />
        <Route path="*" element={<PageNotFound />} /> {/* Redirect to Page not found for unknown routes */}

      </Routes>
    </Router>
  );
}

export default App;



function Introduction() {
  const handleStart = () => {
    window.location.href = '/record';
  }
  return (
    <main className='text-center' id='introduction' >
      <header className='mt-5'>
        <h1 className='fw-bold'>Coding Journal</h1>
      </header>
      <p>Welcome to my <strong>coding journal</strong>, a website for recording and tracking your daily coding tasks and thoughts. Stay on top of your activities, jot down your reflections, and make progress every day. Join us now to start documenting your coding journey!</p>

      <div id='start-containerBTN'>
        <button type='button' className='rounded-5' onClick={handleStart}>Start</button>
      </div>
    </main>
  )
}
