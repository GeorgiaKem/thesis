export interface IProfessor {
    prof_id: number,
    surname: string,
    name: string,
    full_name: string,
    uname: string,
    is_admin: number,
    is_monimos: number,
    is_virtual: number,
    email: string,
    default_full_hours: number,
    semesters: [],
    contracts: {},
    permits: {}
}
