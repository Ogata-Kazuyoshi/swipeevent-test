import './App.css'
import {Render} from "./pages/Render.tsx";
import {Route, Routes} from "react-router-dom";
import {SwipeHeader} from "./components/SwipeHeader.tsx";
import {SwipeArea} from "./pages/SwipeArea.tsx";
import {RenderComponent} from "./pages/RenderComponent.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path='/' element={<Render/>} />
            <Route path='/swipepage' element={<SwipeHeader/>}>
                <Route path='swipearea' element={<SwipeArea />} />
            </Route>
            <Route path='/swipecomponent' element={<RenderComponent />} />
        </Routes>
    </>
  )
}

export default App
