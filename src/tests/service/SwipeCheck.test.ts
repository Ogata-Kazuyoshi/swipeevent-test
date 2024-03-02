import swipeCheck from "../../service/SwipeCheck.ts";
import React from "react";

describe('SwipeCheck.tsのテスト', () => {
    describe('スワイプ操作に関して', () => {
        test('setStartYByTouchにeventを受け取ると、メンバー変数のstartYが置き換わる', () => {
            const event =
                {
                    targetTouches:
                        [{
                            clientX: 100,
                            clientY: 200
                        }]
                } as unknown as React.TouchEvent<HTMLDivElement>
            swipeCheck.setStartYByTouch(event)

            expect(swipeCheck.startY).toBe(200)
        })
        test('setEndYByTouchにeventを受け取ると、メンバー変数のendYが置き換わる', () => {
            const event =
                {
                    targetTouches:
                        [{
                            clientX: 100,
                            clientY: 200
                        }]
                } as unknown as React.TouchEvent<HTMLDivElement>
            swipeCheck.setEndYByTouch(event)

            expect(swipeCheck.endY).toBe(200)
        })
    })
    describe('マウス操作に関して', () => {
        test('setStartYByMouseにeventを受け取ると、メンバー変数のstartYが置き換わる', () => {
            const event =
                {
                            clientX: 100,
                            clientY: 200
                } as unknown as React.MouseEvent<HTMLDivElement>
            swipeCheck.setStartYByMouse(event)

            expect(swipeCheck.startY).toBe(200)
        })
        test('setEndYByMouseにeventを受け取ると、メンバー変数のendYが置き換わる', () => {
            const event =
                {
                            clientX: 100,
                            clientY: 200
                } as unknown as React.MouseEvent<HTMLDivElement>
            swipeCheck.setEndYByMouse(event)

            expect(swipeCheck.endY).toBe(200)
        })
    })
    test('swipeCheckメソッドを呼び出した際に、s；endYがstartYより大きかった場合だけtrueを返す', () => {
        swipeCheck.startY = 0
        swipeCheck.endY = 10

        expect(swipeCheck.swipeCheck()).toBe(true)

        swipeCheck.startY = 100

        expect(swipeCheck.swipeCheck()).toBe(false)
    })
})