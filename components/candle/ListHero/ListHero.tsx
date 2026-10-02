import { filtersFor, type ListKind } from '../../../utils/listParams'
import { getListCounts } from '../../../queries/getListCounts'
import HomeHero from '../HomeHero/HomeHero'
import ListPills from './ListPills'

// The top of a list page: a short photo hero (the photo follows the
// visitor's tradition), the title, and one row of glass filter pills
// with counts. The tradition choice itself is in the site footer.
const ListHero = async ({
  kind,
  title,
  subtitle,
  filter,
}: {
  kind: ListKind
  title: string
  subtitle: string
  filter: string
}) => (
  <HomeHero
    size="short"
    title={title}
    subtitle={subtitle}
    filters={
      <ListPills
        kind={kind}
        title={title}
        filter={filter}
        filters={filtersFor(kind)}
        counts={await getListCounts(kind)}
      />
    }
  />
)

export default ListHero
