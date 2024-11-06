import { CharacterEntity } from "../../domain/entities";

import { FileService } from "../file/file.service";

export class CharacterService {
  constructor(private readonly fileService: FileService) {}

  getAll(): CharacterEntity[] {
    const characters = (this.fileService.readDB("./src/data/characters.json") ||
      []) as CharacterEntity[];

    return characters;
  }
}
