const { StepFunctionsClient, StartExecutionCommand } = require('@aws-sdk/client-sfn');

const stepFunctionsClient = new StepFunctionsClient({ region: 'REGION' });

exports.handler = async (event) => {
    const stateMachineArn = 'arn:aws:states:REGION:ACCOUNT_ID:stateMachine:YourStateMachineName';  // Replace with your State Machine ARN

    const input = {
        inputData: event.inputData,
    };

    const params = {
        stateMachineArn,
        input: JSON.stringify(input),
    };

    try {
        const command = new StartExecutionCommand(params);
        const data = await stepFunctionsClient.send(command);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'State machine started successfully',
                executionArn: data.executionArn,
            }),
        };
    } catch (error) {
        console.error('Error starting state machine execution:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to start state machine execution',
                error: error.message,
            }),
        };
    }
};
