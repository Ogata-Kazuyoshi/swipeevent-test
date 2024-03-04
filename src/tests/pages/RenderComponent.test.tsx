import {render, screen} from "@testing-library/react";
import {RenderComponent} from "../../pages/RenderComponent.tsx";
import {vi} from "vitest";
import {useState} from "react";
import {Swipe} from "../../components/Swipe.tsx";

vi.mock("../../components/Swipe.tsx",()=>{
    const actual = vi.importActual("../../components/Swipe.tsx")
    return ({
        ...actual,
        Swipe : vi.fn(({children}) => <div data-testid='Swipe-test'>{children}</div>)
        //子要素をレンダリングできるように、偽物を用意しておく
    })
})
vi.mock('react',()=>{
    const actual = vi.importActual('react')
    return ({
        ...actual,
        useState : vi.fn((initialValue)=>[initialValue,vi.fn()])
        //useStateの初期値、セット関数にスパイ、ダミーを仕込めるようにモック化する
    })
})

describe('RenderComponent.tsxのテスト',()=>{
    test('レンダーされるとポップアップボタンが表示されていること',()=>{
        render(<RenderComponent />)

        expect(screen.getByRole('button',{name : 'ポップアップ'})).toBeInTheDocument()
    })
    test('isPopupがtrueの場合、正しい要素が表示されている',()=>{
        vi.mocked(useState).mockReturnValue([true,vi.fn()]) //isPopupのステートを強制的にtrueにする
        render(<RenderComponent />)

        expect(screen.getByRole('heading', {name : 'ポップアップ画面'})).toBeInTheDocument()
        expect(screen.getByText('下にスワイプすると消えます')).toBeInTheDocument()
    })
    test('isPopupがtrueの場合、正しい引数でSwipeコンポーネントを呼んでいること',()=>{
        const dummySetIsPopup = vi.fn()
        vi.mocked(useState).mockReturnValue([true,dummySetIsPopup]) //isPopupのステートを強制的にtrueにする

        render(<RenderComponent />)

        expect(Swipe).toHaveBeenCalledWith(
            expect.objectContaining({
                setIsPopup : dummySetIsPopup,
            }),
            {}
        )

    })
    test('isPopupがfalseの場合、正しい要素が表示されている',()=>{
        vi.mocked(useState).mockReturnValue([false,vi.fn()]) //isPopupのステートを強制的にtrueにする
        render(<RenderComponent />)

        expect(screen.queryByRole('heading', {name : 'ポップアップ画面'})).toBeNull()
        expect(screen.queryByText('下にスワイプすると消えます')).toBeNull()
    })
})