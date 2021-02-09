import { Show, ShowOutputDTO, SHOW_DAYS } from '../model/Show';
import BaseDataBase from './BaseDatabase';

export class ShowDataBase extends BaseDataBase {

    public async createShow(
        id: string,
        week_day: SHOW_DAYS,
        start_time: number,
        end_time: number,
        band_id: string
    ): Promise<void> {
        try {
            await BaseDataBase.connection
                .insert({
                    id,
                    week_day,
                    start_time,
                    end_time,
                    band_id
                })
                .into(this.tableNames.shows)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getShowsByDay(weekDay: SHOW_DAYS): Promise<ShowOutputDTO[]> {
        const shows = await BaseDataBase.connection.raw(`
            SELECT 
                s.id as id,
                b.id as bandId,
                b.name as bandName,
                s.start_time as startTime,
                s.end_time as endTime,
                s.week_day as weekDay,
                b.music_genre as musicGenre
            FROM ${this.tableNames.shows} s
            LEFT JOIN ${this.tableNames.bands} b ON b.id = s.band_id
            WHERE s.week_day = "${weekDay}"
            ORDER BY startTime ASC
        `)

        return shows[0].map((data: any) => ({
                id: data.id,
                bandId: data.bandId,
                startTime: data.startTime,
                endTime: data.endTime,
                weekDay: data.weekDay,
                mainGenre: data.mainGenre
        }))
    }
}