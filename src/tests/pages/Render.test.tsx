import {fireEvent, render, screen} from '@testing-library/react';
import {Render} from '../../pages/Render.tsx';
import {userEvent} from '@testing-library/user-event';
import swipeCheck from "../../service/SwipeCheck.ts";
import {vi} from "vitest";
import {useNavigate} from "react-router-dom";
import * as reactRouter from "react-router-dom"

vi.mock("../service/SwipeCheck.ts")
vi.mock('react-router-dom')
describe('Render.tsxのテスト', () => {

    describe('Renderをレンダリングすると',()=>{
        test('ポップアップボタンが存在すること', () => {
            render(<Render/>);

            expect(
                screen.getByRole('button', {name: 'ポップアップ'})
            ).toBeInTheDocument();
        });
        test('スライドページボタンが存在すること', () => {
            render(<Render/>);

            expect(
                screen.getByRole('button', {name: 'スライドページ'})
            ).toBeInTheDocument();
        });
    })
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

            test('開始すると、setStartYByTouchメソッドを呼び出している', async () => {
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
            test('スワイプ中、setEndYByTouchメソッドを呼び出している', async () => {
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
        describe('マウス操作動作に関して',()=>{
            beforeEach(async ()=>{
                render(<Render/>);
                await userEvent.click(screen.getByRole('button', {name: "ポップアップ"}))
            })
            afterEach(()=>{
                vi.restoreAllMocks()
            })

            test('開始すると、setStartYByMouseメソッドを呼び出している', async () => {
                const spyMouseStart = vi.spyOn(swipeCheck, 'setStartYByMouse')
                const event = {clientX: 100, clientY: 200};

                fireEvent.mouseDown(screen.getByTestId('tempTest'), event)
                expect(spyMouseStart).toHaveBeenCalledWith(
                    expect.objectContaining({
                            clientX: 100,
                            clientY: 200
                    }))
            })
            test('マウス動作中、setEndYByMouseメソッドを呼び出している', async () => {

                const spyMouseMove = vi.spyOn(swipeCheck, 'setEndYByMouse')
                const event = {clientX: 100, clientY: 200};

                fireEvent.mouseMove(screen.getByTestId('tempTest'), event)
                expect(spyMouseMove).toHaveBeenCalledWith(
                    expect.objectContaining({
                        clientX:100,
                        clientY:200
                    })
                )
            })
            test('マウス動作を終了すると、swipeCheckメソッドを呼んでいる', async () => {
                const spyMouseEnd = vi.spyOn(swipeCheck, 'swipeCheck')

                fireEvent.mouseUp(screen.getByTestId('tempTest'));
                expect(spyMouseEnd).toHaveBeenCalled()
            })
            test('マウス操作を終了すると、swipeCheckメソッドを呼びその帰り値がtrueの場合はポップアップが非表示になる', async () => {
                const spyMouseEnd = vi.spyOn(swipeCheck, 'swipeCheck').mockReturnValue(true)

                fireEvent.mouseUp(screen.getByTestId('tempTest'));
                expect(spyMouseEnd).toHaveBeenCalled()

                expect(screen.queryByRole('heading',{name:'ポップアップ画面'})).toBeNull()
            })
            test('マウス操作を終了すると、swipeCheckメソッドを呼びその帰り値がfalseの場合はポップアップは表示されたままになる', async () => {

                const spyMouseEnd = vi.spyOn(swipeCheck, 'swipeCheck').mockReturnValue(false)

                fireEvent.mouseUp(screen.getByTestId('tempTest'));
                expect(spyMouseEnd).toHaveBeenCalled()
                expect(screen.queryByRole('heading',{name:'ポップアップ画面'})).toBeInTheDocument()
            })
        })
    })
    describe('スライドページボタンを押すと,',()=>{
        test('Navigateを/swipepage/swipeareaを引数として呼ぶ',async ()=>{
            const spyNavigate = vi.fn()
            vi.mocked(useNavigate).mockReturnValue(spyNavigate)
            render(<Render />)

            await userEvent.click(screen.getByRole('button',{name : 'スライドページ'}))

            expect(spyNavigate).toHaveBeenCalledWith('/swipepage/swipearea')
        })
    })

    describe('スライドページボタンを押すと,',()=>{
        test('Navigateを/swipepage/swipeareaを引数として呼ぶ',async ()=>{
            const spyNavigate = vi.fn()
            vi.spyOn(reactRouter, 'useNavigate').mockReturnValue(spyNavigate)
            render(<Render />)

            await userEvent.click(screen.getByRole('button',{name : 'スライドページ'}))

            expect(spyNavigate).toHaveBeenCalledWith('/swipepage/swipearea')
        })
    })
});
