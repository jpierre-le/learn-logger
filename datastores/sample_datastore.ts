import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

/**
 * データストアは、アプリのデータを保存して取得するための
 * Slackがホストする場所です。
 * https://api.slack.com/automation/datastores
 */
const SampleObjectDatastore = DefineDatastore({
  name: "SampleObjects",
  primary_key: "object_id",
  attributes: {
    object_id: {
      type: Schema.types.string,
    },
    original_msg: {
      type: Schema.types.string,
    },
    updated_msg: {
      type: Schema.types.string,
    },
    timestamp: {
      type: Schema.types.string,
    },
  },
});

export default SampleObjectDatastore;
