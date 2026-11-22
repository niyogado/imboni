# iMBONi — Product Requirements Specification (PRS)

**Version:** 1.2  
**Project:** iMBONi — School and Parent Monitoring Management System

## 1. Project Overview

### 1.1 Project Description
iMBONi is a school management and parent-monitoring platform designed to connect schools with parents and guardians. It enables authorized school staff to manage student information, academic performance, attendance, discipline, permissions, and communication.

Parents and guardians can securely monitor their linked children's academic progress, attendance, discipline records, and important school announcements.

### 1.2 Main Objectives
- Improve communication between schools and parents.
- Allow parents to monitor their children's academic performance and discipline.
- Digitize student registration and school record management.
- Improve attendance tracking and permission management.
- Provide timely notifications through WhatsApp.
- Generate useful reports for school administrators and teachers.
- Maintain secure, accurate, and accessible student records.

## 2. Technology Stack

### 2.1 Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Hook Form
- Recharts for data visualization

### 2.2 Backend
- Node.js
- Express.js
- TypeScript recommended
- REST API architecture
- JWT-based authentication
- bcrypt password hashing
- Prisma or Sequelize ORM

### 2.3 Database
- MySQL
- Database migrations
- Relational data modelling
- Foreign key constraints and indexes

### 2.4 Notifications
- WhatsApp Business Platform or an authorized WhatsApp Business API provider as the **primary notification channel**.
- SMS gateway as a **secondary fallback channel**.
- Background notification processing for retries and delivery tracking.

### 2.5 Development and Testing Tools
- Git and GitHub
- Postman
- VS Code
- Docker where appropriate
- Automated backend and frontend testing tools

## 3. User Roles and Access Control

The system must implement Role-Based Access Control (RBAC).

### 3.1 Administrator
The administrator manages the overall school system.

Responsibilities:
- Manage staff accounts and permissions.
- Register students.
- Assign authorized school staff to registration responsibilities.
- Manage classes, academic years, and subjects.
- Manage parents and guardians.
- Link students with verified parents or guardians.
- Configure school rules and disciplinary categories.
- Manage student permissions.
- View school-wide reports.
- Manage system settings.

### 3.2 Authorized School Staff
School staff who have been granted student-registration permissions can register students.

Responsibilities depend on assigned permissions and may include:
- Register new students.
- Update permitted student information.
- View student records.
- Manage assigned classes or academic information where authorized.

Registration permissions must be explicitly granted by an administrator. Not every staff member should automatically have permission to register students.

### 3.3 Teachers
Responsibilities:
- View assigned classes and students.
- Record attendance.
- Enter student marks.
- Record student discipline incidents.
- View approved student permissions before recording attendance.
- View relevant student information according to their role.

### 3.4 Parents and Guardians
Responsibilities:
- Access only students linked and approved by the school.
- View academic performance.
- View attendance records.
- Monitor discipline records.
- Receive WhatsApp notifications.
- View school announcements.
- View approved permissions and relevant updates.

A parent may be linked to multiple students. A student may have multiple authorized parents or guardians.

## 4. Functional Requirements

### 4.1 Authentication and Authorization
- Users must securely register or receive accounts according to their roles.
- Users must log in and log out.
- Passwords must be securely hashed.
- The backend must enforce role-based permissions.
- Unauthorized users must not access restricted endpoints.
- Account activation, deactivation, and password recovery must be supported.

### 4.2 Student Registration and Management

**Registration policy: Administrators and authorized school staff only.**

Parents and guardians must not directly create official student records.

#### Student Registration Workflow
1. Administrator or authorized staff member logs in.
2. User opens Student Management.
3. User selects Register Student.
4. User enters the required student information, including gender.
5. System validates the submitted information.
6. System checks for duplicate student records.
7. System automatically generates a student code according to the student's gender.
8. System assigns the student to the appropriate class and academic year.
9. Student profile is created with an initial status of Active.
10. The student becomes available for parent/guardian linking later.

#### Automatic Student Code Generation

