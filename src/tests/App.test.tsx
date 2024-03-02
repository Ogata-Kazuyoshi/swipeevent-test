import {render} from "@testing-library/react";
import App from "../App.tsx";
import {vi} from "vitest";
import {Render} from "../pages/Render.tsx";

vi.mock("../pages/Render.tsx")
describe('App.tesxのテスト',()=>{
    test('Appをレンダリングすると、Vite + Reactの文字列が存在する',()=>{
        render(<App/>)

        expect(Render).toHaveBeenCalled()
    })
})