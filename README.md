# AWS Step Functions Express Workflow for Order Processing

This repository contains an **AWS Step Functions Express Workflow** for processing an order through multiple Lambda functions. The state machine orchestrates the flow of **input validation**, **payment processing**, and **order confirmation**.

## Architecture Overview

The solution consists of the following components:
1. **Trigger Lambda**: Triggers the execution of the Step Functions state machine.
2. **Input Validation Lambda**: Validates the input data for the order.
3. **Payment Processing Lambda**: Processes the payment for the order.
4. **Order Confirmation Lambda**: Confirms the order after payment is successfully processed.
5. **Step Functions Express Workflow**: Orchestrates the flow between the Lambda functions and handles error scenarios.

## AWS Services Involved:
- **AWS Lambda**: To execute business logic in serverless functions.
- **AWS Step Functions**: Orchestrates the flow between Lambda functions.
- **IAM Roles**: Provides appropriate permissions for Step Functions to invoke Lambda functions.

## Workflow Description

1. **TriggerStateMachine**: 
   - Invokes a Lambda function that starts the entire Step Functions workflow.
2. **InputValidation**: 
   - Validates the input data.
   - If valid, moves to **PaymentProcessing**.
3. **PaymentProcessing**: 
   - Handles the payment processing logic.
   - If successful, moves to **OrderConfirmation**.
4. **OrderConfirmation**: 
   - Final step confirming the order.
   - This is the last state of the workflow.
5. **Fail**: 
   - If any step fails, the workflow transitions to a fail state.

## Step Functions State Machine YAML

```yaml
Version: '1.0'
Comment: 'Express Workflow State Machine for Order Processing'

StartAt: TriggerStateMachine
States:
  TriggerStateMachine:
    Type: Task
    Resource: arn:aws:lambda:REGION:ACCOUNT_ID:function:TriggerStateMachineLambda  # Replace with actual Lambda ARN
    Next: InputValidation

  InputValidation:
    Type: Task
    Resource: arn:aws:lambda:REGION:ACCOUNT_ID:function:InputValidationLambda  # Replace with actual Lambda ARN
    Next: PaymentProcessing
    Catch:
      - ErrorEquals:
          - 'States.ALL'
        ResultPath: '$.error'
        Next: Fail

  PaymentProcessing:
    Type: Task
    Resource: arn:aws:lambda:REGION:ACCOUNT_ID:function:PaymentProcessingLambda  # Replace with actual Lambda ARN
    Next: OrderConfirmation
    Catch:
      - ErrorEquals:
          - 'States.ALL'
        ResultPath: '$.error'
        Next: Fail

  OrderConfirmation:
    Type: Task
    Resource: arn:aws:lambda:REGION:ACCOUNT_ID:function:OrderConfirmationLambda  # Replace with actual Lambda ARN
    End: true
    Catch:
      - ErrorEquals:
          - 'States.ALL'
        ResultPath: '$.error'
        Next: Fail

  Fail:
    Type: Fail
    Error: 'ProcessingFailed'
    Cause: 'One or more steps failed.'
