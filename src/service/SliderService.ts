import React from "react";

class SliderService {
    flg = false
    position = 0

    setStart(){
        this.flg = true
    }
    setMove (e: React.TouchEvent<HTMLDivElement>) {
        this.position = e.targetTouches[0].clientY-200
        return this.position
    }
    setEnd () {
        this.flg = false
    }
}

const sliderService = new SliderService()
export default sliderService