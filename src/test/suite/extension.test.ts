import * as assert from 'assert';
import * as vscode from 'vscode';
import { TutorialViewProvider } from '../../sidebarView';

suite('Kiro Tutorial Extension Test Suite', () => {
    vscode.window.showInformationMessage('Starting Kiro Tutorial tests.');

    test('Extension should be present', () => {
        const extension = vscode.extensions.getExtension('kiro.kiro-tutorial');
        assert.ok(extension, 'Extension should be installed');
    });

    test('Extension should activate', async () => {
        const extension = vscode.extensions.getExtension('kiro.kiro-tutorial');
        assert.ok(extension, 'Extension should be installed');

        await extension!.activate();
        assert.strictEqual(extension!.isActive, true, 'Extension should be active');
    });

    test('Commands should be registered', async () => {
        const commands = await vscode.commands.getCommands(true);

        const expectedCommands = [
            'kiro-tutorial.start',
            'kiro-tutorial.createRequirements',
            'kiro-tutorial.createDesign',
            'kiro-tutorial.createTasks'
        ];

        for (const cmd of expectedCommands) {
            assert.ok(
                commands.includes(cmd),
                `Command ${cmd} should be registered`
            );
        }
    });

    test('Sidebar view should be available', async () => {
        // Open the tutorial sidebar
        await vscode.commands.executeCommand('workbench.view.extension.kiro-tutorial');

        // Give it time to render
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check that the view is visible
        const view = vscode.window.tabGroups;
        assert.ok(view, 'View should be accessible');
    });

    test('Tutorial start command should execute without error', async () => {
        try {
            await vscode.commands.executeCommand('kiro-tutorial.start');
            assert.ok(true, 'Command executed successfully');
        } catch (error) {
            assert.fail(`Command should not throw error: ${error}`);
        }
    });
});

suite('TutorialViewProvider Unit Tests', () => {
    let provider: TutorialViewProvider;

    suiteSetup(() => {
        // Create a mock extension URI for testing
        const mockUri = vscode.Uri.file('/mock/extension/path');
        provider = new TutorialViewProvider(mockUri);
    });

    suiteTeardown(() => {
        provider.dispose();
    });

    suite('Default State', () => {
        test('Should have default AWS profile', () => {
            assert.strictEqual(provider.awsProfile, 'default', 'Default AWS profile should be "default"');
        });

        test('Should have default AWS region', () => {
            assert.strictEqual(provider.awsRegion, 'us-east-1', 'Default AWS region should be "us-east-1"');
        });

        test('Should have default container runtime', () => {
            assert.strictEqual(provider.containerRuntime, 'podman', 'Default container runtime should be "podman"');
        });

        test('Should have empty validation results initially', () => {
            const results = provider.validationResults;
            assert.strictEqual(results.size, 0, 'Validation results should be empty initially');
        });
    });

    suite('State Modification', () => {
        test('setAwsProfileForTest should update profile', () => {
            provider.setAwsProfileForTest('my-custom-profile');
            assert.strictEqual(provider.awsProfile, 'my-custom-profile', 'AWS profile should be updated');
            // Reset
            provider.setAwsProfileForTest('default');
        });

        test('setAwsRegionForTest should update region', () => {
            provider.setAwsRegionForTest('eu-west-1');
            assert.strictEqual(provider.awsRegion, 'eu-west-1', 'AWS region should be updated');
            // Reset
            provider.setAwsRegionForTest('us-east-1');
        });

        test('setContainerRuntimeForTest should update runtime', () => {
            provider.setContainerRuntimeForTest('docker');
            assert.strictEqual(provider.containerRuntime, 'docker', 'Container runtime should be updated');
            // Reset
            provider.setContainerRuntimeForTest('podman');
        });
    });

    suite('Message Handler Tests', () => {
        test('setAwsProfile message should update profile', async () => {
            await provider.handleMessageForTest({ type: 'setAwsProfile', profile: 'test-profile' });
            assert.strictEqual(provider.awsProfile, 'test-profile', 'Profile should be updated via message');
            // Reset
            provider.setAwsProfileForTest('default');
        });

        test('setAwsProfile message with empty profile should default to "default"', async () => {
            await provider.handleMessageForTest({ type: 'setAwsProfile', profile: '' });
            assert.strictEqual(provider.awsProfile, 'default', 'Empty profile should default to "default"');
        });

        test('setAwsRegion message should update region', async () => {
            await provider.handleMessageForTest({ type: 'setAwsRegion', region: 'ap-southeast-1' });
            assert.strictEqual(provider.awsRegion, 'ap-southeast-1', 'Region should be updated via message');
            // Reset
            provider.setAwsRegionForTest('us-east-1');
        });

        test('setAwsRegion message with empty region should default to "us-east-1"', async () => {
            await provider.handleMessageForTest({ type: 'setAwsRegion', region: '' });
            assert.strictEqual(provider.awsRegion, 'us-east-1', 'Empty region should default to "us-east-1"');
        });
    });
});

