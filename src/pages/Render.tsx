import  {useState} from "react";
import swipeCheck from "../service/SwipeCheck.ts";

export const Render = () =>{
    const [isPopup, setIsPopup] = useState(false)
    return<>
        <button onClick={()=> setIsPopup(true)}>ポップアップ</button>
        {isPopup &&
        <div
            style={{backgroundColor:'yellow'}}
            onTouchStart={(e: React.TouchEvent<HTMLDivElement>)=> swipeCheck.setStartYByTouch(e) }
            onTouchMove={(e: React.TouchEvent<HTMLDivElement>)=> swipeCheck.setEndYByTouch(e) }
            onTouchEnd={()=> setIsPopup(!swipeCheck.swipeCheck())}
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>)=> swipeCheck.setStartYByMouse(e) }
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>)=> swipeCheck.setEndYByMouse(e) }
            onMouseUp={()=> setIsPopup(!swipeCheck.swipeCheck())}
            data-testid='tempTest'
        >
            <h1>ポップアップ画面</h1>
            <div style={{height:'200px'}}>下にスワイプすると消えます</div>
        </div>
        }
    </>
}