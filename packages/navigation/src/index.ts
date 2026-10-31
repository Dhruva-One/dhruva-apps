/**
 * Every role, surface and screen in the Functional Overview (Parts 1 to 5) and the phone tab bars in
 * spec section 7 (Table 7-A), each tied to the requirement modules that define it. Screens are built
 * against this registry; a role only shows screens whose feature flags are on (see @dhruva/feature-flags).
 */
export type Surface = 'desktop' | 'phone';

export interface Screen {
  key: string;
  label: string; // the label on screen, as in the design
  req: string[]; // requirement modules, e.g. DSK-OWN
  only?: Surface; // set when the screen exists on one surface only
}

export interface Role {
  key: string;
  label: string; // profile label in the picker
  overview: string; // Functional Overview chapter
  desktop: Screen[];
  phoneTabs: string[]; // phone tab bar (Table 7-A)
}

const s = (key: string, label: string, req: string[], only?: Surface): Screen => ({ key, label, req, only });

export const roles: Role[] = [
  { key: 'owner', label: 'Group owner', overview: 'Part 1 · Group Owner', phoneTabs: ['Home', 'Campuses', 'Insights', 'Calendar'], desktop: [
    s('overview', 'Overview', ['DSK-OWN', 'AI-FOC']), s('onboarding', 'Onboarding', ['DSK-OWN', 'XCT-IMP'], 'desktop'), s('add-campus', 'Add a campus', ['DSK-OWN', 'XCT-IMP'], 'desktop'),
    s('campuses', 'Campuses', ['DSK-OWN']), s('admissions', 'Admissions', ['DSK-OWN']), s('insights', 'Insights', ['DSK-OWN', 'MOB-STF']),
    s('reports', 'Reports', ['DSK-OWN', 'XCT-RPT']), s('notices', 'Notices', ['XCT-CAL']), s('calendar', 'Calendar', ['XCT-CAL']), s('approvals', 'Approvals', ['XCT-APR'])] },
  { key: 'principal', label: 'Principal', overview: 'Part 1 · Principal', phoneTabs: ['Today', 'Calendar', 'Fees', 'Reports', 'Me'], desktop: [
    s('today', 'Today', ['DSK-PRI', 'AI-FOC']), s('attendance', 'Attendance', ['DSK-PRI']), s('absence-watch', 'Absence watch', ['DSK-PRI']), s('fee-defaulters', 'Fee defaulters', ['DSK-PRI']),
    s('reports', 'Reports', ['DSK-PRI', 'XCT-RPT']), s('calendar', 'Calendar', ['XCT-CAL']), s('approvals', 'Approvals', ['XCT-APR']), s('notices', 'Notices', ['XCT-CAL'])] },
  { key: 'admin', label: 'School admin', overview: 'Part 1 · Standalone School Admin', phoneTabs: ['Today', 'People', 'Money', 'Intake', 'School'], desktop: [
    s('today', 'Today', ['DSK-ADM', 'AI-FOC']), s('people', 'People', ['DSK-ADM']), s('money', 'Money', ['DSK-ADM']), s('admissions', 'Admissions', ['DSK-ADM']), s('school', 'School', ['DSK-ADM'])] },
  { key: 'coordinator', label: 'Academic coordinator', overview: 'Part 2 · Academic Coordinator', phoneTabs: ['Today', 'Cover', 'Progress', 'Timetable'], desktop: [
    s('today', 'Today', ['DSK-ACO']), s('cover', 'Cover', ['DSK-ACO', 'AI-COV']), s('checkins', 'Progress: Check-ins and plans', ['DSK-ACO']), s('outcomes', 'Progress: Learning outcomes', ['DSK-ACO']),
    s('timetable', 'Timetable', ['DSK-ACO', 'AI-TTG']), s('parent-queries', 'Parent queries', ['DSK-ACO'])] },
  { key: 'hod', label: 'Head of department', overview: 'Part 2 · Head of Department', phoneTabs: ['Today', 'Reviews', 'Team', 'Progress'], desktop: [
    s('today', 'Today', ['DSK-HOD']), s('my-classes', 'My classes', ['DSK-HOD']), s('reviews', 'Reviews: Lesson plans and Question papers', ['DSK-HOD']), s('team', 'My team', ['DSK-HOD']),
    s('progress', 'Progress', ['DSK-HOD']), s('calendar', 'Calendar', ['XCT-CAL'])] },
  { key: 'exam-cell', label: 'Exam cell in-charge', overview: 'Part 2 · Exam Cell', phoneTabs: ['Today', 'Papers', 'Exam days', 'Marks', 'CBSE'], desktop: [
    s('today', 'Today', ['DSK-EXM']), s('papers', 'Question papers', ['DSK-EXM', 'AI-PPR']), s('exam-days', 'Exam days', ['DSK-EXM']), s('marks', 'Marks and results', ['DSK-EXM']), s('cbse', 'CBSE registration', ['DSK-EXM'])] },
  { key: 'counsellor', label: 'School counsellor', overview: 'Part 2 · School Counsellor', phoneTabs: ['Today', 'Students', 'Sessions', 'Guidance'], desktop: [
    s('today', 'Today', ['DSK-CNS']), s('students', 'My students', ['DSK-CNS']), s('sessions', 'Sessions', ['DSK-CNS']), s('careers', 'Career guidance', ['DSK-CNS']), s('programmes', 'Programmes', ['DSK-CNS'])] },
  { key: 'teacher', label: 'Teacher', overview: 'Part 2 · Teacher', phoneTabs: ['Today', 'Inbox', 'Students', 'Prep', 'Calendar'], desktop: [
    s('today', 'Today', ['DSK-TCH']), s('inbox', 'Inbox', ['DSK-TCH']), s('calendar', 'Calendar', ['XCT-CAL']), s('timetable', 'Timetable', ['DSK-TCH']), s('students', 'My students', ['DSK-TCH']),
    s('marks', 'Marks', ['DSK-TCH', 'AI-MKS']), s('attendance', 'Attendance', ['DSK-TCH']), s('homework', 'Homework', ['DSK-TCH', 'AI-HWK']), s('papers', 'Question papers', ['DSK-TCH', 'AI-PPR']),
    s('notes', 'Notes for students', ['DSK-TCH']), s('lesson-plans', 'Lesson plans', ['DSK-TCH', 'AI-LPL']), s('remedial', 'Remedial', ['DSK-TCH', 'AI-REM']), s('ask', 'Ask Dhruva', ['AI-CHT'])] },
  { key: 'hr', label: 'HR and payroll', overview: 'Part 3 · HR and Payroll', phoneTabs: ['Today', 'Requests', 'People', 'Payroll'], desktop: [
    s('today', 'Today', ['DSK-HRP']), s('employees', 'Employees', ['DSK-HRP']), s('attendance-leave', 'Attendance and leave', ['DSK-HRP']), s('payroll', 'Payroll', ['DSK-HRP', 'AI-PAY']),
    s('hiring', 'Hiring and onboarding', ['DSK-HRP']), s('exits', 'Exits', ['DSK-HRP'], 'desktop')] },
  { key: 'finance', label: 'Accounts in-charge', overview: 'Part 3 · Finance and Accounts', phoneTabs: ['Home', 'Alerts', 'Reports', 'Bank'], desktop: [
    s('today', 'Today', ['DSK-FIN']), s('approvals', 'Approvals', ['DSK-FIN', 'XCT-APR']), s('fees', 'Fees', ['DSK-FIN']), s('bills', 'Purchase bills', ['DSK-FIN']), s('vendors', 'Vendors', ['DSK-FIN'], 'desktop'),
    s('inventory', 'Inventory', ['DSK-FIN'], 'desktop'), s('bank', 'Bank reconciliation', ['DSK-FIN', 'AI-BNK']), s('tally', 'Tally sync', ['DSK-FIN', 'XCT-INT'], 'desktop'),
    s('accounts', 'Accounts: Vouchers, Ledgers, Setup', ['DSK-FIN'], 'desktop'), s('reports', 'Reports', ['DSK-FIN']), s('compliance', 'Compliance and month-end', ['DSK-FIN']), s('alerts', 'Alerts', ['DSK-FIN']), s('ask', 'Ask Dhruva', ['AI-CHT'])] },
  { key: 'admissions', label: 'Admissions counsellor', overview: 'Part 3 · Admissions and CRM', phoneTabs: ['Today', 'Families', 'Tours', 'Seats'], desktop: [
    s('today', 'Today', ['DSK-ADS', 'AI-ADM']), s('enquiries', 'Enquiries and Families', ['DSK-ADS']), s('family', 'Family record', ['DSK-ADS']), s('tours', 'Campus tours', ['DSK-ADS']),
    s('seats', 'Seats and offers', ['DSK-ADS']), s('campaigns', 'Campaigns', ['DSK-ADS'], 'desktop'), s('reports', 'Reports', ['DSK-ADS'], 'desktop')] },
  { key: 'security', label: 'Security and IT in-charge', overview: 'Part 3 · Security and IT', phoneTabs: ['Today', 'Jobs', 'Gate', 'Team'], desktop: [
    s('today', 'Today', ['DSK-SEC', 'AI-SEC']), s('jobs', 'Jobs', ['DSK-SEC']), s('gate', 'Gate', ['DSK-SEC']), s('systems', 'Systems', ['DSK-SEC']), s('team', 'Team', ['DSK-SEC'])] },
  { key: 'transport', label: 'Transport in-charge', overview: 'Part 3 · Transport', phoneTabs: ['Today', 'Live', 'Safety', 'Messages'], desktop: [
    s('today', 'Today', ['DSK-TRN', 'AI-TRN']), s('live', 'Live board', ['DSK-TRN']), s('safety', 'Safety checks', ['DSK-TRN']), s('messages', 'Parent messages', ['DSK-TRN']),
    s('routes', 'Routes and students', ['DSK-TRN'], 'desktop'), s('fleet', 'Fleet', ['DSK-TRN'], 'desktop'), s('fees', 'Transport fees', ['DSK-TRN'], 'desktop'), s('reports', 'Reports', ['DSK-TRN'], 'desktop')] },
  { key: 'bus-attendant', label: 'Bus attendant', overview: 'Part 3 · Transport (attendant)', phoneTabs: ['Trip', 'Children', 'SOS', 'Me'], desktop: [] },
  { key: 'parent', label: 'Parent', overview: 'Part 4 · Parent', phoneTabs: ['Home', 'Progress', 'Fees', 'Messages'], desktop: [] },
  { key: 'student-junior', label: 'Student, Classes 6 to 8', overview: 'Part 4 · Student 6-8', phoneTabs: ['Home', 'Schedule', 'Learn', 'Progress'], desktop: [
    s('home', 'Home', ['DSK-STM', 'MOB-STM']), s('schedule', 'Schedule / Timetable', ['DSK-STM']), s('homework', 'Homework', ['DSK-STM']), s('notes', 'Notes and revision', ['DSK-STM']),
    s('ask-teacher', 'Ask a teacher', ['DSK-STM', 'AI-TUT']), s('marks', 'Marks', ['DSK-STM']), s('attendance', 'Attendance', ['DSK-STM']), s('holistic', 'Holistic progress', ['DSK-STM']), s('leave', 'Leave', ['DSK-STM'])] },
  { key: 'student-senior', label: 'Student, Classes 9 to 12', overview: 'Part 4 · Student 9-12', phoneTabs: ['Home', 'Schedule', 'Learn', 'Progress'], desktop: [
    s('home', 'Home', ['DSK-STS', 'MOB-STS']), s('timed-paper', 'Timed past-paper practice', ['DSK-STS']), s('schedule', 'Schedule / Timetable', ['DSK-STS']), s('homework', 'Homework', ['DSK-STS']),
    s('notes', 'Notes and revision', ['DSK-STS']), s('ask-teacher', 'Ask a teacher', ['DSK-STS', 'AI-TUT']), s('marks', 'Marks', ['DSK-STS']), s('attendance', 'Attendance', ['DSK-STS']),
    s('holistic', 'Holistic progress', ['DSK-STS']), s('leave', 'Leave', ['DSK-STS'])] },
  { key: 'trustee', label: 'Trustee', overview: 'Part 1 · Standalone School Admin (trustee view)', phoneTabs: [], desktop: [s('payroll-log', 'Payroll and refund log (read only)', ['DSK-ADM'], 'desktop')] },
];

