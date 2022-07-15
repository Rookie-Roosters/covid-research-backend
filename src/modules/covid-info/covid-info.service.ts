import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs'
import * as https from 'https';
import { InjectRepository } from '@nestjs/typeorm';
import { CovidInfo } from './entities/covid-info.entity';

@Injectable()
export class CovidInfoService {
  constructor(@InjectRepository(CovidInfo) private covidInfoRepository: Repository<CovidInfo>) { }
  findAll(): Promise<CovidInfo[]> {
    return this.covidInfoRepository.find();
  }

  findOne(iso_code: string): Promise<CovidInfo> {
    try {
      const covidInfo = this.covidInfoRepository.findOneOrFail({
        where:
          { iso_code: iso_code }
        ,
      })
      return covidInfo;
    } catch (err) {

    }
  }



  async updateAll() {
    const results = [];

    //get the latest csv file
    const file = fs.createWriteStream("covid-data.txt");
    https.get("https://covid.ourworldindata.org/data/latest/owid-covid-latest.csv", response => {
      var stream = response.pipe(file);

      //upload data to db
      stream.on("finish", async () => {
        fs.createReadStream('covid-data.txt')
          .pipe(csv())
          .on('data', (data) => {
            //mssql doesn't automatically convert empty strings to NULL values (and thus, are not accepted in the int and float fields of the database).
            //it needs to be previously done here:
            Object.keys(data).forEach(key => data[key] = data[key] === '' ? null : data[key])
            results.push(data)
          })
          .on('end', async () => {
            //mssql doesn't support adding too many parameters at once.
            const size = 30;
            for (let i = 0; i < results.length; i += size) {
              const chunk = results.slice(i, i + size);
              await this.covidInfoRepository.save(chunk).then(()=>{
                if((i+size)> results.length){
                  console.log("Updating worldwide covid data: "+results.length+" of "+results.length)
                  console.log("The database has been successfully updated with the latest covid data.")
                }else
                  console.log("Updating worldwide covid data: "+Number(i+size)+" of "+results.length)
              })
            }
          })
      });
    });
  }
}
