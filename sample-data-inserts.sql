-- Sample Data Insert Statements for General Question Chat
-- This creates a conversation with messages matching the demo data

-- ========================================
-- 1. Create the conversation document
-- ========================================
INSERT INTO documents (
  doc_id,
  doc_type,
  pat_id,
  user_id,
  origin_date,
  service_date
) VALUES (
  735, -- doc_id
  'CONVERS', -- doc_type (10 char max)
  18, -- patient ID (example)
  104, -- user_id (physician)
  '2025-10-29 08:12:00', -- origin_date (created_datetime)
  '2025-10-29 08:12:00' -- service_date
);

-- Store the conversation title in documents_txt
INSERT INTO documents_txt (
  doc_id,
  subject
) VALUES (
  735,
  'General Question'
);

-- ========================================
-- 2. Insert conversation messages
-- ========================================

-- Message 1: Patient's initial SMS about pain
INSERT INTO conversation_messages (
  convo_id,
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
  1,
  735, -- doc_id from above
  18, -- patient ID
  0, -- external user (patient)
  "Good morning, I'm still having pain in my right side.",
  '<p>Good morning, I''m still having pain in my right side.</p>',
  'en-US',
  'https://example.org/actors/patient-18',
  'local',
  'external_client',
  'direct',
  '2025-10-29 08:12:00'
);

-- Message 2: Audiogram result
INSERT INTO conversation_messages (
  convo_id,
  doc_id,
  attach_doc_id,
  pat_id,
  user_id,
  message,
  content_html,
  language,
  ap_object_type,
  actor_iri,
  actor_scope,
  provenance,
  visibility,
  created_datetime
) VALUES (
  2,
  735,
  572, -- attach_doc_id (audiogram document reference)
  18,
  100, -- system user for audiology interface
  'Audiogram: Mild high-frequency hearing loss bilaterally.\n\nReviewed by Dr. Smith: Recommend hearing protection and follow-up in 6 months.',
  '<h4>Audiogram</h4><p><strong>Summary:</strong> Mild high-frequency hearing loss bilaterally.</p><p><strong>Last Comment:</strong> Reviewed by Dr. Smith: Recommend hearing protection and follow-up in 6 months.</p>',
  'en-US',
  'Article',
  'https://example.org/actors/audiology-system',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 08:30:00'
);

-- Message 3: Physician response about hearing test
INSERT INTO conversation_messages (
  convo_id,
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
  3,
  735,
  18,
  104, -- physician user ID
  "Jane, your hearing test shows some mild loss. Let's also check your heart with an echocardiogram to ensure everything is working well.",
  '<p>Jane, your hearing test shows some mild loss. Let''s also check your heart with an echocardiogram to ensure everything is working well.</p>',
  'en-US',
  'https://example.org/actors/user-104',
  'local',
  'local_user',
  'direct',
  '2025-10-29 08:35:00'
);

-- Message 4: Echocardiogram result
INSERT INTO conversation_messages (
  convo_id,
  doc_id,
  attach_doc_id,
  pat_id,
  user_id,
  message,
  content_html,
  language,
  ap_object_type,
  actor_iri,
  actor_scope,
  provenance,
  visibility,
  created_datetime
) VALUES (
  4,
  735,
  451, -- attach_doc_id (echocardiogram document reference)
  18,
  100, -- system user for cardiology interface
  'Echocardiogram\n\nInterpretation: Normal left ventricular function (EF 60%). No valvular abnormalities.\n\nCardiologist: Overall heart function is normal.',
  '<h4>Echocardiogram</h4><p><strong>Interpretation:</strong> Normal left ventricular function (EF 60%). No valvular abnormalities.</p><p><strong>Cardiologist:</strong> Overall heart function is normal.</p>',
  'en-US',
  'Article',
  'https://example.org/actors/cardiology-system',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 09:10:00'
);

