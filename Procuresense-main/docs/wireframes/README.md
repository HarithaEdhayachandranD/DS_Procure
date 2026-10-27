# ProcureSense AI Wireframe Plan

This document defines the wireframe structure for the ProcureSense AI product experience. It is intentionally visual and layout-focused, with no implementation code.

## 1. Global Product Structure

### Desktop / Large Screen Layout
- Left sidebar for core navigation
- Top bar with search, notifications, user profile, and global actions
- Main content area with page title, summary cards, tables, charts, and forms
- Consistent spacing, card-based sections, and enterprise SaaS visual hierarchy

### Tablet Layout
- Collapsible sidebar
- Stacked content blocks instead of multi-column dense layouts
- Tables may become card-style lists

### Mobile Layout
- Top bar remains compact and sticky
- Sidebar becomes a slide-out navigation panel
- Content stacks vertically with larger tap targets
- Important CTAs remain visible near the top

---

## 2. Shared UI Patterns

### App Shell
- Brand logo and product name in the sidebar
- Navigation groups:
  - Dashboard
  - Suppliers
  - Procurement
  - Contracts
  - Analytics
  - Reports
  - AI Insights
  - Settings
- User profile section at the bottom
- Active state clearly highlighted

### Common Page Structure
- Page header with title, subtitle, and action buttons
- Summary or filter bar near the top
- Main content area divided into cards or sections
- Secondary actions placed in the top-right
- Empty states and loading states designed consistently

---

## 3. Screen Wireframes

### A. Landing Page
Purpose: Introduce the product and guide new users to sign up or request a demo.

Structure:
- Hero section at the top
  - Headline
  - Subheadline
  - Primary CTA: Get Started
  - Secondary CTA: Book Demo
- Trust / brand section
  - Partner logos or customer proof points
- Feature highlights section
  - Supplier intelligence
  - Risk prediction
  - Analytics dashboards
  - Recommendation engine
- Product preview section
  - Mock dashboard screenshot or visual overview
- Footer
  - Product links, legal links, contact info

### B. Login Page
Purpose: Allow existing users to sign in securely.

Structure:
- Centered auth card
- Brand header at the top
- Email field
- Password field
- Forgot password link
- Sign in button
- Secondary link to register
- Optional social sign-in area or SSO prompt

### C. Register Page
Purpose: Create a new organization or user account.

Structure:
- Centered auth card
- Full name field
- Work email field
- Company name field
- Password and confirm password fields
- Role selection dropdown
- Create account button
- Link back to login
- Consent / terms notice

### D. Forgot Password Page
Purpose: Recover account access.

Structure:
- Centered card with back link
- Title and short description
- Email field
- Send reset link button
- Confirmation state after submission
- Support/help text

### E. Dashboard
Purpose: Provide a high-level operational overview for procurement leaders.

Structure:
- Page header with title and date range filter
- KPI cards at the top
  - Total spend
  - Active suppliers
  - High-risk suppliers
  - Pending approvals
- Main content grid
  - Spend trend chart
  - Supplier health overview
  - Open procurement activities
  - AI recommendations panel
- Right-side or lower section for urgent actions and alerts

### F. Supplier Management
Purpose: View and manage supplier records.

Structure:
- Page header with title and Add Supplier button
- Top filter bar
  - Search field
  - Status filter
  - Risk filter
  - Industry filter
- Supplier table or card list
  - Supplier name
  - Status
  - Risk score
  - Spend value
  - Performance rating
  - Actions menu
- Pagination or load more control

### G. Supplier Details
Purpose: Show a single supplier’s profile and performance history.

Structure:
- Header with supplier name and status tag
- Action buttons: Edit, Add Evaluation, Contact Supplier
- Summary card section
  - Risk score
  - Performance score
  - On-time delivery
  - Total spend
- Tabs or sections for:
  - Overview
  - Contracts
  - Evaluations
  - Risk history
  - Documents
- Timeline or activity feed for recent actions

### H. Add Supplier
Purpose: Create a new supplier profile.

Structure:
- Page header with title and cancel/save buttons
- Two-column form layout on desktop
  - Basic information
  - Contact information
  - Company details
  - Risk and classification info
- Section for documents or attachments
- Save and create button
- Validation hints and required field indicators

### I. Risk Prediction
Purpose: Show AI-based supplier risk insights and predictions.

Structure:
- Page header with title and prediction date range
- Summary panel
  - Risk score
  - Confidence label
  - Category: low / medium / high / critical
- Main insight card
  - Factors affecting risk
  - Historical trend indicator
- Supporting cards for:
  - Payment delays
  - Compliance issues
  - Geographic exposure
  - Financial signals
- Recommendation actions section
  - Escalate review
  - Request additional documents
  - Reassign supplier

### J. Delivery Prediction
Purpose: Forecast delivery performance and potential delays.

Structure:
- Page header with title
- Summary card with delivery confidence score
- Forecast chart or trend visualization
- Section for predicted upcoming delays
- Supplier comparison section
- Action recommendations
  - Adjust lead times
  - Increase safety stock
  - Switch backup suppliers

### K. Recommendation Engine
Purpose: Surface AI-driven procurement recommendations.

Structure:
- Header with title and recommendation filters
- Recommendation cards or table
  - Suggested action
  - Related supplier
  - Confidence score
  - Expected impact
  - Priority level
- Sidebar or section for rationale and supporting data
- Action buttons: Approve, Dismiss, Review Later

### L. Analytics
Purpose: Provide deeper insights into procurement and supplier performance.

Structure:
- Page header with title and date filter
- KPI strip with major metrics
- Chart area with multiple visual blocks
  - Spend by category
  - Supplier performance by region
  - Risk distribution trend
  - Procurement cycle time trend
- Insight summary panel with notable findings
- Optional export button

### M. Reports
Purpose: Prepare and review downloadable reports.

Structure:
- Page header with title and Create Report button
- Filter bar for report type and time range
- Report cards or list of generated reports
  - Name
  - Type
  - Date generated
  - Status
  - Download action
- Preview panel for selected report
- Export actions

### N. Settings
Purpose: Configure organization-level preferences and platform behavior.

Structure:
- Page header with title
- Sidebar or tab group for sections
  - Brand guidelines
  - Organization settings
  - Notifications settings
  - Security settings
  - Integrations
- Main content panel with the selected section
- Save changes action at the bottom

### O. Profile
Purpose: Manage personal account details.

Structure:
- Header with profile name and role
- Profile summary card with avatar, name, and role
- Editable form sections
  - Personal details
  - Contact information
  - Preferences
- Security section with password controls
- Save changes button

### P. Notifications
Purpose: Display recent alerts and activity updates.

Structure:
- Page header with title and mark all as read action
- Notification list grouped by category
  - High priority alerts
  - Supplier updates
  - AI insights
  - System notifications
- Each item shows icon, title, short message, and timestamp
- Empty state for no unread notifications

---

## 4. Design Principles

- Clear enterprise SaaS hierarchy
- Consistent spacing and alignment throughout the experience
- Use cards, tables, and panels rather than cluttered layouts
- Strong visual distinction between primary actions and secondary actions
- Responsive behavior from the start
- Professional and trustworthy visual tone

---

## 5. Recommended Screen Priority

Phase 1:
- Landing Page
- Login
- Register
- Forgot Password
- Dashboard

Phase 2:
- Supplier Management
- Supplier Details
- Add Supplier
- Risk Prediction
- Delivery Prediction

Phase 3:
- Recommendation Engine
- Analytics
- Reports
- Settings
- Profile
- Notifications
