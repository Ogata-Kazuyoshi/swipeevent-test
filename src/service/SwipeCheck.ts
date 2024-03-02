import React from "react";

export class SwipeCheck {
    startY = 0
    endY=0

    setStartYByTouch(e: React.TouchEvent<HTMLDivElement>) {
        const startY = e.targetTouches[0].clientY
        this.startY = startY
    }
    setStartYByMouse(e: React.MouseEvent<HTMLDivElement>) {
        const startY = e.clientY
        this.startY = startY
    }
    setEndYByTouch(e: React.TouchEvent<HTMLDivElement>){
        const endY = e.targetTouches[0].clientY
        this.endY=endY
    }
    setEndYByMouse(e: React.MouseEvent<HTMLDivElement>){
        const endY = e.clientY
        this.endY=endY
    }

    swipeCheck(){
        return this.startY < this.endY
    }
}

const swipeCheck = new SwipeCheck()
export default  swipeCheck

