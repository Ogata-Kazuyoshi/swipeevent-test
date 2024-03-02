import {render, screen} from "@testing-library/react";
import {SwipeHeader} from "../../components/SwipeHeader.tsx";

describe('SwipeHeader.tsxのテスト',()=>{
    test('SwipeHeaderコンポーネントがレンダリングされるとHeaderというテキストが表示される',()=>{
        render(<SwipeHeader />)

        expect(screen.getByRole('heading',{name : 'Header'})).toBeInTheDocument()
    })
})