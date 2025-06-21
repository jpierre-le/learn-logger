import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SampleFunctionDefinition } from "../functions/sample_function.ts";

/**
 * ワークフローは順番に実行される一連のステップです。
 * ワークフロー内の各ステップは関数です。
 * https://api.slack.com/automation/workflows
 *
 * このワークフローはインタラクティブ機能を使用しています。詳細はこちら：
 * https://api.slack.com/automation/forms#add-interactivity
 */
const SampleWorkflow = DefineWorkflow({
  callback_id: "sample_workflow",
  title: "学習進捗ロガー",
  description: "学習の進捗率を記録するワークフロー",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["interactivity", "channel", "user"],
  },
});

/**
 * ユーザーからの入力を収集するために、最初のステップとして
 * OpenForm Slack関数を使用することをお勧めします。
 * https://api.slack.com/automation/functions#open-a-form
 */
const inputForm = SampleWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "学習進捗の記録",
    interactivity: SampleWorkflow.inputs.interactivity,
    submit_label: "記録する",
    fields: {
      elements: [{
        name: "channel",
        title: "進捗を記録するチャンネル",
        type: Schema.slack.types.channel_id,
        default: SampleWorkflow.inputs.channel,
      }, {
        name: "progress",
        title: "学習の進捗率 (%)",
        type: Schema.types.number,
        minimum: 0,
        maximum: 100,
      }],
      required: ["channel", "progress"],
    },
  },
);

/**
 * カスタム関数は、Slackインフラストラクチャにデプロイされる
 * 再利用可能な自動化のビルディングブロックです。
 * 一般的なプログラム関数と同様に、入力を受け取り、計算を実行し、
 * 出力を提供します。
 * https://api.slack.com/automation/functions/custom
 */
const sampleFunctionStep = SampleWorkflow.addStep(SampleFunctionDefinition, {
  progress: inputForm.outputs.fields.progress,
  user: SampleWorkflow.inputs.user,
});

/**
 * SendMessageはSlack関数です。これらは
 * チャンネルの作成やメッセージの送信などのSlackネイティブなアクションであり、
 * ワークフロー内でカスタム関数と一緒に使用できます。
 * https://api.slack.com/automation/functions
 */
SampleWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: sampleFunctionStep.outputs.updatedMsg,
});

export default SampleWorkflow;
