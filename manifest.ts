import { Manifest } from "deno-slack-sdk/mod.ts";
import SampleWorkflow from "./workflows/sample_workflow.ts";
import SampleObjectDatastore from "./datastores/sample_datastore.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "festive-mink-997",
  description: "学習の進捗率を記録して経過日数と比較するSlackアプリ",
  icon: "assets/default_new_app_icon.png",
  workflows: [SampleWorkflow],
  outgoingDomains: [],
  datastores: [SampleObjectDatastore],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
