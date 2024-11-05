import fs from 'fs';

export class FileService{

  saveDB(filePath: string, data: Record<string,any>[]){
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  readDB(filePath: string) {
    if (!fs.existsSync(filePath)) return null;
    
    const info = fs.readFileSync(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;
  }

}