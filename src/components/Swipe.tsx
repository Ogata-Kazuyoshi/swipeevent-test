import swipeCheck from "../service/SwipeCheck.ts";
import React, {ReactNode} from "react";

type Props = {
    setIsPopup : (isPopup:boolean)=>void,
    children:  ReactNode
}
export const Swipe:React.FC<Props> = ({
    setIsPopup,
    children
}) => {
    return <>
        <div
            style={{backgroundColor: 'yellow'}}
            onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => swipeCheck.setStartYByTouch(e)}
            onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => swipeCheck.setEndYByTouch(e)}
            onTouchEnd={() => setIsPopup(!swipeCheck.swipeCheck())}
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => swipeCheck.setStartYByMouse(e)}
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => swipeCheck.setEndYByMouse(e)}
            onMouseUp={() => setIsPopup(!swipeCheck.swipeCheck())}
            data-testid='tempTest'
        >
            {children}
        </div>
    </>
}