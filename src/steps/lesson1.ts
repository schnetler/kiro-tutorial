/**
 * Lesson 1: Setup Dev Environment
 */

import { TutorialStep } from '../types';
import { StepGeneratorContext } from './types';

export function getLesson1Setup(ctx: StepGeneratorContext): TutorialStep {
    return {
        title: 'Lesson 1: Setup Dev Environment',
        content: `
            ${ctx.getEnhancedLessonBadge(1, 9, 'Setup Dev Environment')}

            <p>Set up your development environment for Spirit of Kiro. Complete each section in order.</p>

            ${ctx.getCollapsibleSection('l1-clone', 1, 'Clone the Repository', `
                <p>Clone the Spirit of Kiro repository and switch to the <code>challenge</code> branch:</p>

                <div class="code-block-container">
                    <div class="code-block">git clone git@github.com:kirodotdev/spirit-of-kiro.git
cd spirit-of-kiro/
git checkout challenge</div>
                    <button class="copy-btn" onclick="copyToClipboard('git clone git@github.com:kirodotdev/spirit-of-kiro.git && cd spirit-of-kiro/ && git checkout challenge')">Copy</button>
                </div>

                <button class="action-btn terminal" onclick="runTerminalCommand('git clone git@github.com:kirodotdev/spirit-of-kiro.git && cd spirit-of-kiro && git checkout challenge')">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Run in Terminal
                </button>

                <p style="margin-top: 12px;">After cloning, review these key files:</p>
                <ul>
                    <li><strong>docs/architecture.md</strong> - Architecture overview</li>
                    <li><strong>docs/appsec-overview.md</strong> - Component details</li>
                </ul>

                <div class="tip-box">
                    <strong>Tip:</strong> Read the architecture docs to understand how the game is structured.
                </div>
            `)}

            ${ctx.getCollapsibleSection('l1-prereqs', 2, 'Verify Prerequisites', `
                <p>Check that you have the required tools installed and running:</p>

                ${ctx.getValidationItem('Git', 'git', 'Version control', 'https://git-scm.com/downloads')}
                ${ctx.getValidationItem('Docker/Podman', 'docker', 'Container runtime (must be running)', 'https://podman.io/docs/installation')}
                ${ctx.getValidationItem('AWS CLI', 'aws', 'For Cognito deployment', 'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html')}

                <p style="margin-top: 16px; margin-bottom: 8px;"><strong>AWS Configuration:</strong></p>
                ${ctx.getAwsProfileInput()}

                <div class="tip-box" style="margin-top: 16px;">
                    <strong>Using Podman?</strong> Make sure it's running: <code>podman machine start</code><br>
                    <strong>First time?</strong> Run: <code>podman machine init && podman machine start</code>
                </div>

                <button class="action-btn terminal" onclick="runTerminalCommand('[[ \\"$(basename $PWD)\\" != \\"spirit-of-kiro\\" ]] && cd spirit-of-kiro; AWS_PROFILE=${ctx.awsProfile} ./scripts/check-dependencies.sh')">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Run Full Dependency Check
                </button>
            `)}

            ${ctx.getCollapsibleSection('l1-cognito', 3, 'Deploy Cognito', `
                <p>Deploy the AWS Cognito user pool for authentication:</p>

                <div class="code-block-container">
                    <div class="code-block">AWS_PROFILE=${ctx.awsProfile} AWS_REGION=${ctx.awsRegion} ./scripts/deploy-cognito.sh game-auth</div>
                    <button class="copy-btn" onclick="copyToClipboard('AWS_PROFILE=${ctx.awsProfile} AWS_REGION=${ctx.awsRegion} ./scripts/deploy-cognito.sh game-auth')">Copy</button>
                </div>

                <button class="action-btn terminal" onclick="runTerminalCommand('[[ \\"$(basename $PWD)\\" != \\"spirit-of-kiro\\" ]] && cd spirit-of-kiro; AWS_PROFILE=${ctx.awsProfile} AWS_REGION=${ctx.awsRegion} ./scripts/deploy-cognito.sh game-auth')">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Deploy Cognito Stack
                </button>

                <div class="tip-box">
                    <strong>Tip:</strong> You can substitute 'game-auth' with your own custom CloudFormation stack name.
                </div>

                <img src="https://kiro.dev/images/video-game-guide/cognito.gif" alt="Deploy Cognito" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <p style="margin-top: 16px;"><strong>Disable Email Verification</strong> (for local development):</p>
                <p style="font-size: 12px; color: var(--vscode-descriptionForeground);">Run this after deployment to allow sign-up without email confirmation:</p>

                <button class="action-btn terminal" onclick="runTerminalCommand('[[ \\"$(basename $PWD)\\" != \\"spirit-of-kiro\\" ]] && cd spirit-of-kiro; source dev.env && AWS_PROFILE=${ctx.awsProfile} aws cognito-idp update-user-pool --user-pool-id $COGNITO_USER_POOL_ID --region ${ctx.awsRegion} --auto-verified-attributes email')">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Disable Email Verification
                </button>
            `)}

            ${ctx.getCollapsibleSection('l1-build', 4, 'Build & Launch', `
                <p>Build the containers and launch the game stack:</p>

                <div class="code-block-container">
                    <div class="code-block">${ctx.containerRuntime} compose build && ${ctx.containerRuntime} compose up --watch --remove-orphans --timeout 0 --force-recreate</div>
                    <button class="copy-btn" onclick="copyToClipboard('${ctx.containerRuntime} compose build && ${ctx.containerRuntime} compose up --watch --remove-orphans --timeout 0 --force-recreate')">Copy</button>
                </div>

                <button class="action-btn terminal" onclick="runTerminalCommand('[[ \\"$(basename $PWD)\\" != \\"spirit-of-kiro\\" ]] && cd spirit-of-kiro; ${ctx.containerRuntime} compose build && ${ctx.containerRuntime} compose up --watch --remove-orphans --timeout 0 --force-recreate')">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Build & Start Containers
                </button>

                <div class="tip-box">
                    <strong>Note:</strong> The first build may take a couple minutes. Use <code>Ctrl+C</code> / <code>Cmd+C</code> to stop.
                </div>

                <img src="https://kiro.dev/images/video-game-guide/build-and-run.gif" alt="Build and run" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">
            `)}

            ${ctx.getCollapsibleSection('l1-bootstrap', 5, 'Bootstrap Database', `
                <p>Initialize the DynamoDB tables. <strong>Keep the stack running</strong> and run this in a new terminal:</p>

                <div class="code-block-container">
                    <div class="code-block">${ctx.containerRuntime} exec server mkdir -p /app/server/iac && \\
${ctx.containerRuntime} cp scripts/bootstrap-local-dynamodb.js server:/app/ && \\
${ctx.containerRuntime} cp server/iac/dynamodb.yml server:/app/server/iac/ && \\
${ctx.containerRuntime} exec server bun run /app/bootstrap-local-dynamodb.js</div>
                    <button class="copy-btn" onclick="copyToClipboard('${ctx.containerRuntime} exec server mkdir -p /app/server/iac && ${ctx.containerRuntime} cp scripts/bootstrap-local-dynamodb.js server:/app/ && ${ctx.containerRuntime} cp server/iac/dynamodb.yml server:/app/server/iac/ && ${ctx.containerRuntime} exec server bun run /app/bootstrap-local-dynamodb.js')">Copy</button>
                </div>

                <button class="action-btn terminal" onclick="runTerminalCommand('cd spirit-of-kiro && ${ctx.containerRuntime} exec server mkdir -p /app/server/iac && ${ctx.containerRuntime} cp scripts/bootstrap-local-dynamodb.js server:/app/ && ${ctx.containerRuntime} cp server/iac/dynamodb.yml server:/app/server/iac/ && ${ctx.containerRuntime} exec server bun run /app/bootstrap-local-dynamodb.js', true)">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Bootstrap Database (New Terminal)
                </button>

                <img src="https://kiro.dev/images/video-game-guide/create-tables.gif" alt="Create tables" style="width: 100%; border-radius: 8px; margin: 12px 0; border: 1px solid var(--vscode-widget-border);">

                <div class="tip-box">
                    <strong>Note:</strong> Database persists in <code>docker/dynamodb/shared-local-instance.db</code>
                </div>
            `)}

            ${ctx.getCollapsibleSection('l1-test', 6, 'Test It Out!', `
                <p>Verify the server is running and open the game:</p>

                <button class="action-btn terminal" onclick="runTerminalCommand('curl localhost:8080')">
                    <svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                    Test Server (expect "OK")
                </button>

                <button class="action-btn browser" onclick="openUrl('http://localhost:5173')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Open Game (localhost:5173)
                </button>

                <button class="action-btn browser" onclick="openUrl('http://localhost:8080')">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Open Server (localhost:8080)
                </button>

                <h4 style="margin-top: 16px;">Game Controls</h4>
                <div class="game-controls">
                    <ul>
                        <li><code>WASD</code> - Move around</li>
                        <li><code>E</code> - Interact / Pick up items</li>
                        <li><code>T</code> - Throw held item</li>
                        <li>Pull the <strong>red lever</strong> to get random items</li>
                        <li>Use the <strong>workbench</strong> to craft</li>
                        <li>Throw items out the <strong>door</strong> to sell</li>
                    </ul>
                </div>

                <div class="tip-box">
                    <strong>Congratulations!</strong> You've set up the Spirit of Kiro development environment!
                </div>
            `)}
        `,
        actions: []
    };
}
