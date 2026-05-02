<!-- Context: project-intelligence/wizard | Priority: high | Version: 1.0 | Updated: 2026-04-26 -->

# Project Intelligence Wizard Guide

Interactive 6-question wizard for teaching agents YOUR coding patterns.

## Quick Start

```bash
/add-context                 # Interactive wizard
/add-context --update        # Update existing patterns
/add-context --tech-stack    # Update tech stack only
```

## The 6 Questions

**Q1: Tech Stack** - What technologies? (e.g., Astro + TypeScript + PostgreSQL + Tailwind)

**Q2: API Pattern** - Paste an API endpoint from YOUR project

**Q3: Component Pattern** - Paste a component from YOUR project

**Q4: Naming Conventions** - Files, components, functions, database naming

**Q5: Code Standards** - Standards your project follows (e.g., TypeScript strict, Zod validation)

**Q6: Security Requirements** - Security practices (e.g., input validation, HTTPS only)

## Workflow

1. **Detect**: Checks if `technical-domain.md` exists
2. **Review** (if exists): Keep/Update/Remove each pattern
3. **Ask**: 6 questions with examples
4. **Generate**: Creates `technical-domain.md` with your patterns
5. **Validate**: Checks MVI compliance (<200 lines)
6. **Confirm**: Shows success and next steps

## Update Modes

| Mode            | Command                     | Use Case                   |
| --------------- | --------------------------- | -------------------------- |
| Full Wizard     | `/add-context`              | First time or major update |
| Review & Update | `/add-context --update`     | Review each pattern        |
| Tech Stack Only | `/add-context --tech-stack` | Quick tech update          |
| Patterns Only   | `/add-context --patterns`   | Update code patterns       |

## MVI Compliance

All files follow MVI standards:

- **<200 lines**: Scannable in <30 seconds
- **Frontmatter**: HTML comment with metadata
- **Codebase References**: Links context to actual code
- **Priority**: critical (80%), high (15%), medium (4%), low (1%)
- **Version Tracking**: 1.0 (new), MINOR (1.1, 1.2), MAJOR (2.0)

## Version Tracking

- **New file**: Version 1.0
- **Content update**: MINOR bump (1.0 → 1.1 → 1.2)
- **Structure change**: MAJOR bump (1.2 → 2.0)

## External Context Files

If `.tmp/` contains external context files:

```bash
# Option 1: Ignore and continue
/add-context

# Option 2: Harvest first
/context harvest
# Then: /add-context
```

## Examples

### First Time

```bash
/add-context
# Q1: Astro 6 + TypeScript + PostgreSQL + Tailwind
# Q2-6: [answer questions]
✅ Created: technical-domain.md (160 lines)
```

### Update Tech Stack

```bash
/add-context --tech-stack
# Current: Astro 6 + TypeScript + PostgreSQL + Tailwind
# New: Astro 6 + TypeScript + PostgreSQL + Tailwind + ECharts
✅ Updated: Version 1.1 → 1.2
```

### Review & Update

```bash
/add-context --update
# Pattern 1: Tech Stack → Update
# Pattern 2-6: Keep
✅ Updated: Version 1.2 → 1.3
```

## File Structure

```
.opencode/context/project-intelligence/
├── navigation.md              # Quick overview
├── wizard-guide.md            # This file
├── technical-domain.md        # Tech stack & patterns
├── business-domain.md         # Business context
├── business-tech-bridge.md    # Business → technical
├── decisions-log.md           # Decision history
└── living-notes.md            # Active issues
```

## Tips

- **Keep Simple**: Focus on most common patterns
- **Use Real Examples**: Paste actual code from YOUR project
- **Update Regularly**: Run `/add-context --update` when patterns change
- **Test After**: Build something simple to verify agents use patterns

## Troubleshooting

**Q: Agents not using patterns?**
A: Check file exists, <200 lines. Run `/context validate`

**Q: See what's in context?**
A: `cat .opencode/context/project-intelligence/technical-domain.md`

**Q: Update patterns?**
A: Run `/add-context --update` or edit file directly

**Q: Share with team?**
A: Commit `.opencode/context/project-intelligence/` to git

**Q: External context files in .tmp/?**
A: Run `/context harvest` to extract and organize them

## Related Commands

- `/context` - Manage context files
- `/context validate` - Check integrity
- `/context map` - View structure
- `/context harvest` - Extract external context files
