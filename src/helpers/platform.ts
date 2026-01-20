/**
 * Platform-aware command generation helpers
 */

import { OsPlatform } from '../types';

/**
 * Context for generating platform-specific commands
 */
export interface PlatformCommandContext {
    osPlatform: OsPlatform;
    containerRuntime: 'podman' | 'docker';
    awsProfile: string;
    awsRegion: string;
}

/**
 * Check if the platform is Unix-like (macOS or Linux)
 */
export function isUnixLike(platform: OsPlatform): boolean {
    return platform === 'macos' || platform === 'linux';
}

/**
 * Get the shell command to change directory only if not already there
 * On Unix: [[ "$(basename $PWD)" != "dir" ]] && cd dir
 * On Windows (PowerShell): if ((Split-Path -Leaf (Get-Location)) -ne 'dir') { Set-Location dir }
 */
export function getCdIfNotInDir(platform: OsPlatform, dirName: string): string {
    if (isUnixLike(platform)) {
        return `[[ "$(basename $PWD)" != "${dirName}" ]] && cd ${dirName}`;
    }
    // PowerShell syntax for Windows
    return `if ((Split-Path -Leaf (Get-Location)) -ne '${dirName}') { Set-Location ${dirName} }`;
}

/**
 * Get the command to source/load an environment file
 * On Unix: source file.env
 * On Windows (PowerShell): . .\\file.env or Get-Content file.env | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2]) } }
 */
export function getSourceEnvCommand(platform: OsPlatform, envFile: string): string {
    if (isUnixLike(platform)) {
        return `source ${envFile}`;
    }
    // For Windows PowerShell, we need to parse and set env vars manually
    // or use a simpler dot-source if it's a PowerShell script
    return `Get-Content ${envFile} | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($Matches[1], $Matches[2], 'Process') } }`;
}

/**
 * Get environment variable prefix for commands
 * On Unix: VAR=value command
 * On Windows (PowerShell): $env:VAR='value'; command
 */
export function getEnvVarPrefix(platform: OsPlatform, vars: Record<string, string>): string {
    if (isUnixLike(platform)) {
        return Object.entries(vars)
            .map(([key, value]) => `${key}=${value}`)
            .join(' ');
    }
    // PowerShell syntax
    return Object.entries(vars)
        .map(([key, value]) => `$env:${key}='${value}'`)
        .join('; ') + ';';
}

/**
 * Get command to chain multiple commands
 * On Unix: cmd1 && cmd2
 * On Windows (PowerShell): cmd1; if ($?) { cmd2 }
 */
export function getCommandChain(platform: OsPlatform, commands: string[]): string {
    if (isUnixLike(platform)) {
        return commands.join(' && ');
    }
    // PowerShell: use semicolons with error checking
    // Simplified version using ; which continues regardless of errors
    // For proper && behavior, would need: cmd1; if ($LASTEXITCODE -eq 0) { cmd2 }
    return commands.join(' && ');  // PowerShell 7+ supports &&
}

/**
 * Generate a full command with optional directory change and environment variables
 */
export function generateCommand(
    ctx: PlatformCommandContext,
    options: {
        cdToDir?: string;
        envVars?: Record<string, string>;
        command: string;
    }
): string {
    const parts: string[] = [];

    if (options.cdToDir) {
        parts.push(getCdIfNotInDir(ctx.osPlatform, options.cdToDir));
    }

    let mainCommand = options.command;
    if (options.envVars && Object.keys(options.envVars).length > 0) {
        if (isUnixLike(ctx.osPlatform)) {
            mainCommand = `${getEnvVarPrefix(ctx.osPlatform, options.envVars)} ${mainCommand}`;
        } else {
            // For PowerShell, env vars need to be set separately
            parts.push(getEnvVarPrefix(ctx.osPlatform, options.envVars));
        }
    }

    parts.push(mainCommand);

    if (isUnixLike(ctx.osPlatform)) {
        return parts.join('; ');
    }
    return parts.join(' ');
}