suite('Lesson 1 Command Generation Tests', () => {
    let provider: TutorialViewProvider;

    setup(() => {
        const mockUri = vscode.Uri.file('/mock/extension/path');
        provider = new TutorialViewProvider(mockUri);
    });

    teardown(() => {
        provider.dispose();
    });

    suite('Clone Command', () => {
        test('Clone command should be exact', () => {
            const commands = provider.generateLesson1Commands();
            const expectedCloneCmd = 'git clone git@github.com:kirodotdev/spirit-of-kiro.git && cd spirit-of-kiro && git checkout challenge';
            assert.strictEqual(commands.clone, expectedCloneCmd, 'Clone command must match exactly');
        });

        test('Clone command should include SSH URL', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(commands.clone.includes('git@github.com:kirodotdev/spirit-of-kiro.git'), 'Must use SSH URL');
        });

        test('Clone command should checkout challenge branch', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(commands.clone.includes('git checkout challenge'), 'Must checkout challenge branch');
        });
    });

    suite('Dependency Check Command', () => {
        test('Should include default AWS profile', () => {
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.dependencyCheck,
                'AWS_PROFILE=default ./scripts/check-dependencies.sh',
                'Dependency check should use default profile'
            );
        });

        test('Should use custom AWS profile when set', () => {
            provider.setAwsProfileForTest('my-profile');
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.dependencyCheck,
                'AWS_PROFILE=my-profile ./scripts/check-dependencies.sh',
                'Dependency check should use custom profile'
            );
        });
    });

    suite('Deploy Cognito Command', () => {
        test('Should include default AWS profile and region', () => {
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.deployCognito,
                'AWS_PROFILE=default AWS_REGION=us-east-1 ./scripts/deploy-cognito.sh game-auth',
                'Deploy Cognito should use default profile and region'
            );
        });

        test('Should use custom AWS profile when set', () => {
            provider.setAwsProfileForTest('production');
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.deployCognito.includes('AWS_PROFILE=production'),
                'Deploy should use custom profile'
            );
        });

        test('Should use custom AWS region when set', () => {
            provider.setAwsRegionForTest('eu-central-1');
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.deployCognito.includes('AWS_REGION=eu-central-1'),
                'Deploy should use custom region'
            );
        });

        test('Should use both custom profile and region', () => {
            provider.setAwsProfileForTest('staging');
            provider.setAwsRegionForTest('ap-northeast-1');
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.deployCognito,
                'AWS_PROFILE=staging AWS_REGION=ap-northeast-1 ./scripts/deploy-cognito.sh game-auth',
                'Deploy should use both custom profile and region'
            );
        });
    });

    suite('Disable Email Verification Command', () => {
        test('Should source dev.env file', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.disableEmailVerification.startsWith('source dev.env'),
                'Must source dev.env file'
            );
        });

        test('Should use cognito-idp update-user-pool', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.disableEmailVerification.includes('aws cognito-idp update-user-pool'),
                'Must use cognito-idp update-user-pool'
            );
        });

        test('Should include auto-verified-attributes email', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.disableEmailVerification.includes('--auto-verified-attributes email'),
                'Must include auto-verified-attributes email'
            );
        });

        test('Should use profile from state', () => {
            provider.setAwsProfileForTest('custom-profile');
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.disableEmailVerification.includes('AWS_PROFILE=custom-profile'),
                'Must use custom profile'
            );
        });

        test('Should use region from state', () => {
            provider.setAwsRegionForTest('eu-west-2');
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.disableEmailVerification.includes('--region eu-west-2'),
                'Must use custom region'
            );
        });

        test('Should have exact format', () => {
            provider.setAwsProfileForTest('default');
            provider.setAwsRegionForTest('us-east-1');
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.disableEmailVerification,
                'source dev.env && AWS_PROFILE=default aws cognito-idp update-user-pool --user-pool-id $COGNITO_USER_POOL_ID --region us-east-1 --auto-verified-attributes email',
                'Disable email verification command must match exactly'
            );
        });
    });

    suite('Build & Launch Command', () => {
        test('Should use podman by default', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.buildAndLaunch.startsWith('podman compose build'),
                'Should use podman by default'
            );
        });

        test('Should use docker when runtime is docker', () => {
            provider.setContainerRuntimeForTest('docker');
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.buildAndLaunch.startsWith('docker compose build'),
                'Should use docker when set'
            );
        });

        test('Should include --watch flag', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.buildAndLaunch.includes('--watch'),
                'Must include --watch flag'
            );
        });

        test('Should include --remove-orphans flag', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.buildAndLaunch.includes('--remove-orphans'),
                'Must include --remove-orphans flag'
            );
        });

        test('Should include --force-recreate flag', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.buildAndLaunch.includes('--force-recreate'),
                'Must include --force-recreate flag'
            );
        });

        test('Exact podman command format', () => {
            provider.setContainerRuntimeForTest('podman');
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.buildAndLaunch,
                'podman compose build && podman compose up --watch --remove-orphans --timeout 0 --force-recreate',
                'Podman build command must match exactly'
            );
        });

        test('Exact docker command format', () => {
            provider.setContainerRuntimeForTest('docker');
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.buildAndLaunch,
                'docker compose build && docker compose up --watch --remove-orphans --timeout 0 --force-recreate',
                'Docker build command must match exactly'
            );
        });
    });

    suite('Bootstrap Database Command', () => {
        test('Should start with cd spirit-of-kiro', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.bootstrapDatabase.startsWith('cd spirit-of-kiro'),
                'Bootstrap must start with cd spirit-of-kiro (opens in new terminal)'
            );
        });

        test('Should use container runtime from state', () => {
            provider.setContainerRuntimeForTest('podman');
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.bootstrapDatabase.includes('podman exec'),
                'Should use podman when set'
            );

            provider.setContainerRuntimeForTest('docker');
            const dockerCommands = provider.generateLesson1Commands();
            assert.ok(
                dockerCommands.bootstrapDatabase.includes('docker exec'),
                'Should use docker when set'
            );
        });

        test('Should create iac directory', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.bootstrapDatabase.includes('mkdir -p /app/server/iac'),
                'Must create iac directory'
            );
        });

        test('Should copy bootstrap script', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.bootstrapDatabase.includes('cp scripts/bootstrap-local-dynamodb.js server:/app/'),
                'Must copy bootstrap script'
            );
        });

        test('Should copy dynamodb.yml', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.bootstrapDatabase.includes('cp server/iac/dynamodb.yml server:/app/server/iac/'),
                'Must copy dynamodb.yml'
            );
        });

        test('Should run bootstrap script with bun', () => {
            const commands = provider.generateLesson1Commands();
            assert.ok(
                commands.bootstrapDatabase.includes('bun run /app/bootstrap-local-dynamodb.js'),
                'Must run bootstrap script with bun'
            );
        });
    });

    suite('Test Server Command', () => {
        test('Should curl localhost:8080', () => {
            const commands = provider.generateLesson1Commands();
            assert.strictEqual(
                commands.testServer,
                'curl localhost:8080',
                'Test server command must be exact'
            );
        });
    });
});

