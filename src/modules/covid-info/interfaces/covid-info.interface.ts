export interface CovidInfoInterface {
    iso_code: string;
    continent?: string;
    location: string;
    last_updated_date: Date;
    total_cases?: Number;
    new_cases?: Number;
    new_cases_smoothed?: Number;
    total_deaths?: Number;
    new_deaths?: Number;
    new_deaths_smoothed?: Number;
    total_cases_per_million?: Number;
    new_cases_per_million?: Number;
    new_cases_smoothed_per_million?: Number;
    total_deaths_per_million?: Number;
    new_deaths_per_million?: Number;
    new_deaths_smoothed_per_million?: Number;
    reproduction_rate?: Number;
    icu_patients?: Number;
    icu_patients_per_million?: Number;
    hosp_patients?: Number;
    hosp_patients_per_million?: Number;
    weekly_icu_admissions?: Number;
    weekly_icu_admissions_per_million?: Number;
    weekly_hosp_admissions?: Number;
    weekly_hosp_admissions_per_million?: Number;
    total_tests?: Number;
    new_tests?: Number;
    total_tests_per_thousand?: Number;
    new_tests_per_thousand?: Number;
    new_tests_smoothed?: Number;
    new_tests_smoothed_per_thousand?: Number;
    positive_rate?: Number;
    tests_per_case?: Number;
    tests_units?: Number;
    total_vaccinations?: Number;
    people_vaccinated?: Number;
    people_fully_vaccinated?: Number;
    total_boosters?: Number;
    new_vaccinations?: Number;
    new_vaccinations_smoothed?: Number;
    total_vaccinations_per_hundred?: Number;
    people_vaccinated_per_hundred?: Number;
    people_fully_vaccinated_per_hundred?: Number;
    total_boosters_per_hundred?: Number;
    new_vaccinations_smoothed_per_million?: Number;
    new_people_vaccinated_smoothed?: Number;
    new_people_vaccinated_smoothed_per_hundred?: Number;
    stringency_index?: Number;
    population?: Number;
    population_density?: Number;
    median_age?: Number;
    aged_65_older?: Number;
    aged_70_older?: Number;
    gdp_per_capita?: Number;
    extreme_poverty?: Number;
    cardiovasc_death_rate?: Number;
    diabetes_prevalence?: Number;
    female_smokers?: Number;
    male_smokers?: Number;
    handwashing_facilities?: Number;
    hospital_beds_per_thousand?: Number;
    life_expectancy?: Number;
    human_development_index?: Number;
    excess_mortality_cumulative_absolute?: Number;
    excess_mortality_cumulative?: Number;
    excess_mortality?: Number;
    excess_mortality_cumulative_per_million?: Number;
}
