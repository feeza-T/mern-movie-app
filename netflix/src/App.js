import Body from "./components/Body";
import { Toaster } from 'react-hot-toast'; 
import MovieDialog from "./components/MovieDialog";
//import Footer from './components/Footer'; // Import the footer

function App() {
  return (
    <div>
       <Body/>
       <Toaster/>  
       <MovieDialog/>
       
    </div>
  );
}

export default App;
