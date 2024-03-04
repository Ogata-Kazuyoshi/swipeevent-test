import {fireEvent, render, screen} from "@testing-library/react";
import {Swipe} from "../../components/Swipe.tsx";
import {vi} from "vitest";
import swipeCheck from "../../service/SwipeCheck.ts";

describe('Swipe.tsxのテスト',()=>{
    test('子要素を持ってrenderされた際、その要素をレンダリングしている',()=>{
        const tempArg = vi.fn()
        render(<Swipe setIsPopup={tempArg}>
            <h1>テストヘッダー</h1>
            <div>テストdiv</div>
        </Swipe>)

        expect(screen.getByRole('heading', {name: 'テストヘッダー'})).toBeInTheDocument();
        expect(screen.getByText('テストdiv')).toBeInTheDocument()
    })
    test('開始すると、setStartYByTouchメソッドを呼び出している', async () => {
        const spyTouchStart = vi.spyOn(swipeCheck, 'setStartYByTouch')
        const event = {targetTouches: [{clientX: 100, clientY: 200}]};

        const dummyArg = (_:boolean) =>{}
        render(<Swipe setIsPopup={dummyArg}>
            <h1>テストヘッダー</h1>
            <div>テストdiv</div>
        </Swipe>)

        fireEvent.touchStart(screen.getByText('テストヘッダー').parentElement!,event)

        expect(spyTouchStart).toHaveBeenCalledWith(
            expect.objectContaining({
                targetTouches: [{
                    clientX: 100,
                    clientY: 200
                }]
            }))
    })
    test('スワイプ中、setEndYByTouchメソッドを呼び出している', async () => {
        const spyTouchMove = vi.spyOn(swipeCheck, 'setEndYByTouch')
        const event = {targetTouches: [{clientX: 100, clientY: 200}]};
        const dummyArg = (_:boolean) =>{}
        render(<Swipe setIsPopup={dummyArg}>
            <h1>テストヘッダー</h1>
            <div>テストdiv</div>
        </Swipe>)

        fireEvent.touchMove(screen.getByText('テストヘッダー').parentElement!,event)
        expect(spyTouchMove).toHaveBeenCalledWith(
            expect.objectContaining({
                targetTouches: [{
                    clientX: 100,
                    clientY: 200
                }]
            })
        )
    })
    test('onTouchエンドイベントが発火した際、swipecheckメソッドを呼んで且つ、その帰り値の反転を引数としてsetIsPopupを呼び出す',()=>{
        const spyArg = vi.fn()
        const spySwipechek = vi.spyOn(swipeCheck,'swipeCheck').mockReturnValue(true)

        render(<Swipe setIsPopup={spyArg}>
            <h1>テストヘッダー</h1>
            <div>テストdiv</div>
        </Swipe>)

        fireEvent.touchEnd(screen.getByText('テストヘッダー').parentElement!)

        expect(spySwipechek).toHaveBeenCalled()
        expect(spyArg).toHaveBeenCalledWith(false)
    })
})