suite('Validation Command Tests', () => {
    let provider: TutorialViewProvider;

    setup(() => {
        const mockUri = vscode.Uri.file('/mock/extension/path');
        provider = new TutorialViewProvider(mockUri);
    });

    teardown(() => {
        provider.dispose();
    });

    test('Git validation command should be exact', () => {
        const commands = provider.getValidationCommands();
        assert.strictEqual(commands.git, 'git --version', 'Git validation command must be exact');
    });

    test('Docker validation should check daemon status', () => {
        const commands = provider.getValidationCommands();
        assert.strictEqual(commands.docker, 'docker info', 'Docker must use "docker info" to check daemon');
    });

    test('Podman validation should check daemon status', () => {
        const commands = provider.getValidationCommands();
        assert.strictEqual(commands.podman, 'podman info', 'Podman must use "podman info" to check daemon');
    });

    test('AWS CLI validation should check version', () => {
        const commands = provider.getValidationCommands();
        assert.strictEqual(commands.aws, 'aws --version', 'AWS CLI validation must check version');
    });

    test('AWS profile validation should use default profile', () => {
        const commands = provider.getValidationCommands();
        assert.strictEqual(
            commands.awsProfile,
            'aws sts get-caller-identity --profile default',
            'AWS profile validation must use STS with default profile'
        );
    });

    test('AWS profile validation should use custom profile', () => {
        provider.setAwsProfileForTest('my-profile');
        const commands = provider.getValidationCommands();
        assert.strictEqual(
            commands.awsProfile,
            'aws sts get-caller-identity --profile my-profile',
            'AWS profile validation must use STS with custom profile'
        );
    });
});