Student codes must be generated automatically by the backend. Administrators and authorized school staff must not manually create or edit student codes during normal registration.

The system must follow these formats:

| Gender | Student code format | Examples |
|---|---|---|
| Female | `SWDF[number]/25` | SWDF1/25, SWDF2/25, SWDF3/25 |
| Male | `SWDG[number]/25` | SWDG1/25, SWDG2/25, SWDG3/25 |

**Generation rules:**
- Female and male students must have separate numbering sequences.
- The first female student receives `SWDF1/25`; the first male student receives `SWDG1/25`.
- When another female student is registered, the system generates the next female number.
- When another male student is registered, the system generates the next male number.
- The backend must generate the code automatically after validating the student's gender and registration data.
- Student codes must be unique and permanently associated with their student records.
- A previously assigned student code must never be reused, even if a student record is deactivated or archived.
- Code generation must be atomic and protected against duplicate codes when multiple staff members register students simultaneously.
- The student code must be displayed automatically after successful registration.
- The code must be stored in the database and used as the student's official school identifier.
- The `/25` suffix must remain part of the generated format.

#### Required Student Information
- First name
- Last name
- Gender
- Date of birth, where required
- Class
- Academic year
- Student status
- Other school-required information

The student code is generated by the system and is not a manually entered registration field.

#### Student Registration Rules
- Only administrators and explicitly authorized staff can register students.
- Each student must receive an automatically generated unique student code.
- Duplicate student records must be prevented.
- A student must be assigned to an appropriate class and academic year.
- Registration and modification activities must be auditable.
- Student registration must not require a parent account or guardian link.
- Existing student records must be preserved when students change classes or academic years.

#### Student Status
Each student must have a status:
- Active
- Inactive

Inactive status may be used for authorized temporary absence, school departure, or other approved circumstances. The system must preserve historical academic and attendance records.
### 4.3 Parent and Guardian Management

**Parent-linking policy: Register students first and link parents later.**

Parent linking is a separate process from student registration.


#### Parent Linking Workflow
1. Administrator or authorized staff member opens the student profile.
2. User selects Link Parent/Guardian.
3. User searches for an existing parent account or creates a parent record.
4. User enters the guardian's contact information and relationship to the student.
5. System validates the parent information.
6. The school verifies and approves the relationship.
7. System creates the student-parent relationship.
8. The parent receives account or linking instructions through the configured communication channel.

#### Parent Linking Rules
- A student can be registered without a linked parent.
- A parent can be linked after student registration.
- One parent can be linked to multiple students.
- One student can have multiple authorized parents or guardians.
- The system must support relationships such as father, mother, guardian, or other approved relationship types.
- Only verified and approved guardians can access student information.
- Parent access must be revocable by authorized school administrators.
- The system must prevent unauthorized parent access.
- Parent contact details and account access must be handled securely.

### 4.4 Class and Academic Year Management
- Administrators can create and manage classes.
- Administrators can configure academic years.
- Students must be assigned to classes.
- Student promotion and class changes must be supported.
- Historical academic records must remain accessible after promotion.

### 4.5 Academic Performance Management
- Teachers can enter marks for assigned students and subjects.
- The system calculates totals, averages, and grades according to configured school rules.
- Parents can view their linked children's academic performance.
- Administrators can generate academic reports.
- Historical results must be preserved.

### 4.6 Attendance Management
- Teachers can record daily attendance.
- Attendance statuses should include Present, Absent, Late, and other school-approved categories.
- Teachers must see a student's current status and approved permission before recording attendance.
- Students with approved permissions must not be incorrectly marked absent.
- Attendance records must include date, student, class, and recording staff member.
- Parents can view attendance records for linked students.

### 4.7 Student Permission Management
The system must support authorized student absence and temporary permission workflows.

#### Permission Workflow
1. Authorized school staff submits or records a permission request.
2. Headmaster or designated authority reviews the request.
3. The authority approves or rejects it.
4. Approved permissions are saved with their reason and relevant dates.
5. Teachers can see the approved permission before taking attendance.
6. The system preserves permission history.

