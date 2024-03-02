import React from "react";

export class SwipeCheck {
    startY = 0
    endY=0

    setStartY(e: React.TouchEvent<HTMLDivElement>) {
        const startY = e.targetTouches[0].clientY
        this.startY = startY
    }
    setEndY(e: React.TouchEvent<HTMLDivElement>){
        const endY = e.targetTouches[0].clientY
        this.endY=endY
    }
    swipeCheck(){
        return this.startY < this.endY
    }
}

const swipeCheck = new SwipeCheck()
export default  swipeCheck

