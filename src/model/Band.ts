export class Band{
    constructor(
        private id: string,
        private name: string,
        private genre: string,
        private responsible: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getGenre(){
        return this.genre;
    }

    getResponsible(){
        return this.responsible;
    }

    setId(id: string){
        return this.id = id;
    }

    setName(name: string){
        return this.name = name;
    }

    setGenre(genre: string){
        return this.genre = genre;
    }

    setResponsible(responsible: string){
        return this.responsible = responsible;
    }
}

export interface BandInputDTO{
    name: string,
    genre: string,
    responsible: string
}