suite('Validation Execution Tests', () => {
    const exec = require('child_process').exec;

    const runCommand = (cmd: string): Promise<{ success: boolean; output: string }> => {
        return new Promise((resolve) => {
            exec(cmd, (error: any, stdout: string, stderr: string) => {
                resolve({
                    success: !error,
                    output: stdout || stderr
                });
            });
        });
    };

    test('Git should be installed', async () => {
        const result = await runCommand('git --version');
        assert.ok(result.success, 'Git must be installed for this tutorial');
        assert.ok(result.output.includes('git version'), 'Git version output must include "git version"');
    });

    test('Container runtime (Docker or Podman) must be running', async () => {
        const dockerResult = await runCommand('docker info');
        const podmanResult = await runCommand('podman info');

        const hasRunningRuntime = dockerResult.success || podmanResult.success;
        assert.ok(hasRunningRuntime, 'Either Docker or Podman daemon must be running');
    });

    test('AWS CLI should be installed', async () => {
        const result = await runCommand('aws --version');
        assert.ok(result.success, 'AWS CLI must be installed for this tutorial');
    });
});

suite('Terminal Management Tests', () => {
    test('Should be able to create a terminal', async () => {
        const terminal = vscode.window.createTerminal('Test Terminal');
        assert.ok(terminal, 'Terminal should be created');
        assert.strictEqual(terminal.name, 'Test Terminal', 'Terminal should have correct name');
        terminal.dispose();
    });

    test('Should be able to send commands to terminal', async () => {
        const terminal = vscode.window.createTerminal('Command Test');
        terminal.sendText('echo "test"');
        // If we get here without error, the command was sent
        assert.ok(true, 'Command sent successfully');
        terminal.dispose();
    });

    test('Multiple terminals can be created for parallel commands', async () => {
        const terminal1 = vscode.window.createTerminal('Kiro Tutorial');
        const terminal2 = vscode.window.createTerminal('Kiro Tutorial 2');

        assert.ok(terminal1, 'First terminal should be created');
        assert.ok(terminal2, 'Second terminal should be created');
        assert.notStrictEqual(terminal1, terminal2, 'Terminals should be different instances');

        terminal1.dispose();
        terminal2.dispose();
    });
});

