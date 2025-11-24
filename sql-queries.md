# SQL Queries for Chat Component JSON

This document contains SQL queries to transform the `conversation_messages` table into the JSON structure required by the chat component.

## Single Conversation Query

Generates a single conversation with all its messages:

```sql
SELECT 
  JSON_OBJECT(
    'id', cm.doc_id,
    'title', COALESCE(dt.subject, 'Untitled Conversation'),
    'open', TRUE,
    'unread', EXISTS(
      SELECT 1 FROM conversation_messages cm2 
      WHERE cm2.doc_id = cm.doc_id 
        AND cm2.user_id = 0 
        AND cm2.created_datetime > COALESCE(last_read_timestamp, '1970-01-01')
    ),
    'lastActivity', DATE_FORMAT(MAX(cm.created_datetime), '%Y-%m-%d %H:%i'),
    'thread', JSON_ARRAYAGG(
      JSON_OBJECT(
        'type', 'message',
        'role', IF(cm.user_id > 0, 'internal', 'external'),
        'senderId', IF(cm.user_id > 0, CONCAT('user-', cm.user_id), CONCAT('patient-', cm.pat_id)),
        'channel', CASE cm.provenance
          WHEN 'local_user' THEN 'portal'
          WHEN 'internal_service' THEN 'auto'
          WHEN 'federated' THEN 'portal'
          WHEN 'external_client' THEN 'sms'
          ELSE 'portal'
        END,
        'time', DATE_FORMAT(cm.created_datetime, '%Y-%m-%d %H:%i'),
        'text', cm.message,
        'language', cm.language,
        'actorIri', cm.actor_iri,
        'apId', cm.ap_id,
        'visibility', cm.visibility,
        'verified', CASE 
          WHEN cm.actor_scope = 'local' THEN true
          WHEN ms.verify_status = 'valid' THEN true
          ELSE false
        END,
        'isDeleted', cm.deleted_at IS NOT NULL,
        'deletedAt', DATE_FORMAT(cm.deleted_at, '%Y-%m-%d %H:%i')
      )
      ORDER BY cm.created_datetime
    )
  ) as conversation_json
FROM conversation_messages cm
LEFT JOIN message_signatures ms ON ms.convo_id = cm.convo_id
LEFT JOIN documents d ON d.doc_id = cm.doc_id
LEFT JOIN documents_txt dt ON dt.doc_id = cm.doc_id
WHERE cm.doc_id = ? -- Parameter: conversation document ID
  AND cm.deleted_at IS NULL
GROUP BY cm.doc_id;
```

## All Conversations for a Patient/Chart

Generates the complete JSON structure with all conversations for a patient:

```sql
SELECT JSON_OBJECT(
  'conversations', (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', doc_id,
        'title', conversation_title,
        'open', is_open,
        'unread', has_unread,
        'lastActivity', last_activity,
        'thread', thread_messages
      )
    )
    FROM (
      SELECT 
        cm.doc_id,
        COALESCE(dt.subject, 'Untitled Conversation') as conversation_title,
        TRUE as is_open,
        EXISTS(
          SELECT 1 FROM conversation_messages cm_unread
          WHERE cm_unread.doc_id = cm.doc_id
            AND cm_unread.user_id = 0
            AND cm_unread.created_datetime > COALESCE(
              (SELECT last_read FROM user_conversation_reads 
               WHERE user_id = ? AND doc_id = cm.doc_id),
              '1970-01-01'
            )
        ) as has_unread,
        DATE_FORMAT(MAX(cm.created_datetime), '%Y-%m-%d %H:%i') as last_activity,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'type', 'message',
              'role', IF(cm2.user_id > 0, 'internal', 'external'),
              'senderId', IF(cm2.user_id > 0, CONCAT('user-', cm2.user_id), CONCAT('patient-', cm2.pat_id)),
              'channel', CASE cm2.provenance
                WHEN 'local_user' THEN 'portal'
                WHEN 'internal_service' THEN 'auto'
                WHEN 'federated' THEN 'portal'
                WHEN 'external_client' THEN 'sms'
                ELSE 'portal'
              END,
              'time', DATE_FORMAT(cm2.created_datetime, '%Y-%m-%d %H:%i'),
              'text', cm2.message,
              'language', cm2.language,
              'actorIri', cm2.actor_iri,
              'apId', cm2.ap_id,
              'visibility', cm2.visibility,
              'verified', CASE
                WHEN cm2.actor_scope = 'local' THEN true
                WHEN ms2.verify_status = 'valid' THEN true
                ELSE false
              END
            )
            ORDER BY cm2.created_datetime
          )
          FROM conversation_messages cm2
          LEFT JOIN message_signatures ms2 ON ms2.convo_id = cm2.convo_id
          WHERE cm2.doc_id = cm.doc_id
            AND cm2.deleted_at IS NULL
        ) as thread_messages
      FROM conversation_messages cm
      LEFT JOIN documents d ON d.doc_id = cm.doc_id
      WHERE cm.pat_id = ? -- Parameter: patient ID
        AND cm.deleted_at IS NULL
      GROUP BY cm.doc_id
      ORDER BY last_activity DESC
    ) conversations_list
  ),
  'activeConversationId', (
    SELECT doc_id 
    FROM conversation_messages 
    WHERE pat_id = ?
    ORDER BY created_datetime DESC 
    LIMIT 1
  )
) as chat_state;
```

## Insert New Message

Insert a new message from the chat UI:

```sql
INSERT INTO conversation_messages (
  doc_id,
  pat_id,
  user_id,
  message,
  content_html,
  language,
  actor_iri,
  actor_scope,
  provenance,
  visibility,
  created_datetime
) VALUES (
  ?, -- doc_id (conversation ID)
  ?, -- pat_id (patient/chart ID)
  ?, -- user_id (0 for external, >0 for internal)
  ?, -- message text
  ?, -- sanitized HTML (optional)
  'en-US', -- language
  ?, -- actor_iri (generated based on user/patient)
  'local', -- actor_scope
  IF(? > 0, 'local_user', 'external_client'), -- provenance based on user_id
  'direct', -- visibility
  NOW()
);
```

## Simplified Query for Basic Chat (No Federated Features)

For initial implementation without ActivityPub complexity:

```sql
SELECT JSON_OBJECT(
  'conversations', (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', doc_id,
        'title', conversation_title,
        'open', is_open,
        'unread', has_unread,
        'lastActivity', last_activity,
        'thread', thread_messages
      )
    )
    FROM (
      SELECT 
        cm.doc_id,
        COALESCE(dt.subject, 'Untitled Conversation') as conversation_title,
        TRUE as is_open,
        FALSE as has_unread,
        DATE_FORMAT(MAX(cm.created_datetime), '%Y-%m-%d %H:%i') as last_activity,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'type', 'message',
              'role', IF(cm2.user_id > 0, 'internal', 'external'),
              'senderId', IF(cm2.user_id > 0, CONCAT('user-', cm2.user_id), CONCAT('patient-', cm2.pat_id)),
              'channel', CASE 
                WHEN cm2.provenance = 'internal_service' THEN 'auto'
                WHEN cm2.provenance = 'external_client' THEN 'sms'
                ELSE 'portal'
              END,
              'time', DATE_FORMAT(cm2.created_datetime, '%Y-%m-%d %H:%i'),
              'text', cm2.message
            )
            ORDER BY cm2.created_datetime
          )
          FROM conversation_messages cm2
          WHERE cm2.doc_id = cm.doc_id
            AND cm2.deleted_at IS NULL
        ) as thread_messages
      FROM conversation_messages cm
      LEFT JOIN documents d ON d.doc_id = cm.doc_id
      LEFT JOIN documents_txt dt ON dt.doc_id = cm.doc_id
      WHERE cm.pat_id = ? -- Parameter: patient ID
        AND cm.deleted_at IS NULL
      GROUP BY cm.doc_id
      ORDER BY last_activity DESC
    ) conversations_list
  ),
  'activeConversationId', (
    SELECT doc_id 
    FROM conversation_messages 
    WHERE pat_id = ?
    ORDER BY created_datetime DESC 
    LIMIT 1
  )
) as chat_state;
```

## Query for Lab Results / Imaging (Extended Message Types)

If you want to include lab results and imaging as separate message types in the thread:

```sql
-- Lab result as message
INSERT INTO conversation_messages (
  doc_id,
  pat_id,
  user_id,
  attach_doc_id,
  message,
  ap_object_type,
  actor_scope,
  provenance,
  visibility
) VALUES (
  ?, -- conversation doc_id
  ?, -- pat_id
  ?, -- user_id (system user for lab interface)
  ?, -- attach_doc_id (reference to lab document)
  CONCAT('Lab Result: ', lab_title, '\n', lab_summary), -- message text
  'Article', -- ActivityPub object type
  'local',
  'internal_service',
  'direct'
);

-- Query to include lab/imaging in thread
SELECT JSON_OBJECT(
  'type', CASE 
    WHEN cm.ap_object_type = 'Article' AND cm.attach_doc_id IS NOT NULL THEN 
      CASE 
        WHEN d.doc_type = 'LABRESULT' THEN 'lab'
        WHEN d.doc_type = 'IMAGING' THEN 'imaging'
        ELSE 'event'
      END
    ELSE 'message'
  END,
  'role', IF(cm.user_id > 0, 'internal', 'external'),
  'senderId', IF(cm.user_id > 0, CONCAT('user-', cm.user_id), CONCAT('patient-', cm.pat_id)),
  'channel', 'portal',
  'time', DATE_FORMAT(cm.created_datetime, '%Y-%m-%d %H:%i'),
  'title', dt.subject,
  'text', cm.message,
  'summary', SUBSTRING(cm.message, 1, 200),
  'lastComment', (SELECT message FROM conversation_messages 
                  WHERE attach_doc_id = cm.attach_doc_id 
                  ORDER BY created_datetime DESC LIMIT 1)
) as message_json
FROM conversation_messages cm
LEFT JOIN documents d ON d.doc_id = cm.attach_doc_id
LEFT JOIN documents_txt dt ON dt.doc_id = cm.attach_doc_id
WHERE cm.doc_id = ?
ORDER BY cm.created_datetime;
```

## Update Conversation Status

```sql
-- Mark conversation as read
INSERT INTO user_conversation_reads (user_id, doc_id, last_read)
VALUES (?, ?, NOW())
ON DUPLICATE KEY UPDATE last_read = NOW();
```

## Performance Indexes

Ensure these indexes exist for optimal performance:

```sql
-- Already defined in schema, but verify:
CREATE INDEX idx_doc_created ON conversation_messages(doc_id, created_datetime);
CREATE INDEX idx_pat ON conversation_messages(pat_id);
CREATE INDEX idx_scope_prov ON conversation_messages(actor_scope, provenance);
```

## Notes

1. Replace `?` placeholders with actual parameter binding in your application code
2. Conversation titles are stored in `documents_txt.subject` table
3. Document types use uppercase values: 'CONVERS', 'LABRESULT', 'IMAGING'
4. The `documents` table does not have `status` or `title` fields - use `documents_txt` for titles
5. Consider creating a view for frequently accessed conversation lists
6. For large datasets, implement pagination using `LIMIT` and `OFFSET`
7. The simplified query is recommended for MVP, then add federated features incrementally
