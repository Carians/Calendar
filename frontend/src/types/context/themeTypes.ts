
export interface ThemeState{
    font: string,
    header: string,
    background: string,
    button: string,
}

export interface ThemeContextType {
    theme: ThemeState
    setTheme: React.Dispatch<React.SetStateAction<ThemeState>>
}