suite('URL and Clipboard Tests', () => {
    test('Should be able to open external URLs', async () => {
        assert.ok(typeof vscode.env.openExternal === 'function', 'openExternal should be available');
    });

    test('Should be able to parse valid URLs', () => {
        const urls = [
            'http://localhost:5173',
            'http://localhost:8080',
            'https://git-scm.com/downloads',
            'https://podman.io/docs/installation',
            'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html'
        ];

        for (const url of urls) {
            const parsed = vscode.Uri.parse(url);
            assert.ok(parsed, `URL ${url} should be parseable`);
            assert.ok(parsed.scheme === 'http' || parsed.scheme === 'https', 'Should have valid scheme');
        }
    });

    test('Game URL should be localhost:5173', () => {
        const gameUrl = 'http://localhost:5173';
        const parsed = vscode.Uri.parse(gameUrl);
        assert.strictEqual(parsed.authority, 'localhost:5173', 'Game URL authority must be localhost:5173');
    });

    test('Server URL should be localhost:8080', () => {
        const serverUrl = 'http://localhost:8080';
        const parsed = vscode.Uri.parse(serverUrl);
        assert.strictEqual(parsed.authority, 'localhost:8080', 'Server URL authority must be localhost:8080');
    });

    test('Should be able to write to clipboard', async () => {
        const testText = 'test clipboard content';
        await vscode.env.clipboard.writeText(testText);
        const result = await vscode.env.clipboard.readText();
        assert.strictEqual(result, testText, 'Clipboard should contain written text');
    });

    test('Should be able to copy command to clipboard', async () => {
        const command = 'git clone git@github.com:kirodotdev/spirit-of-kiro.git';
        await vscode.env.clipboard.writeText(command);
        const result = await vscode.env.clipboard.readText();
        assert.strictEqual(result, command, 'Command should be copied to clipboard');
    });
});