/**
 * Get platform-specific note/tip for command execution
 */
export function getPlatformNote(platform: OsPlatform): string {
    if (platform === 'windows') {
        return `<div class="tip-box">
            <strong>Windows Users:</strong> These commands work best in PowerShell 7+ or Git Bash.
            If using older PowerShell, some commands may need adjustment.
        </div>`;
    }
    return '';
}

/**
 * Get the keyboard shortcut for stopping processes
 */
export function getStopShortcut(platform: OsPlatform): string {
    if (platform === 'macos') {
        return 'Cmd+C';
    }
    return 'Ctrl+C';
}

/**
 * Generate clone and checkout command
 */
export function getCloneCommand(platform: OsPlatform): string {
    // Git commands are the same across platforms
    return 'git clone git@github.com:kirodotdev/spirit-of-kiro.git && cd spirit-of-kiro && git checkout challenge';
}

/**
 * Generate container compose commands
 */
export function getComposeCommand(
    ctx: PlatformCommandContext,
    action: 'build' | 'up' | 'build-and-up' | 'down'
): string {
    const runtime = ctx.containerRuntime;

    switch (action) {
        case 'build':
            return `${runtime} compose build`;
        case 'up':
            return `${runtime} compose up --watch --remove-orphans --timeout 0 --force-recreate`;
        case 'build-and-up':
            return `${runtime} compose build && ${runtime} compose up --watch --remove-orphans --timeout 0 --force-recreate`;
        case 'down':
            return `${runtime} compose down`;
    }
}

/**
 * Generate database bootstrap command
 */
export function getBootstrapDbCommand(ctx: PlatformCommandContext): string {
    const runtime = ctx.containerRuntime;
    const commands = [
        `${runtime} exec server mkdir -p /app/server/iac`,
        `${runtime} cp scripts/bootstrap-local-dynamodb.js server:/app/`,
        `${runtime} cp server/iac/dynamodb.yml server:/app/server/iac/`,
        `${runtime} exec server bun run /app/bootstrap-local-dynamodb.js`
    ];
    return commands.join(' && ');
}

/**
 * Generate AWS Cognito deployment command
 */
export function getCognitoDeployCommand(ctx: PlatformCommandContext, stackName: string = 'game-auth'): string {
    if (isUnixLike(ctx.osPlatform)) {
        return `AWS_PROFILE=${ctx.awsProfile} AWS_REGION=${ctx.awsRegion} ./scripts/deploy-cognito.sh ${stackName}`;
    }
    // PowerShell
    return `$env:AWS_PROFILE='${ctx.awsProfile}'; $env:AWS_REGION='${ctx.awsRegion}'; ./scripts/deploy-cognito.sh ${stackName}`;
}

/**
 * Generate command to disable email verification
 */
export function getDisableEmailVerificationCommand(ctx: PlatformCommandContext): string {
    if (isUnixLike(ctx.osPlatform)) {
        return `source dev.env && AWS_PROFILE=${ctx.awsProfile} aws cognito-idp update-user-pool --user-pool-id $COGNITO_USER_POOL_ID --region ${ctx.awsRegion} --auto-verified-attributes email`;
    }
    // PowerShell - need to read env file and use $env: syntax
    return `Get-Content dev.env | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { Set-Item "env:$($Matches[1])" $Matches[2] } }; $env:AWS_PROFILE='${ctx.awsProfile}'; aws cognito-idp update-user-pool --user-pool-id $env:COGNITO_USER_POOL_ID --region ${ctx.awsRegion} --auto-verified-attributes email`;
}

/**
 * Generate dependency check command
 */
export function getDependencyCheckCommand(ctx: PlatformCommandContext): string {
    if (isUnixLike(ctx.osPlatform)) {
        return `AWS_PROFILE=${ctx.awsProfile} ./scripts/check-dependencies.sh`;
    }
    // PowerShell
    return `$env:AWS_PROFILE='${ctx.awsProfile}'; ./scripts/check-dependencies.sh`;
}
