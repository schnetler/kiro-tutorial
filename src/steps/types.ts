/**
 * Types for step generation
 */

import { TutorialStep, OsPlatform } from '../types';

/** Context for generating step content with dynamic helpers */
export interface StepGeneratorContext {
    /** Get collapsible section HTML */
    getCollapsibleSection: (
        id: string,
        number: number,
        title: string,
        content: string,
        status?: 'complete' | 'pending' | null,
        defaultExpanded?: boolean
    ) => string;

    /** Get enhanced lesson badge HTML */
    getEnhancedLessonBadge: (currentLesson: number, totalLessons: number, title: string) => string;

    /** Get interactive timeline HTML */
    getInteractiveTimeline: () => string;

    /** Get validation item HTML */
    getValidationItem: (name: string, checkId: string, description: string, installUrl?: string) => string;

    /** Get AWS profile input HTML */
    getAwsProfileInput: () => string;

    /** Get code block with copy button HTML */
    getCodeBlockWithCopy: (code: string) => string;

    /** Current AWS profile */
    awsProfile: string;

    /** Current AWS region */
    awsRegion: string;

    /** Container runtime */
    containerRuntime: 'podman' | 'docker';

    /** Operating system platform */
    osPlatform: OsPlatform;
}

/** Step generator function type */
export type StepGenerator = (ctx: StepGeneratorContext) => TutorialStep;
