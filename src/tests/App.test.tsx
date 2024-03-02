import {act, render} from "@testing-library/react";
import App from "../App.tsx";
import {vi} from "vitest";
import {Render} from "../pages/Render.tsx";
import {BrowserRouter, Outlet} from "react-router-dom";
import {SwipeHeader} from "../components/SwipeHeader.tsx";
import {SwipeArea} from "../pages/SwipeArea.tsx";

vi.mock("../pages/Render.tsx")
vi.mock("../components/SwipeHeader.tsx")
vi.mock('../pages/SwipeArea.tsx')
describe('App.tesxのテスト',()=>{
    test('/にアクセスした際に、Renderコンポーネントを呼んでいること',async ()=>{
        await renderWrappedApp('/')
        expect(Render).toHaveBeenCalled()
    })
    test('/swipepageにアクセスした際に、SwipeHeaderコンポーネントを呼んでいること',async ()=>{
        await renderWrappedApp('/swipepage')
        expect(SwipeHeader).toHaveBeenCalled()
    })
    test('/swipepage/swipeareaにアクセスした際に、SwipeAreaコンポーネントを呼んでいること',async ()=>{
        vi.mocked(SwipeHeader).mockReturnValue(<Outlet />)

        await renderWrappedApp('/swipepage/swipearea')
        expect(SwipeArea).toHaveBeenCalled()
    })
})

const renderWrappedApp = async (url: string) => {
    await act(async () => {
        window.history.pushState({}, "", url)
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        )
    })
}