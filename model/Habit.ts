export class Habit {
    id: string;
    fullName: string;
    points: number;

    constructor(
        id: string,
        fullName: string,
        points: number
    ) {
        this.id = id;
        this.fullName = fullName;
        this.points = points
    }
}
