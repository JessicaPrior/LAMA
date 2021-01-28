import { BaseError } from '../error/BaseError';

export class Show {
    constructor(
        public id: string,
        public weekDay: SHOW_DAYS,
        public bandId: string,
        public startTime: number,
        public endTime: number
    ) { }

    public static toShowDaysEnum(data?: any): SHOW_DAYS {
        switch (data) {
            case "FRIDAY":
                return SHOW_DAYS.FRIDAY
            case "SATURDAY":
                return SHOW_DAYS.SATURDAY
            case "SUNDAY":
                return SHOW_DAYS.SUNDAY
            default:
                throw new BaseError("Invalid Day", 401)
        }
    }

    public static toShow(data?: any) {
        return (data && new Show(
            data.id,
            Show.toShowDaysEnum(data.day),
            data.bandId,
            data.startTime,
            data.endTime
        ))
    }
}

export enum SHOW_DAYS {
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY'
}

export interface ShowInputDTO{
    bandId: string
    weekDay: SHOW_DAYS
    startTime: number
    endTime: number
}

export interface ShowOutputDTO{
    id: string
    bandId: string
    weekDay: SHOW_DAYS
    startTime: number
    endTime: number
    bandName?: string
    mainGenre?: string
}
