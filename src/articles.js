const articles = [
  {
    slug: "designing-notification-systems-for-fulfillment-events",
    category: "System design",
    title: "Designing a notification system for fulfillment events",
    summary:
      "A practical design for turning order and shipment events into timely, accurate customer notifications—without making the fulfillment workflow depend on an email or SMS provider.",
    sections: [
      {
        heading: "Start with the customer promise",
        paragraphs: [
          "A notification platform is more than a service that sends messages. Its job is to turn meaningful changes in a business workflow into accurate, useful updates through channels customers can receive. For fulfillment, that may include an order being accepted, a shipment leaving a facility, or tracking information becoming available.",
          "Before choosing a queue or provider, define the behavior the system must guarantee. Which events deserve a message? How quickly should an update arrive? Can a customer receive a duplicate? What happens when contact details are missing, preferences change, or a delivery provider is unavailable? These answers shape the design more than an early choice of cloud service.",
        ],
      },
      {
        heading: "Separate event processing from message delivery",
        paragraphs: [
          "A useful starting architecture has four responsibilities: ingest domain events, decide whether each event warrants a notification, render a message for the customer and channel, and deliver it through a provider. A durable queue between decisioning and delivery absorbs bursts and prevents a slow provider from blocking fulfillment systems.",
          "Keep the event contract explicit. Include a stable event identifier, entity identifier, event type, occurrence time, schema version, and the minimum data needed for downstream processing. Avoid putting unnecessary personal information in broadly distributed events. Consumers should tolerate unknown optional fields and make schema changes compatible where possible.",
          "Treat delivery as at-least-once unless the provider and the full path genuinely support stronger guarantees. Use an idempotency key derived from the event, recipient, and notification type to prevent retries from sending duplicate messages. If ordering matters, define the ordering key—often an order or shipment—and avoid assuming that a general-purpose queue preserves business order across all workers.",
        ],
      },
      {
        heading: "Make failure handling part of the design",
        paragraphs: [
          "Transient failures need bounded retries with backoff and jitter. Permanent failures, such as invalid destination data, should not retry forever. After a defined retry policy, route messages to a dead-letter workflow that records why delivery failed and supports safe inspection or replay.",
          "A replay must be deliberate. Operators need to know whether replaying an event will re-evaluate current preferences, use the original rendered content, or create a new message. Store enough state to make that behavior predictable, while applying retention limits and access controls to sensitive payloads.",
        ],
      },
      {
        heading: "Measure outcomes, not just queue depth",
        paragraphs: [
          "Track event-to-notification latency, delivery acceptance and failure rates by channel, retry volume, duplicate suppression, queue age, and dead-letter volume. Correlate records with stable identifiers so an operator can follow one notification across ingestion, decisioning, rendering, and provider delivery without exposing message contents in logs.",
          "The design is successful when customers receive the right update at the right time and the fulfillment path continues to work when notification dependencies degrade. Start with those customer and operational guarantees, then scale each stage according to measured bottlenecks.",
        ],
      },
    ],
    takeaways: [
      "Define customer-facing delivery and freshness guarantees before selecting infrastructure.",
      "Use durable asynchronous processing, idempotency, bounded retries, and an explicit replay policy.",
      "Instrument the complete path from business event to provider outcome while minimizing sensitive data.",
    ],
  },
  {
    slug: "capacity-planning-beyond-a-single-tps-number",
    category: "System design",
    title: "Capacity planning beyond a single TPS number",
    summary:
      "A throughput target is useful only when it describes the workload, the bottlenecks, and the operating conditions the system must survive.",
    sections: [
      {
        heading: "Ask what the number represents",
        paragraphs: [
          "Transactions per second is an easy number to put in a design document and an easy one to misunderstand. Is it an average over a day, a short peak, a contractual limit, or a load-test result? Does one transaction mean one API request, one accepted business event, or one customer-visible outcome? Without a definition, two teams may use the same number to describe very different workloads.",
          "Write down the unit and the observation window. Include the average rate, expected peak, burst duration, and any seasonal or scheduled patterns. A short burst can overflow a queue even when the daily average looks small. A steady rate can still overwhelm a downstream dependency if processing time or fan-out is high.",
        ],
      },
      {
        heading: "Model work through the whole path",
        paragraphs: [
          "Follow one input through every stage: request handling, validation, persistence, event publication, consumer processing, external calls, and any fan-out. One accepted event may create multiple database operations or downstream messages. Capacity planning should account for that work multiplier rather than treating input TPS as total system work.",
          "For each stage, identify the constrained resource: CPU, memory, connection pools, database IOPS, partition throughput, provider quotas, or network bandwidth. Measure latency and error behavior at the limit, not only the maximum rate a benchmark can produce. A fast service that rejects work or creates an unbounded backlog is not meeting the workload.",
          "Queueing changes the question from “Can it process the peak?” to “How quickly can it recover after the peak?” If arrivals temporarily exceed processing capacity, estimate the backlog and recovery time. Make sure the queue has retention and storage headroom and that downstream systems can handle catch-up traffic.",
        ],
      },
      {
        heading: "Plan for failure and growth",
        paragraphs: [
          "Capacity is also a resilience question. If a dependency slows down, retries can multiply load precisely when the system has the least spare capacity. Use bounded retries, backoff, circuit breaking where appropriate, and limits on concurrent work. Reserve headroom for deployments, noisy neighbors, uneven partition distribution, and partial failures.",
          "Set targets based on evidence: production telemetry, realistic load tests, dependency limits, and agreed growth assumptions. A design target is not the same as measured production throughput; label each clearly. Revisit assumptions when traffic shape, product behavior, or downstream contracts change.",
        ],
      },
      {
        heading: "Turn the estimate into an operating plan",
        paragraphs: [
          "A useful capacity plan names the workload, assumptions, bottleneck, safe operating range, alert thresholds, and scaling or throttling response. It also identifies who owns each external quota and how capacity changes are tested. This gives engineering and product teams a shared basis for prioritizing reliability work.",
          "The goal is not to predict one perfect TPS number. It is to understand the system’s behavior across normal load, peaks, recovery, and failure—and to know what action to take before customers feel the impact.",
        ],
      },
    ],
    takeaways: [
      "Define what a transaction is and whether a rate is average, peak, target, or measured.",
      "Model fan-out, queue recovery, retries, and downstream quotas across the entire request path.",
      "Document assumptions, safe limits, alerts, and the response when the system approaches capacity.",
    ],
  },
  {
    slug: "where-ai-assisted-development-helps-and-review-matters",
    category: "AI in software",
    title: "Where AI-assisted development helps—and where review matters",
    summary:
      "Use AI tools to accelerate engineering work without outsourcing judgment, security responsibility, or ownership of the result.",
    sections: [
      {
        heading: "Treat AI as an accelerator, not an owner",
        paragraphs: [
          "AI-assisted development can reduce friction in tasks such as exploring an unfamiliar codebase, drafting tests, explaining an error, generating routine scaffolding, or comparing implementation options. These are useful starting points, especially when the developer can quickly verify whether the output fits the surrounding system.",
          "The tool does not own the change. The engineer proposing a patch remains responsible for understanding its behavior, compatibility, failure modes, and operational impact. A plausible explanation or compiling implementation is not proof that it is correct.",
        ],
      },
      {
        heading: "Give bounded context and a verifiable task",
        paragraphs: [
          "The quality of assistance depends on context. Provide the relevant interfaces, constraints, expected behavior, and test commands, while respecting company rules for source code and data. Keep requests narrow enough that the output can be reviewed. Ask for assumptions and edge cases rather than accepting a confident answer without evidence.",
          "A productive loop is to inspect the existing pattern, ask for a focused change, review the diff, run targeted tests, and then validate the behavior in the wider system. For code generation, require the same standards as human-written code: clear types, useful error handling, accessible UI, and tests for meaningful behavior.",
        ],
      },
      {
        heading: "Review risks that are easy to miss",
        paragraphs: [
          "Generated code may use an unsafe API, mishandle authorization, leak data in logs, omit a boundary check, or introduce an inefficient query. It can also invent package functions, misunderstand local conventions, or encode a subtly wrong domain assumption. Review control flow and data handling, not just formatting.",
          "For higher-risk work—authentication, payments, sensitive data, infrastructure changes, or production migrations—use stronger independent review and targeted security or reliability checks. AI can help create a checklist or test cases, but it should not replace the required approval process.",
        ],
      },
      {
        heading: "Measure outcomes, not activity",
        paragraphs: [
          "The meaningful question is whether the tool improves delivery quality or reduces time spent on low-value work. Track outcomes such as review rework, defect patterns, lead time, test effectiveness, and developer experience. Raw suggestion acceptance is not a quality metric.",
          "Teams should make expectations explicit: which tools are approved, what information can be shared, what must be reviewed, and where AI use should be disclosed. Clear guardrails let engineers experiment while preserving trust and accountability.",
        ],
      },
    ],
    takeaways: [
      "Use AI for bounded assistance, then independently verify the result in the codebase.",
      "Review security, privacy, correctness, and domain assumptions as carefully as syntax.",
      "Evaluate impact through quality and delivery outcomes, not generated lines or acceptance rates.",
    ],
  },
  {
    slug: "evaluating-machine-translation-quality-in-a-product-workflow",
    category: "AI and localization",
    title: "Evaluating machine translation quality in a product workflow",
    summary:
      "A reliable translation workflow combines automation with context-aware evaluation, language expertise, and risk-based review.",
    sections: [
      {
        heading: "Quality depends on context",
        paragraphs: [
          "A translation can be grammatically fluent and still be wrong for the product. Terminology, user intent, space constraints, tone, locale conventions, and legal meaning all affect whether a string is ready to ship. A single score cannot capture every one of these dimensions.",
          "Start by classifying content. A low-risk internal label, a customer-facing onboarding step, and a legal or safety message need different levels of review. Define acceptable quality and escalation paths for each category before automating the workflow.",
        ],
      },
      {
        heading: "Build an evaluation loop, not a one-time score",
        paragraphs: [
          "Automated metrics can help compare system versions or flag suspicious changes, but they are proxies. Reference-based metrics depend on the quality and variety of reference translations. Semantic metrics can miss terminology or brand violations. Automated fluency checks may not detect a meaning reversal or a locale-specific issue.",
          "Combine signals: terminology checks, placeholder and markup validation, source-text changes, length constraints, automated quality estimation, and reviewer feedback. Human evaluation should use a consistent rubric—for example, accuracy, terminology, fluency, locale appropriateness, and severity of any defect.",
          "Sample broadly across languages, content types, and risk levels. An aggregate score can hide a serious regression in one locale or a class of strings. Keep a representative evaluation set and compare results over time, including examples that previously failed.",
        ],
      },
      {
        heading: "Keep the workflow safe and traceable",
        paragraphs: [
          "Preserve the source version, translation engine or model version, glossary and style-guide versions, reviewer decisions, and final approved text. This makes changes explainable and supports rollback when a translation causes confusion.",
          "Protect confidential content and personal data according to policy. Validate placeholders, links, markup, and formatting before publication. If generated translations are edited by people, retain the distinction between machine output and approved content so downstream teams know what has been reviewed.",
        ],
      },
      {
        heading: "Improve from production signals",
        paragraphs: [
          "Monitor corrections, support contacts, user feedback, and release delays, but interpret them carefully: not every issue is caused by translation, and users may not report every problem. Route confirmed issues back to terminology, prompts or model configuration, source authoring, and review rules.",
          "The goal is not to remove human expertise. It is to spend that expertise where it changes outcomes, while automating predictable checks and making the quality bar visible to product, engineering, and localization teams.",
        ],
      },
    ],
    takeaways: [
      "Set quality standards by content risk and user impact instead of relying on one universal score.",
      "Combine automated checks with structured human evaluation across representative locales.",
      "Version the inputs and decisions so translations are traceable, reviewable, and reversible.",
    ],
  },
  {
    slug: "what-changes-when-software-serves-a-global-audience",
    category: "Software industry",
    title: "What changes when software serves a global audience",
    summary:
      "Internationalization is an architectural and product practice—not a final translation step before launch in another market.",
    sections: [
      {
        heading: "Design for variation before it becomes expensive",
        paragraphs: [
          "Software built for one language and region often encodes assumptions into storage, interfaces, content, and workflows. Text length is fixed, dates are treated as universal, and currency or address formats are hard-coded. These decisions make later market expansion riskier and more expensive.",
          "Internationalization prepares the product to support variation; localization adapts the experience for a particular locale. Treat both as product requirements early. Use Unicode-capable storage, locale-aware formatting libraries, externalized strings, and components that can accommodate different text lengths and writing directions.",
        ],
      },
      {
        heading: "Make user-visible data locale-aware",
        paragraphs: [
          "Dates, times, numbers, currencies, names, addresses, and units need explicit rules. Store timestamps in a consistent representation and render them for the user’s locale and time zone. Do not infer a user’s time zone from a server location. Use locale-aware pluralization and number formatting instead of concatenating translated fragments.",
          "Plan for right-to-left scripts, non-Latin text, and languages where a sentence may be much longer or shorter than its source. Layouts should adapt rather than rely on fixed widths. Test with representative pseudo-localized content and real scripts, including mixed-direction text.",
        ],
      },
      {
        heading: "Treat translation as a product workflow",
        paragraphs: [
          "Localization depends on source quality and software architecture. Stable string identifiers, context for translators, screenshots where useful, glossary guidance, and automated extraction all reduce ambiguity. A source change should make it clear which translations are stale and which can remain approved.",
          "Build validation into delivery: missing-string checks, placeholder matching, layout tests, and locale-specific smoke tests. For high-impact content, include a review process appropriate to the risk. Coordinate release plans so translation and engineering work are visible rather than discovered as a launch blocker.",
        ],
      },
      {
        heading: "Measure the whole experience",
        paragraphs: [
          "A translated interface is not necessarily a localized product. Consider onboarding, help content, support readiness, legal requirements, payment and delivery expectations, and regional product behavior. Engage local users or experts to identify assumptions that a language review alone will not reveal.",
          "Track issues by locale, completion and error rates, translation turnaround, and user feedback. These signals help teams distinguish tooling problems from source-content problems and market-specific experience gaps. Global readiness is a continuing capability, not a checkbox at launch.",
        ],
      },
    ],
    takeaways: [
      "Build locale flexibility into architecture and product design before expansion deadlines.",
      "Test formatting, layout, scripts, and workflows—not just translated strings.",
      "Connect localization operations to release planning, support, and user feedback.",
    ],
  },
  {
    slug: "staying-technical-while-leading-a-growing-engineering-team",
    category: "Engineering leadership",
    title: "Staying technical while leading a growing engineering team",
    summary:
      "Technical leadership at scale is less about personally making every change and more about creating the conditions for sound decisions and strong ownership.",
    sections: [
      {
        heading: "Redefine what hands-on means",
        paragraphs: [
          "As a team grows, a manager cannot be the primary author, reviewer, and decision-maker for every piece of work without becoming a bottleneck. Staying technical does not require owning the most code. It means understanding the system, asking useful questions, and helping the team make decisions that hold up in production.",
          "Choose technical involvement deliberately. Join design discussions where trade-offs or cross-team boundaries matter. Review representative changes when it helps you understand risk or coach an engineer. Investigate incidents alongside the people closest to the system, then focus on learning and prevention rather than blame.",
        ],
      },
      {
        heading: "Use questions to improve decisions",
        paragraphs: [
          "Useful questions expose assumptions: What happens when this dependency is unavailable? How will we migrate existing data? Which customer workflow changes? What is the rollback plan? What evidence would tell us this design is not working?",
          "The purpose is not to prove that the manager knows more. Make the reasoning visible, invite alternatives, and let the person accountable for the work explain the trade-offs. If a decision affects multiple teams, document the context and revisit conditions so it can evolve when evidence changes.",
        ],
      },
      {
        heading: "Create room for ownership",
        paragraphs: [
          "Delegation works when people have a clear outcome, constraints, decision authority, and access to help. Handing off a task without context is not ownership; retaining every important decision is not delegation. Agree on checkpoints based on risk and uncertainty rather than status frequency alone.",
          "Develop technical leaders across the team by sharing design responsibility, rotating operational ownership, and supporting engineers as they lead reviews or cross-functional conversations. Make it safe to raise uncertainty early. That gives a manager time to remove obstacles before they become delivery surprises.",
        ],
      },
      {
        heading: "Protect time for leadership work",
        paragraphs: [
          "A calendar filled with reviews and escalations leaves little space for planning, coaching, or understanding the system. Set intentional time for one-on-ones, roadmap and architecture thinking, and follow-through on team health. Stay connected to implementation through selected, high-value touchpoints rather than constant interruption.",
          "The balance changes with team needs. During an incident or a difficult technical transition, deeper involvement may be right. As the team gains clarity and capability, step back and let ownership move to the people doing the work. The measure of technical leadership is the quality and resilience of the team’s decisions—not how many decisions require the manager.",
        ],
      },
    ],
    takeaways: [
      "Stay close to systems and trade-offs without becoming the team’s default implementer.",
      "Use questions and written decision context to improve reasoning and preserve ownership.",
      "Delegate outcomes with authority, constraints, support, and risk-appropriate checkpoints.",
    ],
  },
];

export default articles;
