import {useState} from "react";
import {Swipe} from "../components/Swipe.tsx";

export const RenderComponent = () =>{
    const [isPopup, setIsPopup] = useState(false)
    return<>
        <button onClick={()=> setIsPopup(true)}>ポップアップ</button>
        {isPopup &&
            <Swipe setIsPopup={setIsPopup}>
                <h1>ポップアップ画面</h1>
                <div style={{height: '200px'}}>下にスワイプすると消えます</div>
            </Swipe>
        }
    </>
}