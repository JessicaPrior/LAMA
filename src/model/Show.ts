export enum SHOW_DAYS{
    FRIDAY= 'FRIDAY',
    SATURDAY= 'SATURDAY',
    SUNDAY= 'SUNDAY'
}

export interface Show{
    id: string,
    day: SHOW_DAYS
    hour: string,
    duration: DURATION
}

export enum DURATION{
    ONE = '1h',
    TWO = '2h',
    THREE = '3h'
}