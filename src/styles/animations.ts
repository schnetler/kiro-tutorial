/**
 * Animation styles - Keyframes and motion
 */

export const animationStyles = `
    /* Entrance Animations */
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes scale-in {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slide-in-right {
        from {
            opacity: 0;
            transform: translateX(16px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Interactive animations */
    @keyframes step-pulse {
        0%, 100% { box-shadow: 0 2px 8px var(--kiro-purple-300), 0 0 0 2px var(--kiro-purple-200); }
        50% { box-shadow: 0 2px 12px var(--kiro-purple-300), 0 0 0 3px var(--kiro-purple-100); }
    }

    @keyframes pulse-node {
        0%, 100% { box-shadow: 0 0 0 4px var(--kiro-purple-200), 0 2px 8px var(--kiro-purple-300); }
        50% { box-shadow: 0 0 0 6px var(--kiro-purple-100), 0 2px 12px var(--kiro-purple-300); }
    }

    @keyframes pulse-dot {
        0%, 100% { box-shadow: 0 0 0 3px var(--kiro-purple-200); }
        50% { box-shadow: 0 0 0 5px var(--kiro-purple-100); }
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
