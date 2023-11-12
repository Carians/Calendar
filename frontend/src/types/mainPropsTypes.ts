import { ThemeState } from "./context/themeTypes"

export interface MainPropsType{
    userData: {
        username: string,
    }
    session: string | null,
    theme: ThemeState
}