import swipeCheck from "../../service/SwipeCheck.ts";
import React from "react";

describe('SwipeCheck.tsのテスト', () => {
    test('setStartYにeventを受け取ると、メンバー変数のstartYが置き換わる', () => {
        const event =
            {
                targetTouches:
                    [{
                        clientX: 100,
                        clientY: 200
                    }]
            } as unknown as React.TouchEvent<HTMLDivElement>
        swipeCheck.setStartY(event)

        expect(swipeCheck.startY).toBe(200)
    })
    test('setEndYにeventを受け取ると、メンバー変数のendYが置き換わる', () => {
        const event =
            {
                targetTouches:
                    [{
                        clientX: 100,
                        clientY: 200
                    }]
            } as unknown as React.TouchEvent<HTMLDivElement>
        swipeCheck.setEndY(event)

        expect(swipeCheck.endY).toBe(200)
    })
    test('swipeCheckメソッドを呼び出した際に、s；endYがstartYより大きかった場合だけtrueを返す',()=>{
        swipeCheck.startY = 0
        swipeCheck.endY =10

        expect(swipeCheck.swipeCheck()).toBe(true)

        swipeCheck.startY  =100

        expect(swipeCheck.swipeCheck()).toBe(false)
    })
})