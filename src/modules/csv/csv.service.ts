import { Injectable } from '@nestjs/common';
import { ResearchInterface } from '../researches/interfaces/researches.interface';
import { parseFile } from 'fast-csv';

@Injectable()
export class CsvService {
  private rowProcessor(row: object): ResearchInterface | undefined {
    if (
      row['Date registration3'].length <= 10 &&
      row['web address'].length <= 150
    ) {
      const a: ResearchInterface = {
        trialID: this.getProcessedString(row['TrialID']),
        lastRefreshedOn: this.getDateFromWordDate(row['Last Refreshed on']),
        publicTitle: this.getProcessedString(row['Public title']),
        scientificTitle: this.getProcessedStringNull(row['Scientific title']),
        acronym: this.getProcessedStringNull(row['Acronym']),
        primarySponsor: this.getProcessedStringNull(row['Primary sponsor']),
        dateRegistration: this.getDateFromSlashDateNull(
          row['Date registration'],
        ),
        sourceRegister: this.getProcessedStringNull(row['Source Register']), //relationship column
        webAddress: this.getProcessedString(row['web address']),
        recruitmentStatus: this.getProcessedString(row['Recruitment Status']), //relationship column
        otherRecords: this.getBoolFromYesNo(row['other records']),
        inclusionAgeMin: '',
        inclusionAgeMax: '',
        inclusionGender: this.getCharFromGenderNull(row['Inclusion gender']),
        dateEnrollement: this.getDateFromSlashDateNull(
          row['Date enrollemente'],
        ),
        targetSize: this.getTargetSize(row['Target size']), //relationship column
        studyType: this.getStudyType(row['Study type']), //relationship column
        studyDesign: this.getProcessedStringNull(row['Study design']),
        phase: '',
        countries: '',
        contactFirstname: this.getProcessedStringNull(row['Contact Firstname']),
        contactLastname: this.getProcessedStringNull(row['Contact Lastname']),
        contactAddress: this.getProcessedStringNull(row['Contact Address']),
        contactEmail: this.getProcessedStringNull(row['Contact Email']),
        contactTel: this.getProcessedStringNull(row['Contact Tel']),
        contactAffiliation: this.getProcessedStringNull(
          row['Contact Affiliation'],
        ),
        inclusionCriteria: this.getProcessedStringNull(
          row['Inclusion Criteria'],
        ),
        exclusionCriteria: this.getProcessedStringNull(
          row['Exclusion Criteria'],
        ),
        condition: this.getProcessedStringNull(row['Condition']),
        intervention: this.getProcessedStringNull(row['Intervention']),
        primaryOutcome: this.getProcessedStringNull(row['Primary outcome']),
        secondaryOutcome: this.getProcessedStringNull(row['Secondary outcome']),
        resultsDatePosted: this.getDateFromSlashDateNull(
          row['results date posted'],
        ),
        resultsDateCompleted: this.getDateFromSlashDateNull(
          row['results date completed'],
        ),
        resultsUrlLink: this.getProcessedStringNull(row['results url link']),
        retrospectiveFlag: this.getBoolFromYesNo(row['Retrospective flag']),
        bridgingFlag: this.getBoolFromFalseTrue(row['Bridging flag truefalse']),
        bridgedType: this.getBoolFromParent(row['Bridged type']),
        results: this.getBoolFromYesNo(row['results yes no']),
      };
      return a;
    }
    return undefined;
  }

  private getStudyType(value: string) {
    value = value.replace('study', '');
    value = value.replace('Study', '');
    return this.getProcessedString(value);
  }

  private getTargetSize(value: string): {
    group?: string;
    count?: number;
  }[] {
    let targetSize: {
      group?: string;
      count?: number;
    }[] = [];

    value = this.getProcessedStringNull(value);
    if (value) {
      if (/^[0-9]*$/.test(value)) {
        targetSize.push({ count: +value });
      } else {
        let values = value.split(';');
        if (values[values.length - 1] == '') values.pop();
        for (let v of values) {
          let res = v.match(/:\ {0,1}\d+/);
          if (res) {
            targetSize.push({
              group: v.substring(0, res.index),
              count: +res[0].match(/\d+/)[0],
            });
          } else {
            res = v.match(/^\d+\ /);
            if (res) {
              targetSize.push({
                group: v.substring(res[0].length, v.length),
                count: +res[0].match(/\d+/)[0],
              });
            } else {
              targetSize.push({ group: v });
            }
          }
        }
      }
    }
    return targetSize;
  }

