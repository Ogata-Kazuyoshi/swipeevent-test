import {render,screen} from "@testing-library/react";
import {Swipe} from "../../components/Swipe.tsx";

describe('Swipe.tsxのテスト',()=>{
    test('子要素を持ってrenderされた際、その要素をレンダリングしている',()=>{
        const tempArg = (flg:boolean):void =>{
            console.log(flg)
        }
        render(<Swipe setIsPopup={tempArg}>
            <h1>テストヘッダー</h1>
            <div>テストdiv</div>
        </Swipe>)

        expect(screen.getByRole('heading', {name: 'テストヘッダー'})).toBeInTheDocument();
        expect(screen.getByText('テストdiv')).toBeInTheDocument()
    })
})