# Featured Cards Features Summary

## Overview
The featured cards system displays notes with `featured: true` frontmatter on the index page in an elegant horizontal carousel layout.

## Layout & Design
- **Horizontal Carousel**: Cards display in a scrollable row instead of a grid
- **Fixed Dimensions**: Each card is 320px wide × 200px tall for consistency
- **Responsive Design**: Adjusts to 280px × 180px on mobile devices
- **Custom Scrollbar**: Styled scrollbar matching the theme colors
- **Smooth Scrolling**: Enhanced user experience with smooth scroll behavior

## Visual Effects
- **Hover Animation**: Cards lift up (-8px) and slightly scale (1.02x) on hover
- **Enhanced Shadows**: Progressive shadow effects for depth
- **Background Images**: Support for custom images with brightness adjustment
- **Gradient Fallback**: Beautiful gradient backgrounds for cards without images
- **Rounded Corners**: Modern 12px border radius

## Content Display

### Main Content (Center)
- **Title**: Large, bold text (1.4rem) with text shadow
- **Description**: Readable subtitle (1rem) with proper line height

### Reading Time (Upper Right)
- **Calculation**: Automatic reading time estimation using content analysis
- **Display**: Shows as "X min read" format
- **Styling**: Semi-transparent dark badge with backdrop blur
- **Positioning**: Absolute positioned in upper right corner

### Metadata (Bottom)
- **Date (Left)**: Last modified date in "MMM DD, YYYY" format
- **Tags (Right)**: Up to 3 tags displayed as pill-shaped badges
- **Tag Overflow**: "+N" indicator when more than 3 tags exist
- **Layout**: Horizontal flex layout with space-between alignment

## Interactive Features
- **Clickable Cards**: Entire card acts as a link to the note
- **Hover Effects**: Smooth transitions for all interactive elements
- **Scroll Navigation**: Horizontal scrolling to view all featured cards

## Technical Implementation
- **Filter System**: Automatically finds files with `featured: true` frontmatter
- **Priority Sorting**: Cards with `priority` field appear first (lower numbers first), cards without priority appear after in random order
- **Image Support**: Handles both local images (slugified paths) and remote URLs
- **Typography**: Custom font weights and text shadows for optimal readability
- **Accessibility**: Proper semantic markup and keyboard navigation support

## Required Frontmatter
```yaml
---
title: "Note Title"
description: "Brief description"
featured: true
priority: 0                # Optional: lower numbers appear first (0 = highest priority)
image: "optional-image.png"  # Optional
tags: ["tag1", "tag2"]       # Optional
---
```

## Browser Compatibility
- **Modern Browsers**: Full support for all features
- **Backdrop Filter**: Graceful degradation for older browsers
- **Flex Layout**: Widely supported horizontal carousel functionality
- **CSS Grid Fallback**: Mobile-first responsive design principles

## Performance Considerations
- **Efficient Filtering**: Only processes files with featured frontmatter
- **Lazy Evaluation**: Reading time calculated only for featured cards
- **Optimized Animations**: Hardware-accelerated transforms for smooth performance
- **Minimal Bundle**: Reuses existing Quartz components and utilities