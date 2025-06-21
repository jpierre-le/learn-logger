import type { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import SampleWorkflow from "../workflows/sample_workflow.ts";
/**
 * トリガーはワークフローが実行されるタイミングを決定します。
 * トリガーファイルは、ユーザーがボタンを押したときや特定のイベントが
 * 発生したときなど、ワークフローが実行されるべきシナリオを記述します。
 * https://api.slack.com/automation/triggers
 */
const sampleTrigger: Trigger<typeof SampleWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "学習進捗を記録する",
  description: "学習の進捗率を記録して、経過日数との比較を表示します",
  workflow: `#/workflows/${SampleWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: {
      value: TriggerContextData.Shortcut.interactivity,
    },
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
    user: {
      value: TriggerContextData.Shortcut.user_id,
    },
  },
};

export default sampleTrigger;
