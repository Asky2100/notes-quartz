import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import FeaturedCards from "../custom/FeaturedCards"

const IndexPage: QuartzComponent = ({ fileData, tree, ...props }: QuartzComponentProps) => {
  // Only render on the index page
  if (fileData.slug !== "index") {
    return <></>
  }

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