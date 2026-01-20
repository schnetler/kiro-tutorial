/**
 * Platform detection and cross-platform command utilities
 *
 * This module provides utilities for detecting the operating system
 * and building platform-specific shell commands.
 */

import * as os from 'os';

/** Supported platforms */
export type Platform = 'windows' | 'macos' | 'linux';

/** Shell type based on platform */
export type ShellType = 'powershell' | 'cmd' | 'bash' | 'zsh' | 'sh';

/**
 * Detect the current operating system
 */
export function getPlatform(): Platform {
    const platform = os.platform();
    switch (platform) {
        case 'win32':
            return 'windows';
        case 'darwin':
            return 'macos';
        default:
            return 'linux';
    }
}

/**
 * Check if running on Windows
 */
export function isWindows(): boolean {
    return getPlatform() === 'windows';
}

/**
 * Check if running on macOS
 */
export function isMacOS(): boolean {
    return getPlatform() === 'macos';
}

/**
 * Check if running on Linux
 */
export function isLinux(): boolean {
    return getPlatform() === 'linux';
}

/**
 * Check if running on a Unix-like system (macOS or Linux)
 */
export function isUnix(): boolean {
    return isMacOS() || isLinux();
}

/**
 * Get the default shell for the current platform
 */
export function getDefaultShell(): ShellType {
    if (isWindows()) {
        return 'powershell';
    }
    // Check SHELL environment variable for Unix systems
    const shell = process.env.SHELL;
    if (shell?.includes('zsh')) {
        return 'zsh';
    }
    return 'bash';
}

/**
 * Get the path separator for the current platform
 */
export function getPathSeparator(): string {
    return isWindows() ? '\\' : '/';
}

/**
 * Get the command separator for chaining commands
 * Windows uses '&&' in cmd and ';' or '&&' in PowerShell
 * Unix uses '&&' for dependent commands
 */
export function getCommandSeparator(): string {
    // '&&' works on both platforms for sequential execution with error checking
    return '&&';
}

/**
 * Build a command to change directory if not already in it
 * This replaces the bash-specific [[ ]] syntax
 */
export function buildCdIfNotInDir(targetDir: string, nextCommand: string): string {
    if (isWindows()) {
        // PowerShell: Use Test-Path and Push-Location
        return `if ((Split-Path -Leaf (Get-Location)) -ne '${targetDir}') { Push-Location '${targetDir}' }; ${nextCommand}`;
    } else {
        // Bash/Zsh: Use simpler syntax that's more portable
        // Using -z to check if string is empty, and basename command
        return `[ "$(basename "$PWD")" != "${targetDir}" ] && cd "${targetDir}"; ${nextCommand}`;
    }
}

/**
 * Build a command to source/load environment variables from a file
 * Replaces 'source dev.env' with platform-appropriate equivalent
 */
export function buildSourceEnvCommand(envFile: string, nextCommand: string): string {
    if (isWindows()) {
        // PowerShell: Read file and set environment variables
        // This reads each line as KEY=VALUE and exports them
        return `Get-Content '${envFile}' | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2]) } }; ${nextCommand}`;
    } else {
        // Bash/Zsh: Use source or . (dot) command
        return `source ${envFile} && ${nextCommand}`;
    }
}

/**
 * Build a git clone command with fallback from SSH to HTTPS
 * Returns HTTPS URL for broader compatibility
 */
export function buildGitCloneUrl(sshUrl: string): string {
    // Convert git@github.com:user/repo.git to https://github.com/user/repo.git
    const httpsUrl = sshUrl
        .replace(/^git@github\.com:/, 'https://github.com/')
        .replace(/^git@gitlab\.com:/, 'https://gitlab.com/')
        .replace(/^git@bitbucket\.org:/, 'https://bitbucket.org/');
    return httpsUrl;
}

/**
 * Build a command that works across platforms
 * Wraps common command patterns with platform-specific syntax
 */
export function buildCrossplatformCommand(options: {
    /** Command for Unix (bash/zsh) */
    unix: string;
    /** Command for Windows (PowerShell) - if not provided, unix command is used */
    windows?: string;
}): string {
    if (isWindows() && options.windows) {
        return options.windows;
    }
    return options.unix;
}

/**
 * Escape a string for use in shell commands
 */
export function escapeShellArg(arg: string): string {
    if (isWindows()) {
        // PowerShell: escape with backticks and wrap in quotes
        return `"${arg.replace(/"/g, '`"')}"`;
    } else {
        // Bash: escape single quotes
        return `'${arg.replace(/'/g, "'\\''")}'`;
    }
}

/**
 * Get curl or equivalent command for testing HTTP endpoints
 * curl is available on all modern platforms
 */
export function buildCurlCommand(url: string): string {
    // curl is available on Windows 10+, macOS, and Linux
    return `curl ${url}`;
}

/**
 * Build environment variable setting for a command
 */
export function buildEnvVarPrefix(vars: Record<string, string>, command: string): string {
    if (isWindows()) {
        // PowerShell: Set variables inline using $env:
        const envSetters = Object.entries(vars)
            .map(([key, value]) => `$env:${key}='${value}'`)
            .join('; ');
        return `${envSetters}; ${command}`;
    } else {
        // Bash: Set variables inline before command
        const envSetters = Object.entries(vars)
            .map(([key, value]) => `${key}=${value}`)
            .join(' ');
        return `${envSetters} ${command}`;
    }
}

/**
 * Get platform info for display purposes
 */
export function getPlatformDisplayInfo(): {
    name: string;
    icon: string;
    shell: string;
} {
    const platform = getPlatform();
    switch (platform) {
        case 'windows':
            return { name: 'Windows', icon: '🪟', shell: 'PowerShell' };
        case 'macos':
            return { name: 'macOS', icon: '🍎', shell: 'zsh' };
        case 'linux':
            return { name: 'Linux', icon: '🐧', shell: 'bash' };
    }
}
