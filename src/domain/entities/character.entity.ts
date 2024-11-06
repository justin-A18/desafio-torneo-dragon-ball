export class CharacterEntity {
  constructor(
    public id: string,
    public name: string,
    public speed: number,
    public attack: number,
    public defense: number,
  ) { }
  
  public static fromObject(object: { [key: string]: any }): CharacterEntity {
    const { id, name, speed, attack, defense } = object;

    if (!id) throw new Error("Id is required");
    if (!name) throw new Error("Name is required");
    if (!speed) throw new Error("Speed is required");
    if (!attack) throw new Error("Attack is required");
    if (!defense) throw new Error("Defense is required");

    return new CharacterEntity(id, name, speed, attack, defense);
  }
}