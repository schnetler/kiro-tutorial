/**
 * Styles index - Combines all style modules
 */

import { baseStyles } from './base';
import { layoutStyles } from './layout';
import { componentStyles } from './components';
import { timelineStyles } from './timeline';
import { sectionStyles } from './sections';
import { animationStyles } from './animations';

/**
 * Get all combined styles for the webview
 */
export function getStyles(): string {
    return `
        ${baseStyles}
        ${layoutStyles}
        ${animationStyles}
        ${componentStyles}
        ${timelineStyles}
        ${sectionStyles}
    `;
}

// Re-export individual style modules for testing/customization
export {
    baseStyles,
    layoutStyles,
    componentStyles,
    timelineStyles,
    sectionStyles,
    animationStyles
};
