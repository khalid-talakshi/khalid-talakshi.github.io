# Documentation

This folder contains all project documentation, organized by type and purpose.

## 📚 Documentation Structure

```
docs/
├── README.md                          # This file - documentation index
├── guides/                            # Step-by-step guides and tutorials
│   ├── READING_TIME_GUIDE.md         # Reading time calculation system
│   ├── COLOR_MAPPING_GUIDE.md        # Color mapping and theming
│   ├── COLOR_SCALE_GUIDE.md          # Color scale implementation
│   ├── TRACE_FORMAT_GUIDE.md         # Trace format specification
│   └── ECHARTS_MIGRATION_GUIDE.md    # ECharts migration from Recharts
├── references/                        # Reference documentation and API docs
│   ├── COLOR_MAPPING_QUICK_START.md  # Quick start for color mapping
│   ├── TRACE_FORMAT_QUICK_START.md   # Quick start for trace format
│   ├── ECHARTS_ONLY_REFERENCE.md     # ECharts reference documentation
│   ├── RECHARTS_REMOVAL_SUMMARY.md   # Recharts removal summary
│   └── IMPLEMENTATION_COMPLETE.md    # Implementation completion report
├── migrations/                        # Migration guides and notes
│   └── (migration-specific docs)
└── checklists/                        # Checklists and task lists
    └── MIGRATION_CHECKLIST.md        # Migration checklist
```

## 🗂️ Documentation Categories

### 📖 Guides (`/guides`)

Step-by-step guides and comprehensive tutorials for implementing features.

**Current Guides:**
- **READING_TIME_GUIDE.md** - How to use the reading time calculation system
  - Configuration options
  - API reference
  - Usage examples
  - Troubleshooting

- **COLOR_MAPPING_GUIDE.md** - Color mapping and theming system
  - Color palette setup
  - Mapping configuration
  - Implementation details

- **COLOR_SCALE_GUIDE.md** - Color scale implementation
  - Scale types and usage
  - Configuration
  - Examples

- **TRACE_FORMAT_GUIDE.md** - Trace format specification
  - Format definition
  - Usage guidelines
  - Examples

- **ECHARTS_MIGRATION_GUIDE.md** - Migrating from Recharts to ECharts
  - Migration steps
  - Component updates
  - Configuration changes

### 📋 References (`/references`)

Quick reference materials, API documentation, and implementation reports.

**Current References:**
- **COLOR_MAPPING_QUICK_START.md** - Quick start for color mapping
- **TRACE_FORMAT_QUICK_START.md** - Quick start for trace format
- **ECHARTS_ONLY_REFERENCE.md** - ECharts API reference
- **RECHARTS_REMOVAL_SUMMARY.md** - Summary of Recharts removal
- **IMPLEMENTATION_COMPLETE.md** - Implementation completion report

### 🔄 Migrations (`/migrations`)

Documentation specific to migrations and version upgrades.

**Current Migrations:**
- (To be populated as migrations occur)

### ✅ Checklists (`/checklists`)

Task lists and checklists for complex processes.

**Current Checklists:**
- **MIGRATION_CHECKLIST.md** - Comprehensive migration checklist

## 🎯 How to Use This Documentation

### Finding Documentation

1. **Looking for a how-to guide?** → Check `/guides`
2. **Need quick reference?** → Check `/references`
3. **Planning a migration?** → Check `/migrations` and `/checklists`
4. **Need API details?** → Check `/references`

### Documentation Standards

All documentation should follow these standards:

#### Structure
```markdown
# Title

## Overview
Brief description of what this doc covers

## Table of Contents
(if document is long)

## Main Content
Organized with clear headings

## Examples
Code examples and usage

## Troubleshooting
Common issues and solutions

## References
Links to related docs
```

#### Formatting
- Use clear, concise language
- Include code examples where applicable
- Use tables for comparisons
- Include diagrams/ASCII art for complex concepts
- Add "Last Updated" date at bottom

#### Metadata
Every doc should include at the bottom:
```markdown
---
**Last Updated:** [Date]
**Category:** [guides|references|migrations|checklists]
**Related Docs:** [Links to related documentation]
```

## 📝 Adding New Documentation

When adding new AI-generated documentation:

1. **Determine the category:**
   - How-to or tutorial? → `/guides`
   - Reference or API docs? → `/references`
   - Migration-related? → `/migrations`
   - Checklist or task list? → `/checklists`

2. **Follow the naming convention:**
   - Use UPPER_SNAKE_CASE for filenames
   - Be descriptive (e.g., `FEATURE_NAME_GUIDE.md`)

3. **Include metadata:**
   - Add "Last Updated" date
   - Link to related documentation
   - Specify category

4. **Update this index:**
   - Add entry to appropriate section
   - Update the directory tree if structure changes

## 🔗 Quick Links

### Getting Started
- [Reading Time Guide](guides/READING_TIME_GUIDE.md) - Calculate reading time for blog posts
- [Color Mapping Quick Start](references/COLOR_MAPPING_QUICK_START.md) - Quick color setup

### Implementation References
- [ECharts Reference](references/ECHARTS_ONLY_REFERENCE.md) - ECharts API and configuration
- [Trace Format Quick Start](references/TRACE_FORMAT_QUICK_START.md) - Trace format basics

### Migration Resources
- [ECharts Migration Guide](guides/ECHARTS_MIGRATION_GUIDE.md) - Migrate from Recharts
- [Migration Checklist](checklists/MIGRATION_CHECKLIST.md) - Step-by-step migration tasks

## 📊 Documentation Statistics

- **Total Documents:** 13
- **Guides:** 5
- **References:** 5
- **Migrations:** 0
- **Checklists:** 1
- **Total Lines:** ~3,000+

## 🎓 Best Practices

✅ **Do:**
- Keep docs up-to-date with code changes
- Include practical examples
- Link to related documentation
- Use clear, descriptive titles
- Add table of contents for long docs
- Include troubleshooting sections

❌ **Don't:**
- Leave outdated information
- Mix multiple topics in one doc
- Forget to update the index
- Use vague titles
- Skip examples
- Ignore formatting standards

## 🔄 Maintenance

Documentation should be reviewed and updated:
- When features are added or changed
- When bugs are fixed
- When new best practices are discovered
- Quarterly for general review

## 📞 Contributing

When contributing documentation:
1. Follow the structure and formatting standards
2. Place in appropriate category folder
3. Update this README with new entries
4. Include metadata at bottom of document
5. Link to related documentation

## 🗂️ Related Files

- **Project README:** `../README.md` - Project overview
- **AGENTS.md:** `../AGENTS.md` - Agent configuration and instructions
- **Source Code:** `../src/` - Implementation code

---

**Last Updated:** April 27, 2026  
**Maintained By:** AI Documentation System  
**Total Docs:** 13
