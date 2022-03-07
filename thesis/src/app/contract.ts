export class Contract {
  constructor(
    public prof_id: number,
    public title: string,
    public description: string,
    public starts_at: string,
    public ends_at: string,
    public path: File
  ) { }
}
