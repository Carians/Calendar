import { EventType } from "./eventType";

export interface CalendarPropsType{
    events: EventType[],
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>,
    isModifying: boolean,
    setIsModifying: React.Dispatch<React.SetStateAction<boolean>>

}

export interface ModifyPropsType{
    eventInfo: EventType,
    events: EventType[],
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>,
    modal: boolean,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    eventChange: (val: any, key: any) => void
}