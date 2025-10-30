import type { Project } from "../types";

import { aiEtlSystem } from "./ai-etl-system";
import { cliDatacontractValidator } from "./cli-datacontract-validator";
import { webPortfolio } from "./web-portfolio";
import { yamlAssistant } from "./yaml-assistant";


export const projects: Project[] = [
  aiEtlSystem,
  cliDatacontractValidator,
  webPortfolio,
  yamlAssistant,
  
];
