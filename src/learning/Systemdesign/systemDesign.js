const systemDesignContent = [
  {
    slug: "whatsapp-messaging",
    type: "System design",
    title: "Design a WhatsApp-style instant messaging platform",
    summary:
      "Explore conversations, durable message delivery, offline synchronization, and end-to-end encryption.",
    updatedAt: "2026-10-18",
    visible: true,
    sections: [
      {
        heading: "Scope and assumptions",
        body:
          "Design one-to-one messaging first, then show how groups extend it. Users register a device, establish conversations, send text messages, receive delivery/read receipts, and synchronize messages after reconnecting. Media upload, voice/video calling, public channels, and multi-device key backup are outside the first scope.\n\nIllustrative sizing assumptions for the exercise (not product telemetry): 100 million daily active users, 40 messages sent per user per day, a 5× peak-to-average factor, and 1 KB average persisted message envelope. Real sizing must be recalculated from measured traffic and retention policy.",
      },
      {
        heading: "Requirements",
        body:
          "Functional: authenticate devices; resolve recipients; accept, persist, and deliver messages; support offline recipients; provide sent/delivered/read state; maintain per-conversation order; support groups; and synchronize missed messages on reconnect.\n\nNon-functional: low interactive latency, no acknowledged message loss, horizontal scale, regional resilience, privacy through end-to-end encryption, abuse controls, and explicit retention/deletion behavior. Availability targets and retention are product decisions, not assumptions to hide in the implementation.",
      },
      {
        heading: "Back-of-the-envelope estimates",
        body:
          "100M DAU × 40 messages/day = 4B messages/day. Average ingress is about 46K messages/second (4B ÷ 86,400); a 5× peak gives about 231K/second. At 1 KB per message envelope, raw message payload is roughly 4 TB/day before indexes, replication, metadata, media, and protocol overhead. A 30-day hot-retention window would be about 120 TB raw under these assumptions. Capacity for fan-out, receipts, retries, and group membership can be comparable or larger and needs separate measurement.",
      },
      {
        heading: "High-level architecture",
        body:
          "Clients maintain authenticated, long-lived connections to a regional connection gateway. The gateway validates the device session and forwards send commands to a message service. A conversation service authorizes membership and assigns a monotonically increasing sequence within the conversation. The message service durably commits the encrypted envelope and an outbox record before acknowledging acceptance.\n\nAn asynchronous delivery pipeline reads the outbox, routes to online recipient connections, or records pending delivery for offline devices. A push-notification adapter sends a generic wake-up notification without exposing message plaintext. History synchronization reads authorized messages after a device cursor. Receipts are separate idempotent events. Media travels directly to object storage through short-lived upload/download grants; chat messages contain encrypted media references.",
      },
      {
        heading: "API sketch",
        body:
          "POST /v1/conversations/{conversationId}/messages — clientMessageId, ciphertext, key metadata; returns messageId, conversationSequence, acceptedAt. The clientMessageId is idempotent per sender device.\n\nGET /v1/conversations/{conversationId}/messages?afterSequence={n}&limit={k} — returns the next authorized page and a continuation cursor.\n\nPOST /v1/messages/{messageId}/receipts — receipt type (delivered/read) and device cursor. The server validates that the caller is a recipient and deduplicates repeated receipt events.\n\nA production API would also define pagination limits, rate limits, error codes, key lifecycle, and device synchronization semantics.",
      },
      {
        heading: "Data model and ordering",
        body:
          "Conversation(conversation_id, kind, created_at); ConversationMember(conversation_id, user_id, role, joined_at, left_at); Message(conversation_id, sequence, message_id, sender_device_id, client_message_id, ciphertext, created_at, expires_at); DeviceCursor(user_id, device_id, conversation_id, delivered_sequence, read_sequence); Outbox(event_id, conversation_id, sequence, event_type, created_at, processed_at).\n\nPartition message storage by conversation_id and sequence range. A conversation-scoped sequencer provides order without requiring a global ordering service. For very large groups, partitioning fan-out by recipient/device avoids one hot delivery queue. Sequence allocation and database writes must be coordinated so retries cannot create gaps or duplicate logical messages.",
      },
      {
        heading: "Delivery, retries, and failure handling",
        body:
          "Persist-before-ack makes acceptance durable. Outbox publication is at-least-once; consumers use messageId/eventId idempotency. The client also retries with the same clientMessageId after timeouts. Online delivery is best effort and repeated until the recipient cursor advances; reconnect synchronization is the source of truth, not push delivery. Backpressure protects storage and connection gateways during spikes. A regional failover policy must decide whether writes pause briefly or accept a bounded consistency trade-off.",
      },
      {
        heading: "Security and trade-offs",
        body:
          "End-to-end encryption means services route ciphertext and cannot inspect content. Devices verify identity/key changes, and key distribution is an explicit subsystem. Encrypt metadata where feasible, minimize logs, protect backups, rate-limit account and message operations, and use generic push payloads. Abuse reporting may require a user-initiated client-side report flow because the service cannot routinely scan plaintext.\n\nA per-conversation ordering key simplifies client experience but can become hot for huge groups. Fan-out-on-write is fast for small groups; fan-out-on-read or hybrid delivery can control write amplification for large groups. Choose based on group-size distribution and latency goals.",
      },
    ],
    codeSamples: [],
  },
];

export default systemDesignContent;
