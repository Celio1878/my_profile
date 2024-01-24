export function get_years_of_experience() {
  const init_career_year = 2020;
  const current_year = new Date().getFullYear();
  return current_year - init_career_year;
}
