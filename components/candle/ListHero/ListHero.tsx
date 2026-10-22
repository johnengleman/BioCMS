import { filtersFor, type ListKind } from '../../../utils/listParams'
import { getListCounts } from '../../../queries/getListCounts'
import NightHero from '../NightHero/NightHero'
import ListPills from './ListPills'

// The top of a list page: a night band with the title and one row of
// filter pills with counts. The tradition choice is in the site footer.
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
  <NightHero
    title={title}
    subtitle={subtitle}
  >
    <ListPills
      kind={kind}
      title={title}
      filter={filter}
      filters={filtersFor(kind)}
      counts={await getListCounts(kind)}
    />
  </NightHero>
)

export default ListHero
