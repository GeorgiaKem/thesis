import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface IContract {
    title: string,
    description: string,
    status: number,
    path: string,
    starts_at: Date,
    ends_at: Date
}
