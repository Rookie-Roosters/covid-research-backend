import { ApiProperty } from "@nestjs/swagger";

export class CovidInfoDto {
    @ApiProperty({
        description:
            'This entity contains additional covid data, such as total cases, mortality rates, vaccination rates, and many other information that could become helpful to investigators. This data is primarily used in charts shown to the user that can contain information about the whole world, or about a single country.',
    })
    iso_code: string;

    @ApiProperty()
    continent?: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    last_updated_date: Date;

    @ApiProperty() //cambiar
    total_cases?: Number;

    @ApiProperty()
    new_cases?: Number;

    @ApiProperty()
    new_cases_smoothed?: Number;

    @ApiProperty()
    total_deaths?: Number;

    @ApiProperty()
    new_deaths?: Number;

    @ApiProperty()
    new_deaths_smoothed?: Number;

    @ApiProperty()
    total_cases_per_million?: Number;

    @ApiProperty()
    new_cases_per_million?: Number;

    @ApiProperty()
    new_cases_smoothed_per_million?: Number;

    @ApiProperty()
    total_deaths_per_million?: Number;

    @ApiProperty()
    new_deaths_per_million?: Number;

    @ApiProperty()
    new_deaths_smoothed_per_million?: Number;

    @ApiProperty()
    reproduction_rate?: Number;

    @ApiProperty()
    icu_patients?: Number;

    @ApiProperty()
    icu_patients_per_million?: Number;

    @ApiProperty()
    hosp_patients?: Number;

    @ApiProperty()
    hosp_patients_per_million?: Number;

    @ApiProperty()
    weekly_icu_admissions?: Number;

    @ApiProperty()
    weekly_icu_admissions_per_million?: Number;

    @ApiProperty()
    weekly_hosp_admissions?: Number;

    @ApiProperty()
    weekly_hosp_admissions_per_million?: Number;

    @ApiProperty()
    total_tests?: Number;

    @ApiProperty()
    new_tests?: Number;

    @ApiProperty()
    total_tests_per_thousand?: Number;

    @ApiProperty()
    new_tests_per_thousand?: Number;

    @ApiProperty()
    new_tests_smoothed?: Number;

    @ApiProperty()
    new_tests_smoothed_per_thousand?: Number;

    @ApiProperty()
    positive_rate?: Number;

    @ApiProperty()
    tests_per_case?: Number;

    @ApiProperty()
    tests_units?: Number;

    @ApiProperty()
    total_vaccinations?: Number;

    @ApiProperty()
    people_vaccinated?: Number;

    @ApiProperty()
    people_fully_vaccinated?: Number;

    @ApiProperty()
    total_boosters?: Number;

    @ApiProperty()
    new_vaccinations?: Number;

    @ApiProperty()
    new_vaccinations_smoothed?: Number;

    @ApiProperty()
    total_vaccinations_per_hundred?: Number;

    @ApiProperty()
    people_vaccinated_per_hundred?: Number;

    @ApiProperty()
    people_fully_vaccinated_per_hundred?: Number;

    @ApiProperty()
    total_boosters_per_hundred?: Number;

    @ApiProperty()
    new_vaccinations_smoothed_per_million?: Number;

    @ApiProperty()
    new_people_vaccinated_smoothed?: Number;

    @ApiProperty()
    new_people_vaccinated_smoothed_per_hundred?: Number;

    @ApiProperty()
    stringency_index?: Number;

    @ApiProperty()
    population?: Number;

    @ApiProperty()
    population_density?: Number;

    @ApiProperty()
    median_age?: Number;

    @ApiProperty()
    aged_65_older?: Number;

    @ApiProperty()
    aged_70_older?: Number;

    @ApiProperty()
    gdp_per_capita?: Number;

    @ApiProperty()
    extreme_poverty?: Number;

    @ApiProperty()
    cardiovasc_death_rate?: Number;

    @ApiProperty()
    diabetes_prevalence?: Number;

    @ApiProperty()
    female_smokers?: Number;

    @ApiProperty()
    male_smokers?: Number;

    @ApiProperty()
    handwashing_facilities?: Number;

    @ApiProperty()
    hospital_beds_per_thousand?: Number;

    @ApiProperty()
    life_expectancy?: Number;

    @ApiProperty()
    human_development_index?: Number;

    @ApiProperty()
    excess_mortality_cumulative_absolute?: Number;

    @ApiProperty()
    excess_mortality_cumulative?: Number;

    @ApiProperty()
    excess_mortality?: Number;

    @ApiProperty()
    excess_mortality_cumulative_per_million?: Number;
}