/** Phone screens for the parent, attendant and every profile (Overview Parts 4 and 5; spec 7.3). */
export const phoneScreens: Record<string, Screen[]> = {
  parent: [
    s('home', 'Home', ['MOB-PARH']), s('progress', 'Progress', ['MOB-PARP']), s('fees', 'Fees', ['MOB-PARF']), s('messages', 'Messages', ['MOB-PARM']), s('leave', 'Leave request', ['MOB-PARL']),
    s('ptm', 'PTM slot', ['MOB-PART']), s('notices', 'Notices', ['MOB-PARN']), s('bus', 'Bus tracker', ['MOB-PARB']), s('calendar', 'School calendar', ['MOB-PARC']),
    s('junior-pod', 'Junior pod', ['MOB-PARJ']), s('switch', 'Kids switching and other profiles', ['MOB-PARK', 'MOB-PRF']), s('dhruva', 'Dhruva chat', ['MOB-DHR'])],
  'bus-attendant': [s('trip-am', 'Trip, morning pickup', ['MOB-BUS']), s('trip-pm', 'Trip, afternoon drop', ['MOB-BUS']), s('children', 'Children', ['MOB-BUS']), s('sos', 'SOS and help', ['MOB-BUS', 'MOB-DEV'])],
  everyone: [
    s('first-run', 'First run: splash, language, notifications, Face ID', ['MOB-SHL']), s('sign-in', 'Mobile number and one-time code', ['MOB-AUT', 'IDM-OTP']),
    s('choose-profile', 'Choose a profile', ['MOB-PRF', 'IDM-DSC']), s('not-found', 'Number not found', ['IDM-NF']), s('switch-profile', 'Switch profile', ['MOB-PRF']),
    s('notifications', 'Notifications', ['MOB-NTF']), s('dhruva', 'Dhruva sheet', ['MOB-DHR']), s('me', 'Me, settings and sign out', ['MOB-ME', 'MOB-SEC'])],
};

export const allScreens = (): Screen[] => [...roles.flatMap((r) => r.desktop), ...Object.values(phoneScreens).flat()];