  private getCharFromGenderNull(
    value: string,
  ): 'Male' | 'Female' | 'Both' | undefined {
    if (value) {
      value = this.getProcessedString(value).toLowerCase();
      if (
        value.search('all') != -1 ||
        value.search('both') != -1 ||
        value == 'b' ||
        value.search('male and female') != -1 ||
        value.search('female and male') != -1 ||
        value.search('males and females') != -1 ||
        value.search('females and males') != -1 ||
        value.search('male/female') != -1 ||
        value.search('female/male') != -1 ||
        (value.search('male: yes') != -1 && value.search('female: yes') != -1)
      )
        return 'Both';
      else if (
        value.search('male: no') != -1 &&
        value.search('female: yes') != -1
      )
        return 'Female';
      else if (
        value.search('male: yes') != -1 &&
        value.search('female: no') != -1
      )
        return 'Male';
      else if (
        value.search('female') != -1 ||
        value.search('females') != -1 ||
        value.search('female: yes') != -1 ||
        value == 'f'
      )
        return 'Female';
      else if (
        value.search('male') != -1 ||
        value.search('males') != -1 ||
        value.search('male: yes') != -1 ||
        value == 'm'
      )
        return 'Male';
    }
    return undefined;
  }

  private getBoolFromYesNanNull(value: string): boolean | undefined {
    if (value)
      if (value.toLowerCase().search('yes') != -1) return true;
      else if (value.toLowerCase().search('no') != -1) return false;
    return undefined;
  }

  private getBoolFromParent(value: string): boolean {
    if (value) if (value.toLowerCase().search('parent') != -1) return true;
    return false;
  }

  private getBoolFromFalseTrue(value: string): boolean {
    if (value.search('false') != -1 || value.search('False') != -1)
      return false;
    return true;
  }

  private getBoolFromYesNo(value: string): boolean {
    if (value)
      if (
        value.toLowerCase().search('yes') != -1 ||
        value.toLowerCase().search('no') != -1
      ) {
        return value.toLowerCase().search('yes') != -1 ? true : false;
      }
    return false;
  }

  private getDateFromSlashDateNull(value: string): Date | undefined {
    if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(value)) {
      const d = value.split('/');
      return new Date(parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]));
    }
    return undefined;
  }

  private getProcessedStringNull(value: string): string | undefined {
    if (value == '') return undefined;
    else return this.getProcessedString(value);
  }

  private getProcessedString(value: string): string {
    while (value.search('  ') != -1) value = value.replace('  ', ' ');
    while (value[value.length - 1] == ' ') value = value.slice(0, -1);
    return value;
  }

  private getDateFromWordDate(value: string): Date {
    const wMonth: string = value.match(/\w{3,9}/)[0].toLowerCase();
    let month = 0;
    switch (wMonth) {
      case 'january':
        month = 1;
        break;
      case 'february':
        month = 2;
        break;
      case 'march':
        month = 3;
        break;
      case 'april':
        month = 4;
        break;
      case 'may':
        month = 5;
        break;
      case 'june':
        month = 6;
        break;
      case 'july':
        month = 7;
        break;
      case 'august':
        month = 8;
        break;
      case 'september':
        month = 9;
        break;
      case 'october':
        month = 10;
        break;
      case 'november':
        month = 11;
        break;
      case 'december':
        month = 12;
        break;
    }
    const day: number = parseInt(value.match(/\d{1,2}/)[0]);
    const year: number = parseInt(value.match(/\d{4}/)[0]);
    return new Date(year, month - 1, day);
  }

  getData(path: string): Promise<ResearchInterface[]> {
    return new Promise((resolve, reject) => {
      const data: ResearchInterface[] = [];

      let count = 0;

      parseFile(path, {
        delimiter: ',',
        headers: true,
        discardUnmappedColumns: true,
      })
        .on('error', reject)
        .on('data', (row) => {
          if (count < 100) {
            const obj = this.rowProcessor(row);
            if (obj) data.push(obj);
            count++;
          }
        })
        .on('end', () => {
          resolve(data);
        });
    });
  }
}