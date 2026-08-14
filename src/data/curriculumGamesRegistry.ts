import { CurriculumGameItem } from './class2GamesData';
import * as C2 from './class2GamesData';
import * as C3 from './class3GamesData';
import * as C4 from './class4GamesData';
import * as C5 from './class5GamesData';

export const CURRICULUM_BANKS: Record<string, CurriculumGameItem[]> = {
  // Class 2
  class2_story_detective: C2.CLASS2_STORY_ITEMS,
  class2_word_builder_pro: C2.CLASS2_WORD_BUILDER_ITEMS,
  class2_grammar_fixer: C2.CLASS2_GRAMMAR_ITEMS,
  class2_synonym_hunter: C2.CLASS2_SYNONYM_ITEMS,
  class2_alphabetical_race: C2.CLASS2_ALPHABETICAL_ITEMS,
  class2_addition_master: C2.CLASS2_ADDITION_ITEMS,
  class2_subtraction_master: C2.CLASS2_SUBTRACTION_ITEMS,
  class2_multiplication_garden: C2.CLASS2_MULTIPLICATION_GARDEN_ITEMS,
  class2_sharing_game: C2.CLASS2_SHARING_ITEMS,
  class2_place_value_builder: C2.CLASS2_PLACE_VALUE_ITEMS,
  class2_time_detective: C2.CLASS2_TIME_ITEMS,
  class2_money_shop: C2.CLASS2_MONEY_ITEMS,
  class2_plant_parts: C2.CLASS2_PLANT_ITEMS,
  class2_animal_groups: C2.CLASS2_ANIMAL_ITEMS,
  class2_weather_station: C2.CLASS2_WEATHER_ITEMS,
  class2_number_patterns: C2.CLASS2_NUMBER_PATTERNS_ITEMS,
  class2_logic_puzzle: C2.CLASS2_LOGIC_PUZZLE_ITEMS,
  class2_find_difference: C2.CLASS2_FIND_DIFFERENCE_ITEMS,
  class2_world_explorer: C2.CLASS2_WORLD_EXPLORER_ITEMS,
  class2_knowledge_challenge: C2.CLASS2_KNOWLEDGE_CHALLENGE_ITEMS,

  // Class 3
  class3_reading_detective: C3.CLASS3_READING_ITEMS,
  class3_grammar_builder: C3.CLASS3_GRAMMAR_ITEMS,
  class3_sentence_fixer: C3.CLASS3_SENTENCE_ITEMS,
  class3_vocabulary_quest: C3.CLASS3_VOCABULARY_ITEMS,
  class3_story_sequence: C3.CLASS3_STORY_SEQUENCE_ITEMS,
  class3_multiplication_race: C3.CLASS3_MULTIPLICATION_ITEMS,
  class3_division_challenge: C3.CLASS3_DIVISION_ITEMS,
  class3_fraction_pizza: C3.CLASS3_FRACTION_ITEMS,
  class3_place_value_master: C3.CLASS3_PLACE_VALUE_ITEMS,
  class3_multi_step_maths: C3.CLASS3_MULTISTEP_ITEMS,
  class3_shape_explorer: C3.CLASS3_SHAPE_ITEMS,
  class3_measurement_master: C3.CLASS3_MEASUREMENT_ITEMS,
  class3_plant_science: C3.CLASS3_PLANT_ITEMS,
  class3_human_body_explorer: C3.CLASS3_HUMAN_BODY_ITEMS,
  class3_earth_explorer: C3.CLASS3_EARTH_ITEMS,
  class3_pattern_master: C3.CLASS3_PATTERN_ITEMS,
  class3_logic_lab: C3.CLASS3_LOGIC_ITEMS,
  class3_geography_quest: C3.CLASS3_GEOGRAPHY_ITEMS,
  class3_space_explorer: C3.CLASS3_SPACE_ITEMS,
  class3_knowledge_battle: C3.CLASS3_KNOWLEDGE_BATTLE_ITEMS,

  // Class 4
  class4_reading_comprehension: C4.CLASS4_READING_ITEMS,
  class4_grammar_detective: C4.CLASS4_GRAMMAR_ITEMS,
  class4_sentence_builder_pro: C4.CLASS4_SENTENCE_BUILDER_ITEMS,
  class4_vocabulary_vault: C4.CLASS4_VOCABULARY_ITEMS,
  class4_parts_of_speech: C4.CLASS4_PARTS_OF_SPEECH_ITEMS,
  class4_multiplication_master: C4.CLASS4_MULTIPLICATION_ITEMS,
  class4_division_master: C4.CLASS4_DIVISION_ITEMS,
  class4_fraction_factory: C4.CLASS4_FRACTION_ITEMS,
  class4_decimal_detective: C4.CLASS4_DECIMAL_ITEMS,
  class4_geometry_quest: C4.CLASS4_GEOMETRY_ITEMS,
  class4_measurement_lab: C4.CLASS4_MEASUREMENT_ITEMS,
  class4_smart_shop: C4.CLASS4_SMART_SHOP_ITEMS,
  class4_science_lab: C4.CLASS4_SCIENCE_LAB_ITEMS,
  class4_human_body_lab: C4.CLASS4_HUMAN_BODY_ITEMS,
  class4_ecosystem_explorer: C4.CLASS4_ECOSYSTEM_ITEMS,
  class4_map_master: C4.CLASS4_MAP_ITEMS,
  class4_reasoning_challenge: C4.CLASS4_REASONING_ITEMS,
  class4_sequence_master: C4.CLASS4_SEQUENCE_ITEMS,
  class4_geography_explorer: C4.CLASS4_GEOGRAPHY_ITEMS,
  class4_brain_challenge: C4.CLASS4_BRAIN_CHALLENGE_ITEMS,

  // Class 5
  class5_reading_master: C5.CLASS5_READING_ITEMS,
  class5_grammar_master: C5.CLASS5_GRAMMAR_ITEMS,
  class5_sentence_correction: C5.CLASS5_SENTENCE_CORRECTION,
  class5_story_builder: C5.CLASS5_STORY_BUILDER,
  class5_vocabulary_master: C5.CLASS5_VOCABULARY,
  class5_multi_step_maths: C5.CLASS5_MULTISTEP_MATHS,
  class5_multiplication_master: C5.CLASS5_PEMDAS,
  class5_division_master: C5.CLASS5_DIVISION,
  class5_fraction_challenge: C5.CLASS5_FRACTIONS,
  class5_decimal_challenge: C5.CLASS5_DECIMALS,
  class5_data_detective: C5.CLASS5_DATA,
  class5_geometry_master: C5.CLASS5_GEOMETRY,
  class5_money_challenge: C5.CLASS5_MONEY,
  class5_science_detective: C5.CLASS5_SCIENCE_DETECTIVE,
  class5_earth_environment: C5.CLASS5_EARTH_ENV,
  class5_human_body_challenge: C5.CLASS5_HUMAN_BODY,
  class5_energy_lab: C5.CLASS5_ENERGY,
  class5_world_map_challenge: C5.CLASS5_WORLD_MAP,
  class5_ultimate_logic_challenge: C5.CLASS5_ULTIMATE_LOGIC,
  class5_championship: C5.CLASS5_CHAMPIONSHIP,
};

export function getCurriculumItem(componentKey: string, round: number): CurriculumGameItem | null {
  const bank = CURRICULUM_BANKS[componentKey];
  if (!bank || bank.length === 0) return null;
  return bank[round % bank.length];
}
