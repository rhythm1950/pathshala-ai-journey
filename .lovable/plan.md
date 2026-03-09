

## Fix: Header responsive issues for logged-in users

### Problem
When a user is logged in, the right-side action bar contains 6 items (language switcher, theme toggle, notifications bell, help icon, avatar dropdown, hamburger menu). On mobile screens, these overflow and crowd the header since they all render regardless of screen size.

### Solution

**1. Hide non-essential icons on mobile for logged-in users**
- Hide the **Help** button on mobile (`hidden sm:inline-flex`) — it can be accessed from the mobile menu instead
- Hide the language label text on mobile (already done with `hidden sm:inline`, but also hide the chevron arrow on small screens)
- Reduce gaps between action buttons on mobile

**2. Compact the language switcher on mobile**
- Hide the dropdown chevron arrow on small screens to save space

**3. Add logged-in user actions to the mobile menu**
- Add **Profile**, **Settings**, **Notifications**, **Help**, and **Sign Out** links inside the mobile hamburger menu so hidden items remain accessible
- Show user info (name/email + role) at the top of the mobile menu

**4. Minor spacing tweaks**
- Reduce `gap-1.5` to `gap-1` on the right-side actions container on mobile
- Use `gap-1 sm:gap-1.5` for adaptive spacing

### Files to modify
- `src/components/layout/Header.tsx` — all changes in this single file

