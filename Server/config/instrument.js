// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://3a0600f1e7dc72b7d8c1e8d0ca9fa677@o4509549250478080.ingest.us.sentry.io/4509549255852032",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  integrations: [Sentry.mongooseIntegration(),
  ],
  sendDefaultPii: true,
});

