import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('d16f1066-96e7-43b7-8bb3-55787fbb5b7f', '1Haleigh_Brakus67@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_L2c3d4e5f6g7h8i9', '2024-01-24T15:43:31.781Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('f0663769-efb3-473a-83ff-839a3615ece4', '8Brenden_Schowalter@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_J0a1b2c3d4e5f6g7', '2025-02-20T23:02:01.192Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('ff00e70c-88e8-429b-858f-3ead2e46955e', '15Gennaro_Kling10@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_N4e5f6g7h8i9j0k1', '2023-09-27T20:16:55.714Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('f1520e02-4313-48c2-8c29-0e1224fa28d7', '22Mandy97@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_N4e5f6g7h8i9j0k1', '2024-04-23T21:51:11.922Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('b4bc138a-6993-4f27-8246-a829726e4432', '36Cordelia63@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=38', 'cus_L2c3d4e5f6g7h8i9', '2024-12-16T06:32:11.994Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('1fbc3312-783f-4faa-931e-6470bec138c0', '43Pattie_Herman93@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_J0a1b2c3d4e5f6g7', '2024-05-03T12:13:14.124Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('3b514ac0-f74b-4eb1-8eb9-321c379ac9d2', '50Aubree20@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_J0a1b2c3d4e5f6g7', '2024-02-16T13:08:53.279Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('2a6a6b3e-a14d-473d-8afa-09f61e674660', '57Helga_Kiehn97@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_K1b2c3d4e5f6g7h8', '2023-07-19T05:37:55.065Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "image", "stripeCustomerId", "emailVerified", "password") VALUES ('2b46e86b-c3e9-4981-8f4b-7bc56097e95e', '64Maryse_OHara26@gmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=66', 'cus_M3d4e5f6g7h8i9j0', '2024-05-13T07:07:57.840Z', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('baf8fb1f-c91b-492a-a208-5a476e337270', 'Website Redesign', 'Creating a new mobile application for our services.', '2025-02-12T09:04:53.408Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('aa0a5ba7-9c81-431a-b3ca-4b2fa0c3c828', 'Marketing Campaign', 'Analyzing customer feedback to improve service quality.', '2025-01-03T02:10:17.428Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('63438927-eed5-4a99-a96e-81a4f1cc46b5', 'Website Redesign', 'Executing a comprehensive marketing strategy for Q4.', '2024-05-28T20:40:39.643Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('c3a3651f-509e-4a27-978f-95492144dd26', 'Product Launch', 'Launching the new product line in the upcoming quarter.', '2025-03-03T05:44:06.917Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('b04d1c9d-d39c-4d13-bce3-4d113d2fe7ce', 'Product Launch', 'Executing a comprehensive marketing strategy for Q4.', '2023-11-07T09:28:28.474Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('2279d56e-c6aa-4ecd-89b4-0cb918275a1f', 'Marketing Campaign', 'Executing a comprehensive marketing strategy for Q4.', '2023-07-27T13:51:21.997Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('8b2ff5e4-e17e-450b-bac1-174c5949883b', 'Marketing Campaign', 'Executing a comprehensive marketing strategy for Q4.', '2024-11-26T05:27:40.650Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('f1b07390-d9d3-4aad-adbd-90d82305d2a4', 'Product Launch', 'Creating a new mobile application for our services.', '2023-12-10T01:20:46.135Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('45366c7f-8891-4024-8d49-4da6cb941ea6', 'Website Redesign', 'Executing a comprehensive marketing strategy for Q4.', '2024-10-29T18:13:30.451Z');
INSERT INTO "Project" ("id", "name", "description", "deadline") VALUES ('571a5885-3247-4011-9134-c2b8cf917628', 'Website Redesign', 'Revamping the company website to improve user experience.', '2025-02-19T07:12:14.494Z');

INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('5e4f2e62-b68e-42e1-a5c2-5dec2d6c7902', 'Create marketing plan', 'Initial design for the homepage layout', '2023-11-07T17:26:29.493Z', 'On Hold', 'f1b07390-d9d3-4aad-adbd-90d82305d2a4', '2b46e86b-c3e9-4981-8f4b-7bc56097e95e');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('6573ce0d-48db-4f8e-9f2f-7a96e845abd2', 'Create marketing plan', 'Draft the proposal for the new project', '2025-05-10T12:54:57.466Z', 'In Progress', '8b2ff5e4-e17e-450b-bac1-174c5949883b', 'f1520e02-4313-48c2-8c29-0e1224fa28d7');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('d7c3f6d7-5822-43a3-92c8-5308810d0a8e', 'Develop login feature', 'Draft the proposal for the new project', '2023-08-28T12:15:04.471Z', 'To Do', '571a5885-3247-4011-9134-c2b8cf917628', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('ba019b06-aade-4959-9724-1793296a612f', 'Write project proposal', 'Implement the login functionality', '2024-07-10T02:39:29.939Z', 'In Progress', '45366c7f-8891-4024-8d49-4da6cb941ea6', '2a6a6b3e-a14d-473d-8afa-09f61e674660');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('2ad6459b-d91d-4ba7-9898-73fbede468f6', 'Develop login feature', 'Ensure the payment gateway works correctly', '2024-07-31T19:49:59.301Z', 'In Progress', '63438927-eed5-4a99-a96e-81a4f1cc46b5', '3b514ac0-f74b-4eb1-8eb9-321c379ac9d2');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('7ec848dc-0b07-43ad-a115-7a59cc451b24', 'Create marketing plan', 'Ensure the payment gateway works correctly', '2025-02-24T05:58:30.122Z', 'Completed', '63438927-eed5-4a99-a96e-81a4f1cc46b5', 'd16f1066-96e7-43b7-8bb3-55787fbb5b7f');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('49a2e781-48e8-4605-bb26-d9f256495d60', 'Test payment gateway', 'Initial design for the homepage layout', '2025-02-27T02:20:02.066Z', 'To Do', 'b04d1c9d-d39c-4d13-bce3-4d113d2fe7ce', '2a6a6b3e-a14d-473d-8afa-09f61e674660');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('228c917c-6acf-47fe-bd2a-7c17248ce61b', 'Design homepage', 'Implement the login functionality', '2023-07-19T20:28:18.913Z', 'On Hold', '63438927-eed5-4a99-a96e-81a4f1cc46b5', '1fbc3312-783f-4faa-931e-6470bec138c0');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('9a1ba4ce-a3c2-4025-9337-98463110cb47', 'Design homepage', 'Ensure the payment gateway works correctly', '2023-07-29T20:15:52.728Z', 'Completed', '45366c7f-8891-4024-8d49-4da6cb941ea6', '2a6a6b3e-a14d-473d-8afa-09f61e674660');
INSERT INTO "Task" ("id", "name", "description", "deadline", "status", "projectId", "assignedUserId") VALUES ('6ed7bfe4-d1f1-41d6-b078-e56f1992d90a', 'Design homepage', 'Implement the login functionality', '2023-07-30T07:50:14.619Z', 'In Progress', 'baf8fb1f-c91b-492a-a208-5a476e337270', 'ff00e70c-88e8-429b-858f-3ead2e46955e');

INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('a6b019c0-6342-4799-a446-09ee3b1b15c8', 'Can we schedule a meeting to discuss this', '6ed7bfe4-d1f1-41d6-b078-e56f1992d90a', '1fbc3312-783f-4faa-931e-6470bec138c0');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('48c77010-f6a9-4d30-b1bb-0383ffe8ff64', 'Can we schedule a meeting to discuss this', 'd7c3f6d7-5822-43a3-92c8-5308810d0a8e', '2b46e86b-c3e9-4981-8f4b-7bc56097e95e');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('b58d5926-6e5a-402f-a64e-caace30cc062', 'Please review the attached document.', '49a2e781-48e8-4605-bb26-d9f256495d60', '2b46e86b-c3e9-4981-8f4b-7bc56097e95e');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('aa2c6acf-5619-469a-be26-9615de43d88d', 'Lets prioritize this task for next week.', '9a1ba4ce-a3c2-4025-9337-98463110cb47', 'b4bc138a-6993-4f27-8246-a829726e4432');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('37e5595b-0964-47e3-941a-59b33d1942b6', 'This task needs to be completed by EOD.', '2ad6459b-d91d-4ba7-9898-73fbede468f6', 'f0663769-efb3-473a-83ff-839a3615ece4');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('ca88ac6c-ffef-437d-a979-0be676838d74', 'Please review the attached document.', '6ed7bfe4-d1f1-41d6-b078-e56f1992d90a', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('0238e8cb-d070-43d3-ada5-8e5496d48483', 'Can we schedule a meeting to discuss this', 'ba019b06-aade-4959-9724-1793296a612f', '2b46e86b-c3e9-4981-8f4b-7bc56097e95e');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('55067e84-8c57-4954-a5c2-f1b0ac481789', 'Great job on the presentation', '9a1ba4ce-a3c2-4025-9337-98463110cb47', 'd16f1066-96e7-43b7-8bb3-55787fbb5b7f');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('1a137b15-bb1a-4029-82b3-fef19f73e2c1', 'Lets prioritize this task for next week.', 'ba019b06-aade-4959-9724-1793296a612f', '3b514ac0-f74b-4eb1-8eb9-321c379ac9d2');
INSERT INTO "Comment" ("id", "content", "taskId", "userId") VALUES ('5872b065-b1d2-4b9a-b551-c67c4702391b', 'This task needs to be completed by EOD.', '6573ce0d-48db-4f8e-9f2f-7a96e845abd2', '2b46e86b-c3e9-4981-8f4b-7bc56097e95e');

INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('47757449-df1e-4044-8e1b-f12fda054e03', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=181', '6ed7bfe4-d1f1-41d6-b078-e56f1992d90a');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('b5e38d1a-6c86-47e1-b2d0-1cb3c4a07dc8', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=183', 'd7c3f6d7-5822-43a3-92c8-5308810d0a8e');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('db12a856-02a6-4f92-bce4-75d34f3237b1', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=185', '5e4f2e62-b68e-42e1-a5c2-5dec2d6c7902');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('786eac76-1a3d-4cad-b4b1-d2aa4493db7f', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=187', 'ba019b06-aade-4959-9724-1793296a612f');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('8ddbb9b9-807e-4123-aff1-55b8a7b3a31e', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=189', '5e4f2e62-b68e-42e1-a5c2-5dec2d6c7902');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('d8352197-1610-4627-9862-1d0fd222ea1e', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=191', '9a1ba4ce-a3c2-4025-9337-98463110cb47');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('a4dc9ff4-edf9-4d85-8e1a-b634e86eb174', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=193', '2ad6459b-d91d-4ba7-9898-73fbede468f6');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('dd7174c4-8969-433d-b400-71a6ece1d4e1', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=195', '6ed7bfe4-d1f1-41d6-b078-e56f1992d90a');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('48d15727-6341-4165-8e3e-2a8a077392fa', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=197', '228c917c-6acf-47fe-bd2a-7c17248ce61b');
INSERT INTO "File" ("id", "fileUrl", "taskId") VALUES ('e804c8bb-bbfb-4d8d-9c86-d87739edcea9', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=199', '2ad6459b-d91d-4ba7-9898-73fbede468f6');

INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('d97b6d79-ebfa-42f5-9e36-0c2e3503db2e', '8b2ff5e4-e17e-450b-bac1-174c5949883b', 'f1520e02-4313-48c2-8c29-0e1224fa28d7');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('b88b944f-3724-4566-97cc-d43239fce2ef', 'f1b07390-d9d3-4aad-adbd-90d82305d2a4', 'f0663769-efb3-473a-83ff-839a3615ece4');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('3b1659d6-8188-49a1-a74e-a4dcdf85768a', 'f1b07390-d9d3-4aad-adbd-90d82305d2a4', '2b46e86b-c3e9-4981-8f4b-7bc56097e95e');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('363ac31a-a28c-4c2b-b240-60a3389e8a5c', '2279d56e-c6aa-4ecd-89b4-0cb918275a1f', 'b4bc138a-6993-4f27-8246-a829726e4432');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('9e7c0792-8d33-43be-bddb-5a1267effffb', 'f1b07390-d9d3-4aad-adbd-90d82305d2a4', 'd16f1066-96e7-43b7-8bb3-55787fbb5b7f');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('cc310829-9142-4d67-b25e-003ad24041ba', 'aa0a5ba7-9c81-431a-b3ca-4b2fa0c3c828', 'f0663769-efb3-473a-83ff-839a3615ece4');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('f104d0b7-9ce0-4220-8fcb-c81e6a842061', '63438927-eed5-4a99-a96e-81a4f1cc46b5', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('c2e6bacf-1913-4a2d-8096-bc966e2df47b', 'c3a3651f-509e-4a27-978f-95492144dd26', '1fbc3312-783f-4faa-931e-6470bec138c0');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('ca943c68-536b-4bf0-9b42-2590766c077e', '45366c7f-8891-4024-8d49-4da6cb941ea6', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "TeamMember" ("id", "projectId", "userId") VALUES ('28e7477d-ef0d-49d8-b207-5373a838a1c5', 'b04d1c9d-d39c-4d13-bce3-4d113d2fe7ce', 'ff00e70c-88e8-429b-858f-3ead2e46955e');

INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('487aaf97-7d73-42e9-b722-5ee49956c0cc', 'Your task Design Mockups is due tomorrow.', true, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('bed14b82-2485-4425-9942-f6f6c1b18b22', 'Reminder Team meeting scheduled for 3 PM today.', false, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('6628d321-a46d-4955-afa4-bc243e664be0', 'Your task Design Mockups is due tomorrow.', false, 'ff00e70c-88e8-429b-858f-3ead2e46955e');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('6a2d8d40-6148-4b30-b216-1b3653b6eece', 'John commented on your task Update Documentation.', true, 'f1520e02-4313-48c2-8c29-0e1224fa28d7');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('05470639-c310-4297-b798-da3f1477fdf2', 'Your task Design Mockups is due tomorrow.', false, 'd16f1066-96e7-43b7-8bb3-55787fbb5b7f');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('4edad96e-df3b-4329-bf8e-07ad3cfc1e6a', 'John commented on your task Update Documentation.', false, '3b514ac0-f74b-4eb1-8eb9-321c379ac9d2');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('baa2f799-80f1-46a4-a1b8-a0f300d09aaa', 'The project Website Redesign has been marked as complete.', false, 'ff00e70c-88e8-429b-858f-3ead2e46955e');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('7b172deb-60df-48de-a940-1c1a7005a6de', 'The project Website Redesign has been marked as complete.', true, 'f0663769-efb3-473a-83ff-839a3615ece4');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('08d5c4a1-dfb9-45bd-912f-6b1d10491ca3', 'The project Website Redesign has been marked as complete.', true, 'f1520e02-4313-48c2-8c29-0e1224fa28d7');
INSERT INTO "Notification" ("id", "content", "readStatus", "userId") VALUES ('76254725-5fb6-465d-b22f-bdfb86718d57', 'You have been assigned a new task Prepare Presentation.', false, 'f1520e02-4313-48c2-8c29-0e1224fa28d7');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
