# ZenShe Sanctuary

ZENSHE SPA — WEBSITE REDESIGN PROMPT

PROJECT CONTEXT
- App: ZenShe Spa — Women's Intimate Wellness Haven
- Stack: React 19 (Vite, ESM), React Router 7, React-Bootstrap 5, Formik + Yup, Framer Motion, i18next (fr/en/ar with RTL), Chart.js, custom date inputs
- Constraints: Keep the same stack. Keep RTL support. Keep the same routes. Don't refactor business logic. Don't refactor context providers, API services, or auth flows. Only redesign visuals/CSS/JSX structure.
- Languages: fr (default), en, ar. Translations live in public/locales/{fr,en,ar}/translation.json.
- Out of scope: components/archive/jotform-old/*, NavbarSandbox, DebugPlayground, /examples/* — these are dead code.
- Orphan pages currently NOT in routes: MembershipsPage, ReservationConfirmation, PhoneContactPage. Wire them in if needed; otherwise redesign them to match the new look.

CURRENT DESIGN PAIN POINTS
- One repeating 135deg linear-gradient from primary-green (#2e4d4c) to accent-green (#4a6b69) is used on navbar, buttons, modals, tables, footer, CTAs, scrollbars, progress bars. It's everywhere.
- All buttons are pill-shaped (border-radius: 25px) with the same translateY(-2px) hover lift and rgba(46,77,76,0.3) shadow.
- All cards are white with soft-green (#e8f0ef) borders, 15–20px radius, and identical shadow treatment.
- Body background is a flat 135deg gradient from soft-green to white.
- Service cards, testimonial cards, gallery cards all look the same.
- Sections alternate mechanically between bg-light and bg-soft-green.
- Font: Poppins everywhere. Icons: react-icons (FaLeaf/FaSeedling/FaSpa/FaGem/FaStar/FaHeart/FaBath).
- 404 page references non-existent .btn-pink / .text-pink classes (will fall back to default).
- Admin login route redirects to client login — admin has no dedicated entry.

EXISTING FILE STRUCTURE (do not break)
- src/main.jsx, src/App.jsx, src/index.css, src/i18n.js
- src/components/layouts/ClientLayout.jsx, AdminLayout.jsx
- src/components/ClientNavbar.jsx, ClientFooter.jsx, AdminNavbar.jsx, AdminSidebar.jsx
- src/components/CartWidget, CartSidebar, AddToCartButton, SimpleCartNotification, CompleteJotForm, WaiverModal
- src/components/booking/CartSummary.jsx + styles/CartSummary.css
- src/components/modals/DeleteConfirmationModal.jsx
- src/components/forms/ServiceForm.jsx, MembershipForm.jsx
- src/components/admin/MembershipTranslationsModal.jsx
- src/components/LanguageSwitcher.jsx
- src/components/ProtectedRoute.jsx, ClientProtectedRoute.jsx
- src/context/{Auth,ClientAuth,Cart,Language}Context.jsx, src/contexts/MembershipContext.jsx
- src/pages/client/* (Home, About, Services, ServiceDetail, Booking, Contact, ClientLogin, ClientSignup, ClientProfile, ForgotPassword, ResetPassword, Store, ProductDetail, Cart, Checkout, Confirmation, Memberships (orphan), ReservationConfirmation (orphan), PhoneContactPage (orphan))
- src/pages/admin/* (AdminLogin, Dashboard, Reservations, Clients, Services, Inventaire, Settings, Statistics, Referrals, Store, Memberships, MembershipTypes)
- src/styles/custom-datepicker.css, src/styles/CartSummary.css
- Co-located page CSS: StorePage, ProductDetailPage, CartPage, MembershipsPage, AdminStoreDashboard
- public/locales/{fr,en,ar}/translation.json

ROUTE MAP (keep as-is unless I say otherwise)
Client (wrapped in ClientLayout):
- / HomePage
- /about AboutPage
- /services ServicesPage
- /services/:id ServiceDetailPage
- /booking BookingPage
- /contact ContactPage
- /client/login ClientLogin
- /client/signup ClientSignup
- /client/forgot-password ForgotPassword
- /client/reset-password ResetPassword
- /boutique StorePage
- /boutique/produit/:productId ProductDetailPage
- /boutique/panier CartPage
- /boutique/checkout CheckoutPage
- /boutique/confirmation ConfirmationPage
- /profile ClientProfile (ClientProtectedRoute)

Admin (wrapped in AdminLayout + ProtectedRoute):
- /admin AdminDashboard
- /admin/reservations AdminReservations
- /admin/clients AdminClients
- /admin/services AdminServices
- /admin/inventaire AdminInventaire
- /admin/statistics AdminStatistics
- /admin/referrals AdminReferrals
- /admin/settings AdminSettings
- /admin/store AdminStoreDashboard
- /admin/memberships AdminMemberships
- /admin/membership-types AdminMembershipTypes

Provider tree: LanguageProvider > AuthProvider > ClientAuthProvider > MembershipProvider > CartProvider > Router > AnimatePresence > Routes.

PAGE-BY-PAGE UI/UX DETAILS

1. HomePage (/)
   - Hero: full-width gradient section. Headline + sub-text. Two CTAs ("Book now" / "Explore services"). On the right: a 360px circular floating logo container with backdrop-blur. Three floating decorative icons (FaStar, FaGem, FaSeedling) drift in a loop. Badge above title: "Sanctuaire féminin spécialisé" with FaLeaf.
   - Popular services: 4-column grid on desktop, 2 on tablet, 1 on mobile. Each card: large 3rem icon, name, short description, price in DT, duration, "Book" btn-green button. Section header has FaHeart icon.
   - New services: bg-soft-green section. 3-column grid. Card has "Nouveau" badge, name, description, price, duration, "Try" button.
   - Gallery: 6-image grid. Each image: hover zoom + bottom gradient with title overlay. Section header has FaImages icon.
   - Testimonials: 3-column grid. Each card has star rating (text-warning stars), italic comment, client name, date.
   - CTA: full-width green gradient section. Headline, description, "Book" light button.
   - Loading: full-screen with spinner-green.

2. AboutPage (/about)
   - Hero: gradient green section. Title + subtitle. (Image column on right.)
   - Values: 3 cards (feminine_wellness, holistic_approach, excellence_discretion) with Fa icons in text-warning.
   - Testimonials carousel: groups of 3 testimonials in carousel slides.
   - Spinner-green loading state.

3. ServicesPage (/services)
   - Page header.
   - Category filter chips.
   - Services grid: service-card for each (image, name, short desc, price, duration, "Book" + "Details" buttons).
   - Empty state if no results.

4. ServiceDetailPage (/services/:id)
   - Hero image + name + price + duration.
   - Long description.
   - Includes bullet list.
   - "Book this service" CTA (links to /booking?service=:id).
   - Related services carousel.

5. BookingPage (/booking)
   - Hosts the CompleteJotForm (5-step flow) + CartSummary sidebar.
   - Step 1 — Service selection: category headers + service-card grid; one selectable.
   - Step 2 — Date & time: custom-styled date input + time slot grid (9:00 → 18:00 in 30-min increments).
   - Step 3 — Add-ons: checkboxes + quantity incrementers.
   - Step 4 — Personal info: first name, last name, email, phone, address (optional), notes textarea.
   - Step 5 — Waiver: WaiverModal with consent text, accept/decline checkboxes, typed signature.
   - Step 6 — Review & confirm: summary + "Confirm reservation" button → POST /api/reservations.
   - Right rail: CartSummary with line items and total.

6. ContactPage (/contact)
   - Two columns: contact form (name, email, phone, subject, message) + business info (address, phone, email, hours, map embed).
   - Formik/Yup validation; submit POSTs to contact endpoint.

7. ClientLogin (/client/login)
   - Centered card: email + password, "Remember me", "Forgot password" link, submit, "Sign up" link.
   - Error alert on failure.

8. ClientSignup (/client/signup)
   - Form: first name, last name, email, password, confirm password, phone (optional), terms checkbox. Yup validation.
   - Submits to /api/clients/signup.

9. ForgotPassword (/client/forgot-password) — email field + submit.
10. ResetPassword (/client/reset-password) — token (from URL) + new password + confirm.
11. ClientProfile (/profile, protected) — sidebar tabs: Profile, Memberships, Reservations, Orders, Security. Editable form, change password, logout.
12. StorePage (/boutique) — hero, category/sort filter bar, product grid (image, name, price, AddToCartButton), pagination. Loads /api/store/products.
13. ProductDetailPage (/boutique/produit/:productId) — image gallery, name, price, description, qty selector, AddToCartButton, "Go to cart" CTA, related products grid.
14. CartPage (/boutique/panier) — item rows (image, name, unit price, qty controls, line total, remove), order summary sidebar (subtotal, tax, shipping, total, "Proceed to checkout"), empty state with "Continue shopping" link.
15. CheckoutPage (/boutique/checkout) — multi-section: contact info, shipping address, billing (copy-from-shipping checkbox), payment method picker, order summary, "Place order" CTA.
16. ConfirmationPage (/boutique/confirmation) — success icon, "Thank you", order number/summary, CTA back to store.
17. (Orphan) MembershipsPage — tier cards (Silver / Gold / Platinum / VIP — VIP has purple top border + light purple gradient bg), price, benefits, "Subscribe" CTA, FAQ.
18. (Orphan) ReservationConfirmation — reservation number, details, add to calendar link.
19. (Orphan) PhoneContactPage — phone number, hours, optional callback form.

ADMIN PAGES (all under AdminLayout)
- AdminLayout: d-flex row. AdminSidebar (fixed left, dark) + column with AdminNavbar (top) + Outlet. Sidebar collapses on mobile.
- AdminNavbar: top bar with admin user, logout, possibly search.
- AdminSidebar: nav links to all admin pages, with icons.

20. AdminLogin (/admin/login) — currently redirects to /client/login. Decide: keep redirect or give admin a dedicated login screen.
21. AdminDashboard (/admin) — KPI cards (total reservations, today's bookings, total clients, total revenue, active memberships, pending orders). Recent activity table. Chart.js graphs (revenue trend, bookings/day).
22. AdminReservations (/admin/reservations) — filter bar (date range, status, service, client search). Table: id, client, service, date, time, status badge, total, actions (view, edit, cancel, confirm). Row click → drawer/modal with full details + waiver status. Bulk actions. Create reservation modal.
23. AdminClients (/admin/clients) — search + filter bar (membership, status, date). Table: name, email, phone, registration date, membership, total spent, actions. Row click → client detail drawer (profile, addresses, memberships, reservations, orders, notes). Edit / disable / delete.
24. AdminServices (/admin/services) — service list table (image, name, category, price, duration, active toggle, actions). "+ New service" → ServiceForm modal. Edit / delete (via DeleteConfirmationModal). Category management tab.
25. AdminInventaire (/admin/inventaire) — inventory table (SKU, name, stock qty, low-stock indicator, last updated, actions). Filter by category / low-stock toggle. Add/adjust stock modal.
26. AdminStatistics (/admin/statistics) — Chart.js dashboards (revenue, reservations per service, top clients, conversion). Date range picker.
27. AdminReferrals (/admin/referrals) — referral codes table (code, owner, conversions, reward status, actions). Create referral modal.
28. AdminSettings (/admin/settings) — tabs: General, Localization, Booking, Email, Payments, Integrations. Each a Formik/Yup form.
29. AdminStoreDashboard (/admin/store) — product list table (image, name, category, price, stock, active toggle, actions). "+ New product" modal. Categories management. Orders sub-section.
30. AdminMemberships (/admin/memberships) — active memberships table (client, type, start, renewal, status, actions: renew/cancel/edit). Filters.
31. AdminMembershipTypes (/admin/membership-types) — types table (name, price, duration, active toggle, actions). "+ New type" → MembershipForm. Translations → MembershipTranslationsModal.

REUSABLE COMPONENTS
- ClientNavbar: Bootstrap Navbar, gradient bg, brand + logo image, links: Home, About, Services, Store, Booking, Contact. Auth-aware user dropdown (Profile / Login+Signup / Logout). CartWidget with count badge. LanguageSwitcher. Compact mobile burger. Sticky top.
- AdminNavbar: top bar (admin info, logout, possibly notifications).
- AdminSidebar: fixed left dark sidebar with all admin nav links and icons. Collapses to drawer on mobile.
- ClientFooter: multi-column (brand block, quick links, contact info, social icons, copyright). bg-gradient-green.
- LanguageSwitcher: fr/en/ar dropdown with flags/labels.
- CartWidget + CartSidebar: slide-in offcanvas-style cart panel with line items, qty controls, subtotal/tax/total, "View Cart" + "Checkout" CTAs.
- AddToCartButton: reusable with loading/disabled states, triggers toast notification.
- SimpleCartNotification: toast on add to cart.
- CompleteJotForm: the 5-step booking wizard.
- WaiverModal: bootstrap modal with waiver text, accept/decline, signature field.
- CartSummary: sidebar summary used inside BookingPage.
- DeleteConfirmationModal: generic confirm-delete.
- ServiceForm / MembershipForm: create/edit modals.
- MembershipTranslationsModal: edit fr/en/ar translations for a membership type.
- ProtectedRoute / ClientProtectedRoute: auth guards.

CONVENTIONS
- Spacing: Bootstrap utility classes (py-5, mb-4, etc.) + section padding.
- Buttons: primary btn-green, secondary btn-outline-green, ghost, danger.
- Cards: .card-green or default Bootstrap with custom radius.
- Tables: .table-green for header (gradient) + hover row (soft-green).
- Modals: .modal-header gradient green, .modal-content 20px radius.
- Forms: green focus ring; Formik + Yup; floating labels optional.
- Alerts: .alert-green for success; standard Bootstrap for danger/info.
- Loading: .spinner-green custom; minimal skeletons.
- Animations: framer-motion page fade/slide, float-animation, pulse-animation, fade-in-up.
- Empty states: centered icon + message + CTA.
- Responsive: only one breakpoint at 768px currently — needs tablet (1024px) and 2xl for admin tables.
- Page transitions: motion.div with pageVariants (opacity 0→1, y 20→0) and pageTransition (tween, 0.5s, anticipate ease).

THEME REDESIGN REQUIREMENTS
- Keep the earthy deep green wellness/spa feeling. Don't drift away from nature, calm, intimacy, femininity.
- But the visual language must change substantially. The current implementation feels like a default Bootstrap template with green paint. Make it feel intentional, distinctive, premium, calm.
- Recommended aesthetic direction: editorial-spa. Generous whitespace, elegant typography (pair a refined serif for display with a clean sans for body — e.g. Cormorant Garamond + Inter, or Fraunces + Manrope). Restrained color. Texture and rhythm over gradients. Subtle motion. Photography-forward. Soft, warm, feminine, but not pink — keep it green as the anchor.
- Color palette: a deep, slightly desaturated forest green as primary; warm bone/cream as the dominant surface color; a sage or moss as secondary; a single warm accent (terracotta, amber, or muted gold) used very sparingly for emphasis. Avoid the current uniform primary→accent gradient.
- Backgrounds: stop using linear-gradient(135deg) on body and sections. Use flat bone surfaces, soft radial washes, or subtle paper/grain texture. Sections can be defined by spacing and contrast rather than by tinted background fills.
- Buttons: NOT pill-shaped universally. Use a couple of well-defined variants: a primary solid (forest green, slight radius, no shadow lift), an outline variant, and a text/link variant. Hover: subtle background shift or underline reveal, not translateY.
- Cards: differentiate by section. Service cards can be image-forward with image-aspect-ratio. Testimonial cards can be typographic, no images, with a left accent rule. Gallery cards are image-only with overlay-on-hover. Membership tier cards can be vertical with a top color band per tier. Stop using the same .card-green everywhere.
- Navbar: instead of a solid gradient bar, try a transparent navbar over a calm hero with a hairline border, or a frosted bar that appears after scroll. Brand mark and language switcher aligned with intention. Book button visually distinct but not loud.
- Hero: replace the floating logo circle. Use a real hero composition: image, abstract botanical illustration, or typographic statement. Reduce decorative drifting icons.
- Forms: clean, low-chrome inputs. Subtle focus state. Floating labels or label-above — pick one and apply consistently. Inline validation messages.
- Modals: minimal headers, no gradient. Strong close affordance. Two clear actions.
- Tables (admin): not gradient headers. Sticky header, zebra rows or bordered, comfortable density, distinct row actions, status pills with semantic color.
- Footer: not a green gradient slab. Editorial multi-column with restrained palette, real links, social icons as outline circles.
- Animations: keep Framer Motion page transitions. Vary micro-interactions: button hovers, card image reveals, section reveals. Don't repeat translateY(-2px) everywhere.
- Icons: keep react-icons but switch style — try @phosphor-icons or heroicons-style outline icons instead of solid Fa icons. Or hand-pick a curated set with consistent stroke weight.
- Mobile: introduce a 1024px breakpoint for tablet. Admin tables need horizontal scroll or card-mode on small screens.
- Accessibility: focus rings visible. Color contrast AA. Respects prefers-reduced-motion.

DELIVERABLES I WANT FROM YOU (the LLM I'm feeding this prompt to)
1. A new design system document: color tokens (CSS variables), typography scale, spacing scale, radius scale, shadow scale, motion tokens.
2. Rewritten src/index.css with the new design system (no green-on-green gradient spam, no btn-green with 25px pill + shadow lift).
3. Rewritten component CSS files (CartWidget.css, CartSidebar.css, AddToCartButton.css, CartNotification.css, CompleteJotForm.css, custom-datepicker.css, CartSummary.css, StorePage.css, ProductDetailPage.css, CartPage.css, MembershipsPage.css, AdminStoreDashboard.css).
4. Redesigned JSX for the client-facing pages: HomePage, AboutPage, ServicesPage, ServiceDetailPage, ContactPage, ClientLogin, ClientSignup, ForgotPassword, ResetPassword, ClientProfile, BookingPage (refined CompleteJotForm), StorePage, ProductDetailPage, CartPage, CheckoutPage, ConfirmationPage, MembershipsPage, ReservationConfirmation, PhoneContactPage.
5. Redesigned JSX for shared components: ClientNavbar, ClientFooter, AdminNavbar, AdminSidebar, LanguageSwitcher, CartWidget, CartSidebar, AddToCartButton, SimpleCartNotification, CompleteJotForm, WaiverModal, CartSummary, DeleteConfirmationModal, ServiceForm, MembershipForm, MembershipTranslationsModal.
6. Redesigned admin pages: AdminDashboard, AdminReservations, AdminClients, AdminServices, AdminInventaire, AdminStatistics, AdminReferrals, AdminSettings, AdminStoreDashboard, AdminMemberships, AdminMembershipTypes.
7. New loading states and empty states for any list/table/screen that previously had none.
8. Suggest the new translations keys that should be added to fr/en/ar (don't write the full JSON — list the keys with sample values).
9. A short "What changed and why" summary at the end.

CONSTRAINTS
- Do not modify context files, API services, auth logic, or routing beyond the App.jsx 404-page fix.
- Keep all translation keys that exist; only add new ones.
- Keep RTL behaviour. Anything visual that needs RTL flipping should be addressed.
- Do not introduce Tailwind. Stick to React-Bootstrap + custom CSS.
- Do not introduce new icon libraries unless you also rewrite the imports.
- Avoid any horizontal scroll on mobile for client pages.
- Admin pages should remain functional and information-dense — they shouldn't get the editorial treatment at the cost of usability.

START BY RE-EXAMINING the existing files, then produce the redesign. Do not skip a single page or component. Do not give me a half-finished redesign.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d2937b3c-96e4-4158-8b0c-a18b20814410).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
