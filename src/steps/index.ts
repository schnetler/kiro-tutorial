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
        getLesson9Conclusion(ctx)
    ];
}

// Re-export types
export { StepGeneratorContext } from './types';