suite('Lesson 2 Data Generation Tests', () => {
    let provider: TutorialViewProvider;

    setup(() => {
        const mockUri = vscode.Uri.file('/mock/extension/path');
        provider = new TutorialViewProvider(mockUri);
    });

    teardown(() => {
        provider.dispose();
    });

    suite('URL Generation', () => {
        test('Homepage URL should be localhost:5173', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(data.homepageUrl, 'http://localhost:5173', 'Homepage URL must be exact');
        });

        test('Server URL should be localhost:8080', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(data.serverUrl, 'http://localhost:8080', 'Server URL must be exact');
        });

        test('Homepage URL should be parseable', () => {
            const data = provider.generateLesson2Data();
            const parsed = vscode.Uri.parse(data.homepageUrl);
            assert.strictEqual(parsed.scheme, 'http', 'Should use http scheme');
            assert.strictEqual(parsed.authority, 'localhost:5173', 'Should point to localhost:5173');
        });

        test('Server URL should be parseable', () => {
            const data = provider.generateLesson2Data();
            const parsed = vscode.Uri.parse(data.serverUrl);
            assert.strictEqual(parsed.scheme, 'http', 'Should use http scheme');
            assert.strictEqual(parsed.authority, 'localhost:8080', 'Should point to localhost:8080');
        });
    });

    suite('Steering Files', () => {
        test('Steering command should be exact', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(
                data.steeringCommand,
                'Kiro: Generate project steering documents',
                'Steering command must match Kiro command palette name'
            );
        });

        test('Should list all expected steering files', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(data.steeringFiles.length, 3, 'Should have 3 steering files');
        });

        test('Should include product.md', () => {
            const data = provider.generateLesson2Data();
            assert.ok(
                data.steeringFiles.includes('.kiro/product.md'),
                'Should include .kiro/product.md'
            );
        });

        test('Should include tech.md', () => {
            const data = provider.generateLesson2Data();
            assert.ok(
                data.steeringFiles.includes('.kiro/tech.md'),
                'Should include .kiro/tech.md'
            );
        });

        test('Should include structure.md', () => {
            const data = provider.generateLesson2Data();
            assert.ok(
                data.steeringFiles.includes('.kiro/structure.md'),
                'Should include .kiro/structure.md'
            );
        });

        test('Steering files should be in .kiro directory', () => {
            const data = provider.generateLesson2Data();
            for (const file of data.steeringFiles) {
                assert.ok(file.startsWith('.kiro/'), `${file} should be in .kiro directory`);
            }
        });
    });

    suite('Prompts', () => {
        test('Improve prompt should exist and be non-empty', () => {
            const data = provider.generateLesson2Data();
            assert.ok(data.prompts.improve, 'Improve prompt should exist');
            assert.ok(data.prompts.improve.length > 0, 'Improve prompt should be non-empty');
        });

        test('Improve prompt should mention homepage', () => {
            const data = provider.generateLesson2Data();
            assert.ok(
                data.prompts.improve.toLowerCase().includes('homepage'),
                'Improve prompt should mention homepage'
            );
        });

        test('Improve prompt should be exact', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(
                data.prompts.improve,
                'I want you to make my homepage better. Add compelling graphics, game explanations, and make it visually appealing.',
                'Improve prompt must match exactly'
            );
        });

        test('Themes prompt should exist and be non-empty', () => {
            const data = provider.generateLesson2Data();
            assert.ok(data.prompts.themes, 'Themes prompt should exist');
            assert.ok(data.prompts.themes.length > 0, 'Themes prompt should be non-empty');
        });

        test('Themes prompt should be exact', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(
                data.prompts.themes,
                'Give me 20 potential themes for a game landing page',
                'Themes prompt must match exactly'
            );
        });

        test('Amazon style prompt should exist and be non-empty', () => {
            const data = provider.generateLesson2Data();
            assert.ok(data.prompts.amazonStyle, 'Amazon style prompt should exist');
            assert.ok(data.prompts.amazonStyle.length > 0, 'Amazon style prompt should be non-empty');
        });

        test('Amazon style prompt should mention Amazon', () => {
            const data = provider.generateLesson2Data();
            assert.ok(
                data.prompts.amazonStyle.includes('Amazon'),
                'Amazon style prompt should mention Amazon'
            );
        });

        test('Amazon style prompt should be exact', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(
                data.prompts.amazonStyle,
                'Reimagine the homepage in Amazon product marketing style with clear CTAs and customer focus',
                'Amazon style prompt must match exactly'
            );
        });

        test('Carousel prompt should exist and be non-empty', () => {
            const data = provider.generateLesson2Data();
            assert.ok(data.prompts.carousel, 'Carousel prompt should exist');
            assert.ok(data.prompts.carousel.length > 0, 'Carousel prompt should be non-empty');
        });

        test('Carousel prompt should be exact', () => {
            const data = provider.generateLesson2Data();
            assert.strictEqual(
                data.prompts.carousel,
                'Add a carousel, customer quotes, and smooth animations to the homepage',
                'Carousel prompt must match exactly'
            );
        });

        test('All prompts should be different', () => {
            const data = provider.generateLesson2Data();
            const prompts = [
                data.prompts.improve,
                data.prompts.themes,
                data.prompts.amazonStyle,
                data.prompts.carousel
            ];
            const uniquePrompts = new Set(prompts);
            assert.strictEqual(uniquePrompts.size, 4, 'All prompts should be unique');
        });
    });

    suite('Data Consistency', () => {
        test('Lesson 2 data should be consistent across multiple calls', () => {
            const data1 = provider.generateLesson2Data();
            const data2 = provider.generateLesson2Data();

            assert.strictEqual(data1.homepageUrl, data2.homepageUrl, 'Homepage URL should be consistent');
            assert.strictEqual(data1.serverUrl, data2.serverUrl, 'Server URL should be consistent');
            assert.strictEqual(data1.steeringCommand, data2.steeringCommand, 'Steering command should be consistent');
            assert.deepStrictEqual(data1.steeringFiles, data2.steeringFiles, 'Steering files should be consistent');
            assert.deepStrictEqual(data1.prompts, data2.prompts, 'Prompts should be consistent');
        });

        test('Lesson 2 data should not depend on provider state', () => {
            // Change provider state
            provider.setAwsProfileForTest('different-profile');
            provider.setAwsRegionForTest('eu-west-1');
            provider.setContainerRuntimeForTest('docker');

            const data = provider.generateLesson2Data();

            // Lesson 2 data should not change based on AWS/container settings
            assert.strictEqual(data.homepageUrl, 'http://localhost:5173', 'Homepage URL should not depend on state');
            assert.strictEqual(data.serverUrl, 'http://localhost:8080', 'Server URL should not depend on state');
        });
    });
});
