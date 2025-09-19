# Featured Cards Implementation Guide for Quartz

This guide documents how to implement featured cards functionality in a Quartz project, showing featured notes with `featured: true` frontmatter on the index page.

## Files Created/Modified

### 1. Create FeaturedCards Component
**File:** `quartz/components/custom/FeaturedCards.tsx`

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const FeaturedCards: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  const featuredPages = allFiles.filter((file) => file.frontmatter?.featured)

  return (
    <div className="card-grid">
      {featuredPages.map((page) => {
        const { title, description, image } = page.frontmatter!
        const cardStyle = image ? { "--card-bg": `url(${image})` } : {}

        return (
          <a href={page.slug!} className={`card-container ${image ? "has-image" : "no-image"}`} style={cardStyle}>
            <div className="card-bg"></div>
            <div className="card-content">
              <h3>{title}</h3>
              <p>{description as string}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default (() => FeaturedCards) satisfies QuartzComponentConstructor
```

### 2. Create Index Page Component
**File:** `quartz/components/pages/IndexPage.tsx`

```tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import FeaturedCards from "../custom/FeaturedCards"

const IndexPage: QuartzComponent = ({ fileData, tree, ...props }: QuartzComponentProps) => {
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")

  const FeaturedCardsComponent = FeaturedCards()

  return (
    <div className={classString}>
      <h1 className="featured-cards-title">🎁 Featured Notes</h1>
      <FeaturedCardsComponent {...props} fileData={fileData} tree={tree} />
    </div>
  )
}

export default (() => IndexPage) satisfies QuartzComponentConstructor
```

### 3. Add Styles
**File:** `quartz/styles/custom.scss`

```scss
/* === Styles for Featured Cards === */

.featured-cards-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.card-container {
  display: block;
  position: relative;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--darkgray);
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 100px;
  z-index: 0;
}

.card-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--card-bg);
  background-size: cover;
  background-position: center;
  transition: all 0.4s ease;
}

.card-container.has-image .card-bg {
  filter: blur(4px) brightness(0.6);
  transform: scale(1.05);
}

.card-container.has-image:hover .card-bg {
  filter: blur(0px) brightness(0.8);
  transform: scale(1);
}

.card-container.no-image .card-bg {
  background: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #3B82F6 100%);
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  color: #FFFFFF !important;
  font-size: 1.25rem;
}

.card-content p {
  margin: 0;
  color: #E5E7EB !important;
  font-size: 0.9rem;
}
```

### 4. Register IndexPage Component
**File:** `quartz/components/index.ts`

Add the import:
```tsx
import IndexPage from "./pages/IndexPage"
```

Add to exports:
```tsx
export {
  // ... other exports
  IndexPage,
  // ... rest of exports
}
```

### 5. Configure Layout
**File:** `quartz.layout.ts`

Modify the `defaultContentPageLayout` to use IndexPage for the index page:

```tsx
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.IndexPage(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  // ... rest of layout
}
```

## Markdown File Setup

### Frontmatter Format
Add these fields to your markdown files:

```yaml
---
title: "Your Title"
description: "Your description"
featured: true
priority: 0                # Optional: lower numbers appear first (0 = highest priority)
image: "image-filename.png"  # Use slugified filename (spaces → hyphens)
---
```

### Image Path Formats

**Local images:** Use the slugified filename (Quartz converts spaces to hyphens):
```yaml
image: "Pasted-image-20240203115400.png"  # Not "Pasted image 20240203115400.png"
```

**Remote images:** Use full URLs:
```yaml
image: "https://example.com/image.png"
```

## Key Points

1. **Image Processing:** Quartz's asset system automatically slugifies filenames (spaces become hyphens)
2. **Layout Integration:** Use `ConditionalRender` to show IndexPage only on the index page
3. **No Content Duplication:** IndexPage component doesn't render content - the layout handles that separately
4. **Filtering:** Featured cards automatically filter files with `featured: true` frontmatter
5. **Priority Sorting:** Cards with `priority` field appear first (lower numbers first), cards without priority appear after in random order
6. **Responsive Design:** Cards use CSS Grid with responsive columns

## Common Issues & Solutions

1. **Images not showing:** Check that image paths match the slugified filenames in the `public/` directory
2. **Duplicated content:** Ensure IndexPage component doesn't render content - let the layout handle it
3. **Cards not appearing:** Verify frontmatter has `featured: true` and the component is properly registered
4. **Broken links:** Use `page.slug!` directly instead of `resolveRelative` for card links