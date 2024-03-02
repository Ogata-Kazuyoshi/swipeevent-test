import {fireEvent, render, screen} from '@testing-library/react';
import {Render} from '../../pages/Render.tsx';
import {userEvent} from '@testing-library/user-event';
import swipeCheck from "../../service/SwipeCheck.ts";
import {vi} from "vitest";

vi.mock("../service/SwipeCheck.ts")

describe('Render.tsxのテスト', () => {
    test('Renderをレンダリングすると、ポップアップボタンが存在すること', () => {
        render(<Render/>);

        expect(
            screen.getByRole('button', {name: 'ポップアップ'})
        ).toBeInTheDocument();
    });
    describe('ポップアップボタンを押すと',()=>{
        test('適切な要素が表示されること', async () => {
            render(<Render/>);
            await userEvent.click(screen.getByRole('button', {name: 'ポップアップ'}));

            expect(screen.getByRole('heading', {name: 'ポップアップ画面'}));
            expect(screen.getByText('下にスワイプすると消えます'));
        });
        describe('スワイプ動作に関して',()=>{
            beforeEach(async ()=>{
                render(<Render/>);
                await userEvent.click(screen.getByRole('button', {name: "ポップアップ"}))
            })
            afterEach(()=>{
                vi.restoreAllMocks()
            })

            test('開始すると、setStartYメソッドを呼び出している', async () => {
                const spyTouchStart = vi.spyOn(swipeCheck, 'setStartYByTouch')
                const event = {targetTouches: [{clientX: 100, clientY: 200}]};

                fireEvent.touchStart(screen.getByTestId('tempTest'), event)
                expect(spyTouchStart).toHaveBeenCalledWith(
                    expect.objectContaining({
                        targetTouches: [{
                            clientX: 100,
                            clientY: 200
                        }]
                    }))
            })
            test('スワイプ中、setEndYメソッドを呼び出している', async () => {
                const spyTouchMove = vi.spyOn(swipeCheck, 'setEndYByTouch')
                const event = {targetTouches: [{clientX: 100, clientY: 200}]};

                fireEvent.touchMove(screen.getByTestId('tempTest'), event)
                expect(spyTouchMove).toHaveBeenCalledWith(
                    expect.objectContaining({
                        targetTouches: [{
                            clientX: 100,
                            clientY: 200
                        }]
                    })
                )
            })
            test('スワイプを終了すると、swipeCheckメソッドを呼んでいる', async () => {
                const spyTouchEnd = vi.spyOn(swipeCheck, 'swipeCheck')

                fireEvent.touchEnd(screen.getByTestId('tempTest'));
                expect(spyTouchEnd).toHaveBeenCalled()
            })
            test('スワイプを終了すると、swipeCheckメソッドを呼びその帰り値がtrueの場合はポップアップが非表示になる', async () => {
                const spyTouchEnd = vi.spyOn(swipeCheck, 'swipeCheck').mockReturnValue(true)

                fireEvent.touchEnd(screen.getByTestId('tempTest'));
                expect(spyTouchEnd).toHaveBeenCalled()
                expect(screen.queryByRole('heading',{name:'ポップアップ画面'})).toBeNull()
            })
            test('スワイプを終了すると、swipeCheckメソッドを呼びその帰り値がfalseの場合はポップアップは表示されたままになる', async () => {
                const spyTouchEnd = vi.spyOn(swipeCheck, 'swipeCheck').mockReturnValue(false)

                fireEvent.touchEnd(screen.getByTestId('tempTest'));
                expect(spyTouchEnd).toHaveBeenCalled()
                expect(screen.queryByRole('heading',{name:'ポップアップ画面'})).toBeInTheDocument()
            })
        })
    })
});
