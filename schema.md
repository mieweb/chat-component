# conversations.md

## Overview

The **Conversation Messages System** provides a unified way to store, display, and exchange conversation threads.  
It supports:
- Local user conversations (e.g., between users or within a patient chart)
- Federated interoperability via [ActivityPub](https://www.w3.org/TR/activitypub/)
- Optional digital signatures for verifying external messages

The goal is to allow **ActivityPub-compatible messaging** while maintaining secure internal operations and efficient HTML rendering.

---

## 1. Table Structure

### `conversation_messages`

```sql
CREATE TABLE `conversation_messages` (
  `convo_id`           INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Local message id (PK)',
  `doc_id`             INT UNSIGNED NOT NULL COMMENT 'Conversation/document id',
  `storage_id`         INT UNSIGNED NULL COMMENT 'Inline attachment image/file storage ref',
  `attach_doc_id`      INT UNSIGNED NULL COMMENT 'Internal document referenced in the thread',
  `pat_id`             INT UNSIGNED NULL COMMENT 'Chart or patient container id for the actor (if applicable) user_id trumps pat_id',
  `user_id`            INT NOT NULL COMMENT 'Local user id (if applicable)',

  -- Content
  `message`            TEXT NOT NULL COMMENT 'Primary body (plain/markdown)',
  `content_html`       MEDIUMTEXT NULL COMMENT 'Sanitized HTML rendering (optional)',
  `content_markdown`   MEDIUMTEXT NULL COMMENT 'Original markdown/plain text (optional)',
  `language`           VARCHAR(35) NULL COMMENT 'BCP47 language tag, e.g., en, en-US',

  -- ActivityPub / ActivityStreams identity & threading
  `ap_id`              VARCHAR(512) NULL COMMENT 'ActivityPub activity/object IRI (unique if present)',
  `ap_type`            VARCHAR(64)  NULL COMMENT 'Activity type: Create, Announce, Like, etc.',
  `ap_object_type`     VARCHAR(64)  NULL DEFAULT 'Note' COMMENT 'AS2 object type: Note, Article, Image...',
  `actor_iri`          VARCHAR(512) NULL COMMENT 'IRI of the Actor (Person/Application/etc.)',
  `actor_scope`        ENUM('local','remote') NOT NULL DEFAULT 'local' COMMENT 'Local actor or federated remote',
  `provenance`         ENUM('local_user','internal_service','federated','external_client')
                       NOT NULL DEFAULT 'local_user',

  `parent_message_id`  INT UNSIGNED NULL COMMENT 'Local parent message for threading (optional)',
  `in_reply_to_iri`    VARCHAR(512) NULL COMMENT 'IRI of the object this replies to',
  `context_iri`        VARCHAR(512) NULL COMMENT 'AS2 context/conversation IRI',

  -- Audience / visibility
  `visibility`         ENUM('public','unlisted','followers','direct')
                       NOT NULL DEFAULT 'public' COMMENT 'High-level addressing policy',
  `audience_to`        JSON NULL COMMENT 'ActivityStreams "to" IRIs',
  `audience_cc`        JSON NULL COMMENT 'ActivityStreams "cc" IRIs',
  `audience_bto`       JSON NULL COMMENT 'ActivityStreams "bto" IRIs',
  `audience_bcc`       JSON NULL COMMENT 'ActivityStreams "bcc" IRIs',

  -- Lifecycle
  `created_datetime`   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime`   TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at`         TIMESTAMP NULL DEFAULT NULL COMMENT 'Tombstone timestamp if deleted',

  PRIMARY KEY (`convo_id`),

  UNIQUE KEY `ux_ap_id`           (`ap_id`),
  KEY `idx_doc_created`           (`doc_id`, `created_datetime`),
  KEY `idx_parent`                (`parent_message_id`),
  KEY `idx_inreply_iri`           (`in_reply_to_iri`(191)),
  KEY `idx_actor_iri`             (`actor_iri`(191)),
  KEY `idx_context_iri`           (`context_iri`(191)),
  KEY `idx_storage`               (`storage_id`),
  KEY `idx_attach_doc`            (`attach_doc_id`),
  KEY `idx_visibility_created`    (`visibility`, `created_datetime`),
  KEY `idx_pat`                   (`pat_id`),
  KEY `idx_scope_prov`            (`actor_scope`, `provenance`),

  CONSTRAINT `fk_conversation_messages_parent`
    FOREIGN KEY (`parent_message_id`) REFERENCES `conversation_messages` (`convo_id`)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

### `message_signatures`

**NOTE: Not needed for version 1** but whould like to commit for interopablity

Stores verification results for inbound or outbound signatures.

```sql
CREATE TABLE `message_signatures` (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  convo_id          INT UNSIGNED NOT NULL,
  http_request_id   BINARY(16) NULL COMMENT 'Server-generated UUID for request trace',
  key_id            VARCHAR(512) NULL COMMENT 'Signature keyId (URL to actor key)',
  alg               VARCHAR(64)  NULL COMMENT 'Algorithm, e.g., rsa-v1_5-sha256',
  signature_input   TEXT         NULL,
  signature_value   TEXT         NULL,
  signed_headers    JSON         NULL,
  digest_header     VARCHAR(255) NULL,
  verified_at       TIMESTAMP    NULL,
  verify_status     ENUM('valid','invalid','indeterminate') NOT NULL DEFAULT 'indeterminate',
  verify_error      VARCHAR(255) NULL,

  object_proof_type VARCHAR(64)  NULL COMMENT 'e.g., JWS, DataIntegrity/Ed25519',
  object_proof      MEDIUMTEXT   NULL COMMENT 'Detached proof block',
  object_verified_at TIMESTAMP   NULL,
  object_verify_status ENUM('valid','invalid','indeterminate') NULL,

  PRIMARY KEY (id),
  KEY idx_ms_convo (convo_id),
  KEY idx_ms_keyid (key_id(191)),
  CONSTRAINT fk_ms_convo FOREIGN KEY (convo_id)
    REFERENCES conversation_messages(convo_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

### `ap_actors`

Caches Actor documents and keys for verification. **FUTURE**

```sql
CREATE TABLE message_actors_cache (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  actor_iri        VARCHAR(512) NOT NULL,
  inbox_iri        VARCHAR(512) NULL,
  shared_inbox_iri VARCHAR(512) NULL,
  preferred_username VARCHAR(128) NULL,
  domain           VARCHAR(255) NULL,
  public_key_id    VARCHAR(512) NULL,
  public_key_pem   MEDIUMTEXT NULL,
  fetched_at       TIMESTAMP NULL,
  valid_until      TIMESTAMP NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ux_actor_iri (actor_iri),
  KEY idx_actor_domain (domain)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 2. Trust Model

| Origin                      | Signature Requirement   | Authentication          | Notes                           |
| --------------------------- | ----------------------- | ----------------------- | ------------------------------- |
| Local user → your server    | ❌ Optional              | Session/OIDC/JWT        | Within your trusted boundary    |
| Internal service → service  | ❌ Optional              | mTLS / internal JWT     | System-to-system                |
| External server → inbox     | ✅ Required              | HTTP Message Signatures | Verified via Actor’s public key |
| External client (no server) | ✅ Required (if allowed) | Public key signature    | Usually discouraged             |
| Your server → other server  | ✅ Required              | Your Actor’s key        | Outbound federation             |

> Local messages don’t need cryptographic signatures.
> Remote (federated) messages **must** be signed and verified.

---

## 3. Example Scenarios

### Example 1: Local User Message

| Field              | Example                                      |
| ------------------ | -------------------------------------------- |
| `actor_scope`      | `local`                                      |
| `provenance`       | `local_user`                                 |
| `actor_iri`        | `https://example.org/actors/chart123#user42` |
| `pat_id`           | `123`                                        |
| `message`          | “Vitals updated; patient is stable.”         |
| `ap_id`            | *(null)*                                     |
| `visibility`       | `direct`                                     |
| `created_datetime` | auto                                         |

✅ No signature required.

---

### Example 2: Federated Message Received

| Field             | Example                                       |
| ----------------- | --------------------------------------------- |
| `actor_scope`     | `remote`                                      |
| `provenance`      | `federated`                                   |
| `actor_iri`       | `https://remote.net/users/drsmith`            |
| `ap_id`           | `https://remote.net/notes/aa1c9b...`          |
| `message`         | “Patient transferred for imaging.”            |
| `in_reply_to_iri` | `https://example.org/notes/abc123`            |
| `context_iri`     | `https://example.org/charts/123/conversation` |

The incoming HTTP request is signed (RFC 9421).
Verification details go into `message_signatures` with `verify_status='valid'`.

---

### Example 3: Outbound Message to External Server

When your server posts to another inbox:

1. Fetch the target Actor’s inbox URL.
2. Sign the HTTP request with your Actor’s private key:

   * Include `Date`, `(request-target)`, `Host`, `Digest`, and `Content-Digest`.
3. Send JSON body (ActivityPub Create + Note).

Example signature header:

```
Signature-Input: sig1=("content-digest" "date" "host"); keyId="https://example.org/actors/chart123#main-key"; alg="rsa-v1_5-sha256"
Signature: sig1=:BASE64_SIGNATURE_VALUE:
```

---

## 4. Developer Integration Notes

### HTML Rendering

Your future component will:

* Query messages by `doc_id` or `pat_id`.
* Sort by `created_datetime`.
* Render nested replies using `parent_message_id` or `in_reply_to_iri`.
* Show actor identity (local or remote).
* Optionally display verification badges:

  * ✅ Verified (remote, signature valid)
  * ⚠️ Unverified (missing or invalid signature)
  * 🔒 Local (trusted internal post)

### API Integration

* `POST /inbox` — accept signed federated messages
* `POST /outbox` — send signed outbound messages
* `GET /chart/{pat_id}/conversation` — return JSON for the conversation thread
* JSON response should include:

  * message metadata (actor, timestamps, provenance)
  * verification status
  * related documents (via `attach_doc_id` or `storage_id`)

---

## 5. Security Considerations

* `ap_id` is **public** and **not secret** — do not use as a password or shared secret.
* Verify all inbound signatures from outside domains.
* Enforce freshness (`Date` header ±5 min skew).
* Maintain a cache of remote Actor documents in `ap_actors`.
* Rate limit and spam-filter unknown external senders.
* Log `verify_status` and `verify_error` for auditability.
* For legal/clinical integrity, optionally implement message-level digital signatures (JWS/Data Integrity).

---

## 6. Future Work

* Add JSON-LD serialization helpers to emit ActivityStreams 2.0 format.
* Implement `/inbox` and `/outbox` HTTP handlers.
* Build `ConversationThread` React component rendering messages with:

  * Reply nesting
  * Verification badges
  * Attachment previews
  * Document reference linking (`attach_doc_id`)

## 7. Notes

Chat Model from conversation_messages
```
{
	...
	role: {{#if user_id > 0}}'internal'{{#else}}'external'{{/if}},
	senderId: {{#if user_id > 0}}{{user_id}}{{#else}}{{pat_id}}{{/if}},
	...
}
```