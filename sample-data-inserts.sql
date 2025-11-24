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

-- Message 2: Lab result (CBC)
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
  1001, -- attach_doc_id (lab document reference)
  18,
  100, -- system user for lab interface
  'CBC Result: WBC elevated (12.3), mild neutrophilia.\n\nReviewed by Dr. Smith: Consistent with mild infection, recommend follow-up.',
  '<h4>CBC Result</h4><p><strong>Summary:</strong> WBC elevated (12.3), mild neutrophilia.</p><p><strong>Last Comment:</strong> Reviewed by Dr. Smith: Consistent with mild infection, recommend follow-up.</p>',
  'en-US',
  'Article',
  'https://example.org/actors/lab-system',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 08:30:00'
);

-- Message 3: Physician response about bloodwork
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
  "Jane, your bloodwork shows a mild infection. I'd like to order an abdominal x-ray to check further.",
  '<p>Jane, your bloodwork shows a mild infection. I''d like to order an abdominal x-ray to check further.</p>',
  'en-US',
  'https://example.org/actors/user-104',
  'local',
  'local_user',
  'direct',
  '2025-10-29 08:35:00'
);

-- Message 4: Imaging result (Abdominal X-ray)
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
  2001, -- attach_doc_id (imaging document reference)
  18,
  100, -- system user for imaging interface
  'Abdominal X-ray\n\nInterpretation: No acute findings. Mild constipation noted.\n\nRadiologist: No evidence of obstruction or free air.',
  '<h4>Abdominal X-ray</h4><p><strong>Interpretation:</strong> No acute findings. Mild constipation noted.</p><p><strong>Radiologist:</strong> No evidence of obstruction or free air.</p>',
  'en-US',
  'Article',
  'https://example.org/actors/imaging-system',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 09:10:00'
);

-- Message 5: Patient follow-up question about diet
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
  "Thank you for letting me know. Should I change my diet or take anything for the constipation?",
  '<p>Thank you for letting me know. Should I change my diet or take anything for the constipation?</p>',
  'en-US',
  'https://example.org/actors/patient-18',
  'local',
  'local_user',
  'direct',
  '2025-10-29 09:22:00'
);

-- Message 6: Physician's automated response with dietary advice
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
  "Increase your water and fiber intake. If no improvement in 2 days, let me know.",
  '<p>Increase your water and fiber intake. If no improvement in 2 days, let me know.</p>',
  'en-US',
  'https://example.org/actors/user-104',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 09:30:00'
);

-- Message 7: Lab result (Urinalysis)
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
  7,
  735,
  1002, -- attach_doc_id (lab document reference)
  18,
  100, -- system user for lab interface
  'Urinalysis: Trace leukocytes, otherwise unremarkable.\n\nReviewed by Dr. Smith: No evidence of UTI.',
  '<h4>Urinalysis</h4><p><strong>Summary:</strong> Trace leukocytes, otherwise unremarkable.</p><p><strong>Last Comment:</strong> Reviewed by Dr. Smith: No evidence of UTI.</p>',
  'en-US',
  'Article',
  'https://example.org/actors/lab-system',
  'local',
  'internal_service',
  'direct',
  '2025-10-29 10:05:00'
);

-- ========================================
-- 3. Optional: Create supporting lab/imaging documents
-- ========================================

-- Lab document for CBC
INSERT INTO documents (
  doc_id,
  doc_type,
  pat_id,
  user_id,
  origin_date,
  service_date
) VALUES (
  1001,
  'LABRESULT', -- doc_type (10 char max)
  18,
  100, -- system user
  '2025-10-29 08:30:00',
  '2025-10-29 08:30:00'
);

INSERT INTO documents_txt (
  doc_id,
  subject
) VALUES (
  1001,
  'CBC Result'
);

-- Imaging document for Abdominal X-ray
INSERT INTO documents (
  doc_id,
  doc_type,
  pat_id,
  user_id,
  origin_date,
  service_date
) VALUES (
  2001,
  'IMAGING', -- doc_type (10 char max)
  18,
  100, -- system user
  '2025-10-29 09:10:00',
  '2025-10-29 09:10:00'
);

INSERT INTO documents_txt (
  doc_id,
  subject
) VALUES (
  2001,
  'Abdominal X-ray'
);

-- Lab document for Urinalysis
INSERT INTO documents (
  doc_id,
  doc_type,
  pat_id,
  user_id,
  origin_date,
  service_date
) VALUES (
  1002,
  'LABRESULT', -- doc_type (10 char max)
  18,
  100, -- system user
  '2025-10-29 10:05:00',
  '2025-10-29 10:05:00'
);

INSERT INTO documents_txt (
  doc_id,
  subject
) VALUES (
  1002,
  'Urinalysis'
);

-- ========================================
-- 4. Verification Query
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
        WHEN cm.ap_object_type = 'Article' AND cm.attach_doc_id IS NOT NULL THEN 
          CASE 
            WHEN att_d.doc_type = 'LABRESULT' THEN 'lab'
            WHEN att_d.doc_type = 'IMAGING' THEN 'imaging'
            ELSE 'event'
          END
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
WHERE cm.doc_id = 735
  AND cm.deleted_at IS NULL
GROUP BY cm.doc_id;
