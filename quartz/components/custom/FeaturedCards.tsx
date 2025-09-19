import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { formatDate, getDate } from "../Date"
import readingTime from "reading-time"

const FeaturedCards: QuartzComponent = ({ allFiles, cfg }: QuartzComponentProps) => {
  const featuredPages = allFiles.filter((file) => file.frontmatter?.featured)

  return (
    <div className="card-grid">
      {featuredPages.map((page) => {
        const { title, description, image, tags } = page.frontmatter!
        const cardStyle = image ? { "--card-bg": `url(${image})` } : {}
        const modifiedDate = getDate(cfg, page)

        // Calculate reading time
        const readingTimeStats = page.text ? readingTime(page.text) : null
        const readingMinutes = readingTimeStats ? Math.ceil(readingTimeStats.minutes) : null

        return (
          <a href={page.slug!} className={`card-container ${image ? "has-image" : "no-image"}`} style={cardStyle}>
            <div className="card-bg"></div>
            {readingMinutes && (
              <div className="card-reading-time">
                {readingMinutes} min read
              </div>
            )}
            <div className="card-content">
              <div className="card-main">
                <h3>{title}</h3>
                <p>{description as string}</p>
              </div>
              <div className="card-meta">
                {modifiedDate && (
                  <span className="card-date">
                    {formatDate(modifiedDate)}
                  </span>
                )}
                {tags && tags.length > 0 && (
                  <div className="card-tags">
                    {tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="card-tag">
                        {tag}
                      </span>
                    ))}
                    {tags.length > 3 && (
                      <span className="card-tag card-tag-more">
                        +{tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default (() => FeaturedCards) satisfies QuartzComponentConstructor