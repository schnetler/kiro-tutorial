/**
 * Types for step generation
 */

import { TutorialStep } from '../types';
import { Platform } from '../platform';

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

    /** Current platform (windows, macos, linux) */
    platform: Platform;

    /** Check if running on Windows */
    isWindows: boolean;

    /** Check if running on a Unix-like system (macOS or Linux) */
    isUnix: boolean;

    /** Build a command that changes to directory if not already in it */
    buildCdIfNotInDir: (targetDir: string, nextCommand: string) => string;

    /** Build a command to source environment variables from a file */
    buildSourceEnvCommand: (envFile: string, nextCommand: string) => string;

    /** Build environment variable prefix for a command */
    buildEnvVarPrefix: (vars: Record<string, string>, command: string) => string;
}

/** Step generator function type */
export type StepGenerator = (ctx: StepGeneratorContext) => TutorialStep;
