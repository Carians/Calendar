
export interface EventType{
    title: string,
    description: string,
    start: Date,
    end: Date,
    id: number
}

export interface EventTypeAPI{
    name: string,
    description: string,
    start_time: string,
    end_time: string,
    id: number
}