/**
 * Shared types for the Kiro Tutorial extension
 */

/** Action button configuration for tutorial steps */
export interface StepAction {
    /** SVG icon markup */
    icon: string;
    /** Button label text */
    label: string;
    /** VS Code command to execute */
    command?: string;
    /** Whether clicking marks the step complete */
    markComplete: boolean;
    /** Required file/condition for button to be enabled */
    requiresFile?: string;
}

/** Tutorial step configuration */
export interface TutorialStep {
    /** Step title shown in header */
    title: string;
    /** HTML content for the step */
    content: string;
    /** Action buttons at bottom of step */
    actions: StepAction[];
}

/** State passed to helper functions */
export interface HelperState {
    /** Set of expanded collapsible section IDs */
    expandedSections: Set<string>;
    /** Set of completed step indices */
    completedSteps: Set<number>;
    /** Current step index */
    currentStep: number;
    /** Validation results map */
    validationResults: Map<string, boolean | null>;
    /** Validations currently in progress */
    validationInProgress: Set<string>;
    /** AWS profile name */
    awsProfile: string;
    /** AWS region */
    awsRegion: string;
    /** Container runtime */
    containerRuntime: 'podman' | 'docker';
    /** Operating system platform */
    osPlatform: OsPlatform;
}

/** Operating system platform type */
export type OsPlatform = 'windows' | 'macos' | 'linux';

/** Context for generating step content */
export interface StepContext {
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
}

/** File existence flags for conditional content */
export interface FileFlags {
    requirementsExists: boolean;
    requirementsHasEnoughLines: boolean;
    designExists: boolean;
    designHasEnoughLines: boolean;
    tasksExists: boolean;
    spiritRepoCloned: boolean;
}