-- Message 5: Patient follow-up question
INSERT INTO conversation_messages (
  convo_id,
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
  5,
  735,
  18,
  0, -- external user (patient)
  "Thank you for letting me know. That's a relief! Should I do anything about the hearing loss?",
  '<p>Thank you for letting me know. That''s a relief! Should I do anything about the hearing loss?</p>',
  'en-US',
  'https://example.org/actors/patient-18',
  'local',
  'local_user',
  'direct',
  '2025-10-29 09:22:00'
);

-- Message 6: Physician's automated response with hearing advice
INSERT INTO conversation_messages (
  convo_id,
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
  6,
  735,
  18,
  104, -- physician user ID
  "Use hearing protection in loud environments. We'll recheck in 6 months to monitor any changes.",
  '<p>Use hearing protection in loud environments. We''ll recheck in 6 months to monitor any changes.</p>',
  'en-US',
  'https://example.org/actors/user-104',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 09:30:00'
);

-- ========================================
-- 4. Second Conversation: "Work related illness" (doc_id 736)
-- ========================================

-- Create the conversation document
INSERT INTO documents (
  doc_id,
  doc_type,
  pat_id,
  user_id,
  origin_date,
  service_date
) VALUES (
  736, -- doc_id
  'CONVERS', -- doc_type (10 char max)
  18, -- patient ID (example)
  104, -- user_id (physician)
  '2025-10-28 14:10:00', -- origin_date (created_datetime)
  '2025-10-28 14:10:00' -- service_date
);

-- Store the conversation title in documents_txt
INSERT INTO documents_txt (
  doc_id,
  subject
) VALUES (
  736,
  'Work related illness'
);

-- Message 1: Patient's initial message about fume exposure
INSERT INTO conversation_messages (
  convo_id,
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
  8,
  736, -- doc_id from above
  18, -- patient ID
  0, -- external user (patient)
  "I was exposed to fumes at work and now I'm coughing.",
  '<p>I was exposed to fumes at work and now I''m coughing.</p>',
  'en-US',
  'https://example.org/actors/patient-18',
  'local',
  'local_user',
  'direct',
  '2025-10-28 14:10:00'
);

-- Message 2: Physician response via SMS
INSERT INTO conversation_messages (
  convo_id,
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
  9,
  736,
  18,
  104, -- physician user ID
  "Sounds like you may have some bronchitis. Rest, fluids, and use your inhaler PRN. Follow up if symptoms worsen.",
  '<p>Sounds like you may have some bronchitis. Rest, fluids, and use your inhaler PRN. Follow up if symptoms worsen.</p>',
  'en-US',
  'https://example.org/actors/user-104',
  'local',
  'external_client',
  'direct',
  '2025-10-28 14:30:00'
);

-- ========================================
-- 5. Verification Query
-- ========================================
-- Run this to verify the data was inserted correctly and matches the expected JSON structure

SELECT JSON_OBJECT(
  'id', cm.doc_id,
  'title', dt.subject,
  'open', TRUE,
  'lastActivity', DATE_FORMAT(MAX(cm.created_datetime), '%Y-%m-%d %H:%i'),
  'thread', JSON_ARRAYAGG(
    JSON_OBJECT(
      'type', CASE 
        WHEN cm.ap_object_type = 'Article' AND cm.attach_doc_id IS NOT NULL THEN 'event'
        ELSE 'message'
      END,
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
      'title', att_dt.subject
    )
    ORDER BY cm.created_datetime
  )
) as conversation_json
FROM conversation_messages cm
LEFT JOIN documents d ON d.doc_id = cm.doc_id
LEFT JOIN documents_txt dt ON dt.doc_id = cm.doc_id
LEFT JOIN documents att_d ON att_d.doc_id = cm.attach_doc_id
LEFT JOIN documents_txt att_dt ON att_dt.doc_id = cm.attach_doc_id
WHERE cm.doc_id IN (735, 736)
  AND cm.deleted_at IS NULL
GROUP BY cm.doc_id;
