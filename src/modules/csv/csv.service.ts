import { Injectable } from '@nestjs/common';
import { ResearchInterface } from '../researches/interfaces/researches.interface';
import { parseFile } from 'fast-csv';
import * as fs from 'fs';
import * as https from 'https';
// import * as csv from 'csv-parser';
import * as puppeteer from 'puppeteer';
import { CovidInfoInterface } from '../covid-info/interfaces/covid-info.interface';
import { join } from 'path';
import csvParser from 'csv-parser';

@Injectable()
export class CsvService {
    rowProcessor(row: object): ResearchInterface | undefined {
        if (row['Date registration3'].length <= 10 && row['web address'].length <= 150) {
            const ageMin = this.getAgeNull(row['Inclusion agemin']);
            const ageMax = this.getAgeNull(row['Inclusion agemax']);

            const a: ResearchInterface = {
                id: this.getProcessedString(row['TrialID']),
                lastRefreshedOn: this.getDateFromWordDate(row['Last Refreshed on']),
                publicTitle: this.getProcessedString(row['Public title']),
                scientificTitle: this.getProcessedStringNull(row['Scientific title']),
                acronym: this.getProcessedStringNull(row['Acronym']),
                primarySponsor: this.getProcessedStringNull(row['Primary sponsor']),
                dateRegistration: this.getDateFromSlashDateNull(row['Date registration']),
                sourceRegister: this.getProcessedStringNull(row['Source Register']), //relationship column
                webAddress: this.getProcessedString(row['web address']),
                recruitmentStatus: this.getProcessedString(row['Recruitment Status']), //relationship column
                otherRecords: this.getBoolFromYesNo(row['other records']),
                inclusionAgeMin: ageMin ? ageMin.age : undefined,
                inclusionAgeMinType: ageMin ? ageMin.type : undefined,
                inclusionAgeMax: ageMax ? ageMax.age : undefined,
                inclusionAgeMaxType: ageMax ? ageMax.type : undefined,
                inclusionGender: this.getCharFromGenderNull(row['Inclusion gender']),
                dateEnrollement: this.getDateFromSlashDateNull(row['Date enrollemente']),
                targetSize: this.getTargetSize(row['Target size']), //relationship column
                studyType: this.getStudyType(row['Study type']), //relationship column
                studyDesign: this.getProcessedStringNull(row['Study design']),
                phase: this.transformPhaseNull(row['Phase']), //relationship column
                countries: this.getCountries(row['Countries']),
                contactFirstname: this.getProcessedStringNull(row['Contact Firstname']),
                contactLastname: this.getProcessedStringNull(row['Contact Lastname']),
                contactAddress: this.getProcessedStringNull(row['Contact Address']),
                contactEmail: this.getProcessedStringNull(row['Contact Email']),
                contactTel: this.getProcessedStringNull(row['Contact Tel']),
                contactAffiliation: this.getProcessedStringNull(row['Contact Affiliation']),
                inclusionCriteria: this.getProcessedStringNull(row['Inclusion Criteria']),
                exclusionCriteria: this.getProcessedStringNull(row['Exclusion Criteria']),
                condition: this.getProcessedStringNull(row['Condition']),
                intervention: this.getProcessedStringNull(row['Intervention']),
                primaryOutcome: this.getProcessedStringNull(row['Primary outcome']),
                secondaryOutcome: this.getProcessedStringNull(row['Secondary outcome']),
                resultsDatePosted: this.getDateFromSlashDateNull(row['results date posted']),
                resultsDateCompleted: this.getDateFromSlashDateNull(row['results date completed']),
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

    getCountries(value: string): string[] {
        const countries: string[] = [];
        if (value) {
            let values = value.split(';');
            if (values[values.length - 1] == '') values.pop();
            value = '';
            for (const val of values) value = value + val + ',';
            values = value.split(',');
            if (values[values.length - 1] == '') values.pop();
            for (let val of values) {
                if (/\(/.test(val)) val = val.substring(0, val.match(/\(/).index);
                countries.push(this.getProcessedString(val.toLowerCase()));
            }
        }
        return countries;
    }

    getAgeNull(value: string):
        | {
              age?: number;
              type: 'years' | 'months' | 'weeks' | 'weeks of pregnacy' | 'days' | 'hours' | 'minutes' | 'no limit';
          }
        | undefined {
        if (value) {
            value = this.getProcessedString(value).toLowerCase();
            if (/^[0-9]*$/.test(value)) {
                return {
                    age: +value,
                    type: 'years',
                };
            } else if ((/year/.test(value) || /^[0-9]+\ {0,1}y$/.test(value) || /age old/.test(value) || /^=[0-9]+$/.test(value)) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'years',
                };
            } else if (/weeks of pregnancy/.test(value) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'weeks of pregnacy',
                };
            } else if ((/month/.test(value) || /^[0-9]+\ {0,1}m$/.test(value)) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'months',
                };
            } else if ((/week/.test(value) || /^[0-9]+\ {0,1}w$/.test(value)) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'weeks',
                };
            } else if ((/day/.test(value) || /^[0-9]+\ {0,1}d$/.test(value)) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'days',
                };
            } else if ((/hour/.test(value) || /^[0-9]+\ {0,1}h$/.test(value)) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'hours',
                };
            } else if (/minute/.test(value) && /[0-9]+/.test(value)) {
                return {
                    age: +value.match(/[0-9]+/)[0],
                    type: 'minutes',
                };
            } else if (/no limit/.test(value)) {
                return {
                    type: 'no limit',
                };
            }
        }
        return undefined;
    }

    transformPhaseNull(value: string): string | undefined {
        if (value) {
            value = this.getProcessedString(value).toLowerCase();
            if (value == 'n/a' || value == 'na' || value == 'not applicable') {
                return 'not applicable';
            } else if (/^phase\ {0,1}-{0,1}\d$/.test(value)) {
                return 'phase ' + value.match(/\d/)[0];
            } else if (/^\d$/.test(value)) {
                return 'phase ' + value;
            } else if (/phase\ {0,1}\d\ {0,1}\/\ {0,1}phase\ {0,1}\d\ {0,1}/.test(value)) {
                const values = value.split('/');
                const a = +values[0].match(/\d/)[0];
                const b = +values[1].match(/\d/)[0];
                if (b == a) return 'phase ' + a;
                if (b < a) return 'phase ' + b + ', phase ' + a;
                return 'phase ' + a + ', phase ' + b;
            } else if (
                /human pharmacology \(phase i\): (yes|no) therapeutic exploratory \(phase ii\): (yes|no) therapeutic confirmatory - \(phase iii\): (yes|no) therapeutic use \(phase iv\): (yes|no)/.test(
                    value,
                )
            ) {
                const p1 = value.match(/\(phase i\): (yes|no)/)[0].match(/(yes|no)/)[0];
                const p2 = value.match(/\(phase ii\): (yes|no)/)[0].match(/(yes|no)/)[0];
                const p3 = value.match(/\(phase iii\): (yes|no)/)[0].match(/(yes|no)/)[0];
                const p4 = value.match(/\(phase iv\): (yes|no)/)[0].match(/(yes|no)/)[0];
                value = '';
                if (p1 == 'yes') value = value + 'phase 1, ';
                if (p2 == 'yes') value = value + 'phase 2, ';
                if (p3 == 'yes') value = value + 'phase 3, ';
                if (p4 == 'yes') value = value + 'phase 4, ';
                return value.slice(0, -2);
            } else if (/human pharmacology/.test(value)) {
                return undefined;
            } else if (/^i{1,3}v{0,1}$/.test(value)) {
                return 'phase ' + this.romanToNumber(value);
            } else if (/^phase i{1,3}v{0,1}$/.test(value)) {
                return 'phase ' + this.romanToNumber(value.match(/i{1,3}v{0,1}/)[0]);
            } else if (/\d-\d/.test(value)) {
                const values = value.split('-');
                let a = +values[0].match(/\d/)[0];
                let b = +values[1].match(/\d/)[0];
                if (b < a) {
                    const c = a;
                    a = b;
                    b = c;
                }
                value = '';
                for (let i = a; i <= b; i++) {
                    value = value + `phase ${i}, `;
                }
                return value.slice(0, -2);
            } else if (/i{1,3}v{0,1}(\/|,)i{1,3}v{0,1}/.test(value)) {
                const values = value.split(/\//.test(value) ? '/' : ',');
                const a = this.romanToNumber(values[0].match(/i{1,3}v{0,1}/)[0]);
                const b = this.romanToNumber(values[1].match(/i{1,3}v{0,1}/)[0]);
                if (b == a) return 'phase ' + a;
                if (b < a) return 'phase ' + b + ', phase ' + a;
                return 'phase ' + a + ', phase ' + b;
            } else if (/i{1,3}v{0,1}-i{1,3}v{0,1}/.test(value)) {
                const values = value.split('-');
                let a = this.romanToNumber(values[0].match(/i{1,3}v{0,1}/)[0]);
                let b = this.romanToNumber(values[1].match(/i{1,3}v{0,1}/)[0]);
                if (b < a) {
                    const c = a;
                    a = b;
                    b = c;
                }
                value = '';
                for (let i = a; i <= b; i++) {
                    value = value + `phase ${i}, `;
                }
                return value.slice(0, -2);
            } else if (value == 'not selected' || value == 'not specified') {
                return undefined;
            } else {
                return value;
            }
        }
        return undefined;
    }

    romanToNumber(value: string): number {
        switch (value) {
            case 'i':
                return 1;
            case 'ii':
                return 2;
            case 'iii':
                return 3;
            case 'iv':
                return 4;
            default:
                0;
        }
    }

    getStudyType(value: string): string {
        value = value.replace('study', '');
        value = value.replace('Study', '');
        return this.getProcessedString(value);
    }

    getTargetSize(value: string): {
        group?: string;
        count?: number;
    }[] {
        const targetSize: {
            group?: string;
            count?: number;
        }[] = [];

        value = this.getProcessedStringNull(value);
        if (value) {
            value = value.toLowerCase();
            if (/^[0-9]*$/.test(value)) {
                targetSize.push({ count: +value });
            } else {
                const values = value.split(';');
                if (values[values.length - 1] == '') values.pop();
                for (const v of values) {
                    let res = v.match(/:\ {0,1}\d+/);
                    if (res) {
                        targetSize.push({
                            group: this.getProcessedString(v.substring(0, res.index)),
                            count: +res[0].match(/\d+/)[0],
                        });
                    } else {
                        res = v.match(/^\d+\ /);
                        if (res) {
                            targetSize.push({
                                group: this.getProcessedString(v.substring(res[0].length, v.length)),
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

    getCharFromGenderNull(value: string): 'Male' | 'Female' | 'Both' | undefined {
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
            else if (value.search('male: no') != -1 && value.search('female: yes') != -1) return 'Female';
            else if (value.search('male: yes') != -1 && value.search('female: no') != -1) return 'Male';
            else if (value.search('female') != -1 || value.search('females') != -1 || value.search('female: yes') != -1 || value == 'f') return 'Female';
            else if (value.search('male') != -1 || value.search('males') != -1 || value.search('male: yes') != -1 || value == 'm') return 'Male';
        }
        return undefined;
    }

    getBoolFromYesNanNull(value: string): boolean | undefined {
        if (value)
            if (value.toLowerCase().search('yes') != -1) return true;
            else if (value.toLowerCase().search('no') != -1) return false;
        return undefined;
    }

    getBoolFromParent(value: string): boolean {
        if (value) if (value.toLowerCase().search('parent') != -1) return true;
        return false;
    }

    getBoolFromFalseTrue(value: string): boolean {
        if (value.search('false') != -1 || value.search('False') != -1) return false;
        return true;
    }

    getBoolFromYesNo(value: string): boolean {
        if (value)
            if (value.toLowerCase().search('yes') != -1 || value.toLowerCase().search('no') != -1) {
                return value.toLowerCase().search('yes') != -1 ? true : false;
            }
        return false;
    }

    getDateFromSlashDateNull(value: string): Date | undefined {
        if (/\d{1,2}\/\d{1,2}\/\d{4}/.test(value)) {
            const d = value.split('/');
            return new Date(parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]));
        }
        return undefined;
    }

    getProcessedStringNull(value: string): string | undefined {
        if (value != '' && value) return this.getProcessedString(value);
        return undefined;
    }

    getProcessedString(value: string): string {
        value = value.replace(/\t/g, ' ');
        value = value.replace(/\n/g, ' ');
        while (value.search('  ') != -1) value = value.replace('  ', ' ');
        while (value[value.length - 1] == ' ') value = value.slice(0, -1);
        while (value[0] == ' ') value = value.substring(1);
        return value;
    }

    getDateFromWordDate(value: string): Date {
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

    private delay(time: number) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    private async whoWebScraping(path: string) {
        await puppeteer
            .launch({
                headless: true,
                args: ['--fast-start', '--disable-extensions', '--no-sandbox'],
                ignoreHTTPSErrors: true,
            })
            .then(async (browser) => {
                const page = await browser.newPage();
                await page.goto('https://trialsearch.who.int/');
                await page.click('input[id=chkCOVIDRestriction]');
                await page.click('input[id=Button1]');
                await page.waitForTimeout(5000);
                const client = await page.target().createCDPSession();
                await client.send('Browser.setDownloadBehavior', {
                    behavior: 'allow',
                    downloadPath: path,
                });
                await page.click('input[id=Button7]');
                await page.waitForTimeout(60 * 1000 * 10);
            });
    }

    async getResearchData(path: string): Promise<ResearchInterface[]> {
        console.log('https://trialsearch.who.int/ web scraping started');
        await this.whoWebScraping(path);
        console.log('web scraping finished');
        console.log('research csv read satarted');
        const researchInterfaces: ResearchInterface[] = await new Promise((resolve, reject) => {
            const data: ResearchInterface[] = [];
            parseFile(join(path, 'IctrpResults.csv'), {
                delimiter: ',',
                headers: true,
                discardUnmappedColumns: true,
            })
                .on('error', reject)
                .on('data', (row) => {
                    const obj = this.rowProcessor(row);
                    if (obj) data.push(obj);
                })
                .on('end', () => {
                    resolve(data);
                });
        });
        await fs.unlinkSync(join(path, 'IctrpResults.csv'));
        console.log('research csv read finished');
        return researchInterfaces;
    }

    getCovidInfoData(path: string): Promise<CovidInfoInterface[]> {
        return new Promise((resolve, reject) => {
            const results: CovidInfoInterface[] = [];
            const file = fs.createWriteStream(join(path, 'covid-data.txt'));
            //get the latest csv file
            https.get('https://covid.ourworldindata.org/data/latest/owid-covid-latest.csv', (response) => {
                const stream = response.pipe(file);
                stream.on('finish', async () => {
                    console.log('covid data csv read satarted');
                    await fs
                        .createReadStream(join(path, 'covid-data.txt'))
                        .pipe(csvParser())
                        .on('data', (data) => {
                            //mssql doesn't automatically convert empty strings to NULL values (and thus, are not accepted in the int and float fields of the database).
                            //it needs to be previously done here:
                            Object.keys(data).forEach((key) => (data[key] = data[key] === '' ? null : data[key]));
                            results.push(data);
                        })
                        .on('end', async () => {
                            resolve(results);
                        })
                        .on('error', reject);
                    await fs.unlinkSync(join(path, 'covid-data.txt'));
                    console.log('covid data csv read finished');
                });
            });
        });
    }
}
