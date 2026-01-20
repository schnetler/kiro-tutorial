/**
 * Steps index - Combines all tutorial steps
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';
import { getBasicSteps } from './basics';
import { getLesson1Setup } from './lesson1';
import { getLesson2Homepage } from './lesson2';
import { getLesson3Physics } from './lesson3';
import { getLesson4Interactions } from './lesson4';
import { getLesson5Refactoring } from './lesson5';
import { getLesson6Features } from './lesson6';
import { getLesson7Hooks } from './lesson7';
import { getLesson8MCP } from './lesson8';
import { getLesson9Conclusion } from './lesson9';
import { getFeature10Powers } from './feature10';
import { getFeature11Checkpointing } from './feature11';
import { getFeature12PropertyTesting } from './feature12';
import { getFeature13AutonomousAgent } from './feature13';
import { getFeature14Subagents } from './feature14';
import { getFeature15ContextualHooks } from './feature15';
import { getFeature16WebTools } from './feature16';
import { getFeature17SupervisedMode } from './feature17';
import { getFeature18CodeIntelligence } from './feature18';
import { getFeature19Compaction } from './feature19';

/**
 * Get all tutorial steps
 */
export function getAllSteps(ctx: StepGeneratorContext): TutorialStep[] {
    return [
        ...getBasicSteps(ctx),
        getLesson1Setup(ctx),
        getLesson2Homepage(ctx),
        getLesson3Physics(ctx),
        getLesson4Interactions(ctx),
        getLesson5Refactoring(ctx),
        getLesson6Features(ctx),
        getLesson7Hooks(ctx),
        getLesson8MCP(ctx),
        getLesson9Conclusion(ctx),
        getFeature10Powers(ctx),
        getFeature11Checkpointing(ctx),
        getFeature12PropertyTesting(ctx),
        getFeature13AutonomousAgent(ctx),
        getFeature14Subagents(ctx),
        getFeature15ContextualHooks(ctx),
        getFeature16WebTools(ctx),
        getFeature17SupervisedMode(ctx),
        getFeature18CodeIntelligence(ctx),
        getFeature19Compaction(ctx)
    ];
}

// Re-export types
export { StepGeneratorContext } from './types';
