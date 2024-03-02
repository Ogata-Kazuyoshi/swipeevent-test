import {render, screen} from "@testing-library/react";
import {SwipeArea} from "../../pages/SwipeArea.tsx";

describe('SwipeArea.tsxのテスト',()=>{
    test('レンダーすると、上部エリアというテキストが表示されること',()=>{
        render(<SwipeArea />)

        expect(screen.getByText('上部エリア')).toBeInTheDocument()
    })
    test('レンダーすると、下部エリアというテキストが表示されること',()=>{
        render(<SwipeArea />)

        expect(screen.getByText('下部エリア')).toBeInTheDocument()
    })

})