Permission information should include:
- Student
- Reason
- Start date
- End date
- Approval status
- Approving authority
- Date of approval

### 4.8 Discipline Management
- Teachers can record discipline incidents.
- Each incident must be associated with a student.
- Incidents must include date, category, description, and recording staff member.
- Administrators can configure discipline categories and sanctions.
- Sanctions must not be permanently hardcoded.
- Parents can view relevant discipline records for their linked children according to school policy.
- Discipline history must be preserved.

### 4.9 Notifications and Communication

**WhatsApp is the primary notification channel. SMS is the secondary fallback channel.**

#### WhatsApp Notifications
The system should send WhatsApp notifications for relevant events, including:
- Academic results publication.
- Attendance alerts.
- Discipline updates.
- Approved student permissions.
- Important school announcements.
- Other configured parent notifications.

#### SMS Fallback
If WhatsApp delivery fails or is unavailable, the system may use SMS as a secondary fallback according to school configuration and available provider services.

#### Notification Requirements
- Use the official WhatsApp Business Platform or an authorized provider.
- Obtain and manage appropriate parent consent and opt-in.
- Use approved templates where required by WhatsApp policies.
- Secure API credentials using environment variables or a secrets manager.
- Track notification status, including pending, sent, delivered, and failed where supported.
- Implement retry handling for temporary failures.
- Avoid duplicate notifications through idempotency controls.
- Use provider webhooks to update delivery statuses where supported.
- Consider provider pricing, message limits, and free-tier restrictions.
- Do not expose unnecessary sensitive student information in message previews.
- Record notification history for authorized auditing.

### 4.10 Reports and Analytics
Administrators should be able to view:
- Total registered students.
- Active and inactive students.
- Class enrollment statistics.
- Academic performance reports.
- Attendance summaries.
- Discipline summaries.
- Parent-linking statistics.
- Notification delivery statistics.

## 5. Non-Functional Requirements

### 5.1 Security
- Use secure authentication and authorization.
- Apply role-based access control on the backend.
- Hash passwords using bcrypt or an equivalent secure algorithm.
- Validate and sanitize inputs.
- Protect sensitive student and parent information.
- Use HTTPS in production.
- Store API credentials securely.
- Maintain audit logs for sensitive actions.

### 5.2 Performance
- API responses should be efficient.
- Database queries should be optimized.
- Pagination should be used for large datasets.
- Background workers should handle notification processing.

### 5.3 Reliability
- Validate data before saving.
- Handle errors consistently.
- Prevent duplicate records and notifications.
- Preserve academic and administrative history.
- Provide reliable database backup and recovery procedures.

### 5.4 Usability
- Provide a responsive interface.
- Use clear dashboards for each user role.
- Make student registration straightforward.
- Make parent linking a separate, understandable workflow.
- Display meaningful validation and error messages.

### 5.5 Maintainability
- Use a modular backend structure.
- Maintain clear API documentation.
- Use database migrations.
- Apply consistent coding standards.
- Maintain automated tests.

## 6. System Architecture

### 6.1 Main Architecture

React Frontend → Node.js/Express REST API → MySQL Database

External integrations:
- WhatsApp Business API — primary notifications.
- SMS provider — secondary fallback.
- Optional Python/FastAPI service — analytics and advanced reporting.

### 6.2 Backend Responsibilities
The Node.js backend is responsible for:
- Authentication and authorization.
- Student registration and management.
- Parent and guardian management.
- Student-parent relationship management.
- Academic records.
- Attendance and permissions.
- Discipline management.
- Notifications and reporting.
- API validation and security.

### 6.3 Notification Processing
The backend should create notification jobs and process them through a background worker.

The worker should:
1. Identify the notification recipient.
2. Check communication preferences and consent.
3. Attempt delivery through WhatsApp first.
4. Record the provider response.
5. Retry temporary failures according to configured rules.
6. Use SMS fallback when permitted and appropriate.
7. Update notification status.
8. Maintain notification history.

## 7. Data Management

The database should include entities such as:

- Users
- Roles
- Permissions
- Students
- Parents or Guardians
- Student_Guardians
- Classes
- Academic_Years
- Subjects
- Marks
- Attendance
- Student_Permissions
- Discipline_Incidents
- Discipline_Categories
- Sanctions
- Notifications
- Notification_Templates
- Audit_Logs

### Important Relationship Rules
- A student can exist without a linked guardian.
- A student can have multiple guardians.
- A guardian can be linked to multiple students.
- Student_Guardians should manage the many-to-many relationship.
- A student must belong to the appropriate class and academic year.
- Student records must remain connected to historical academic records.
- User roles and permissions must be enforced by the backend.

## 8. Proposed Application Modules

1. Authentication and Authorization
2. Dashboard
3. Student Management
4. Parent and Guardian Management
5. Class Management
6. Academic Management
7. Attendance Management
8. Permission Management
9. Discipline Management
10. Notifications and Announcements
11. Reports and Analytics
12. System Settings
13. Audit Logs

## 9. Python Integration

Python is optional and should not replace the main Node.js backend.

Recommended uses:
- Advanced academic performance analysis.
- Student performance trend analysis.
- Statistical reporting.
- Predictive analytics in future versions.
- Advanced data visualization and insights.

Recommended technology:
- Python
- FastAPI
- Pandas
- NumPy
- Scikit-learn, if predictive analytics becomes necessary

Node.js remains responsible for the main business logic, authentication, student registration, parent linking, and database operations.

## 10. Acceptance Criteria

The system will be considered successful when:

1. Administrators can securely manage the school system.
2. Administrators can grant student-registration permissions to authorized staff.
3. Authorized school staff can register students.
4. Unauthorized users cannot register students.
5. Students can be registered without parents being linked immediately.
6. Administrators and authorized staff can link parents to existing student profiles later.
7. One parent can be linked to multiple students.
8. One student can have multiple authorized guardians.
9. Only verified and approved guardians can access linked student information.
10. Teachers can manage attendance and academic records according to their permissions.
11. Teachers can see approved permissions before recording attendance.
12. The system maintains Active and Inactive student statuses.
13. Academic and attendance history is preserved.
14. Administrators can configure discipline categories and sanctions.
15. WhatsApp is implemented as the primary notification channel.
16. SMS is implemented as the secondary fallback channel where configured.
17. Notification statuses and delivery failures can be tracked.
18. Administrators can generate relevant school reports.
19. The application enforces security and role-based access control.

## 11. Development Priorities

### Phase 1 — Foundation
- Project setup.
- Database design.
- Authentication and RBAC.
- User and staff management.

### Phase 2 — Student and Guardian Management
- Student registration by administrators and authorized staff.
- Student profile management.
- Parent and guardian management.
- Separate parent-linking workflow.
- Class and academic year management.

### Phase 3 — School Operations
- Academic performance management.
- Attendance management.
- Permission management.
- Discipline management.

### Phase 4 — Communication
- WhatsApp Business API integration.
- Notification templates and consent management.
- Delivery tracking and retries.
- SMS fallback.

### Phase 5 — Reports and Quality Assurance
- Dashboards and reports.
- Testing and bug fixing.
- Security review.
- Deployment and documentation.

## 12. Scope Control

The first release should prioritize:
- Secure authentication and role management.
- Student registration by administrators and authorized staff.
- Parent linking after student registration.
- Class management.
- Academic performance.
- Attendance.
- Student permissions.
- Discipline.
- WhatsApp notifications as the primary communication deliverable.
- SMS fallback.
- Basic reports.

Advanced AI features and predictive analytics should be considered future enhancements rather than requirements for the initial release.

## 13. Final Product Goal

iMBONi should provide a secure and reliable connection between schools and families. It should allow authorized school staff to register students independently, link parents or guardians afterward, and give verified guardians access to their children's academic progress, attendance, discipline, permissions, and school updates.

The platform must prioritize accurate school records, controlled access, effective communication, and WhatsApp-based parent notifications, with SMS available as a secondary fallback.