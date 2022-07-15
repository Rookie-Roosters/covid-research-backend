import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class CovidInfo extends BaseEntity{
  @ApiProperty({ description: 'This entity contains additional covid data, such as total cases, mortality rates, vaccination rates, and many other information that could become helpful to investigators. This data is primarily used in charts shown to the user that can contain information about the whole world, or about a single country.' })
  @PrimaryColumn({ type: 'varchar', length: 8 })
  iso_code: string;

  @ApiPropertyOptional()
  @Column({ type: 'varchar', length: 32, nullable: true})
  continent?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 32 })
  location: string;
  
  @ApiProperty()  
  @Column({ type: 'date' })
  last_updated_date: Date;

  @ApiPropertyOptional() //cambiar
  @Column({ type: 'int', nullable: true })
  total_cases?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  new_cases?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_cases_smoothed?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  total_deaths?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  new_deaths?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_deaths_smoothed?: Number
  
  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  total_cases_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_cases_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_cases_smoothed_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  total_deaths_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_deaths_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_deaths_smoothed_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  reproduction_rate?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true})
  icu_patients?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  icu_patients_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  hosp_patients?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  hosp_patients_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  weekly_icu_admissions?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  weekly_icu_admissions_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  weekly_hosp_admissions?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  weekly_hosp_admissions_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  total_tests?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  new_tests?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  total_tests_per_thousand?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_tests_per_thousand?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_tests_smoothed?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_tests_smoothed_per_thousand?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  positive_rate?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  tests_per_case?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  tests_units?: Number

  @ApiPropertyOptional()
  @Column({ type: 'bigint', nullable: true })
  total_vaccinations?: Number

  @ApiPropertyOptional()
  @Column({ type: 'bigint', nullable: true })
  people_vaccinated?: Number

  @ApiPropertyOptional()
  @Column({ type: 'bigint', nullable: true })
  people_fully_vaccinated?: Number

  @ApiPropertyOptional()
  @Column({ type: 'bigint', nullable: true })
  total_boosters?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  new_vaccinations?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  new_vaccinations_smoothed?: Number

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  total_vaccinations_per_hundred?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  people_vaccinated_per_hundred?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  people_fully_vaccinated_per_hundred?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  total_boosters_per_hundred?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_vaccinations_smoothed_per_million?: Number

  @ApiPropertyOptional()
  @Column({ type: 'int', nullable: true })
  new_people_vaccinated_smoothed?: Number
  
  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  new_people_vaccinated_smoothed_per_hundred?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  stringency_index?: Number

  @ApiPropertyOptional()
  @Column({ type: 'bigint', nullable: true })
  population?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  population_density?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  median_age?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  aged_65_older?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  aged_70_older?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  gdp_per_capita?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  extreme_poverty?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  cardiovasc_death_rate?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  diabetes_prevalence?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  female_smokers?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  male_smokers?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  handwashing_facilities?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  hospital_beds_per_thousand?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  life_expectancy?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  human_development_index?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  excess_mortality_cumulative_absolute?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  excess_mortality_cumulative?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  excess_mortality?: Number

  @ApiPropertyOptional()
  @Column({ type: 'float', nullable: true })
  excess_mortality_cumulative_per_million?: Number
}
