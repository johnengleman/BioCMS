import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../../utils/saintMetadata'
import { getSaint } from '../../../../queries/getSaint'
import {
  getChapters,
  getMiracleBook,
  splitSaintName,
} from '../../../../utils/saintContent'
import SiteHeader from '../../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../../components/candle/SiteFooter/SiteFooter'
import MiracleSearch from '../../../../components/candle/MiracleSearch/MiracleSearch'
import {
  NextCards,
  NotesCard,
  ReadingHeader,
  ReadingLayout,
  plural,
} from '../../../../components/candle/Reading/ReadingParts'
import styles from '../../../../components/candle/Reading/reading.module.scss'
import list from '../../../../components/candle/Reading/miracles.module.scss'

export const runtime = 'edge'

import { NextPageProps } from '../../../../types/nextjs'

export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug } = await props.params
  return saintMetadata(slug, 'miracles')
}

const LONG_NAME = 28
// Short lists need no search box.
const SEARCH_FROM = 10

// Approvals for someone else (e.g. her parents) say "not attributed".
const isApproved = (status?: string) =>
  /^approved/i.test(status || '') &&
  !/not attributed/i.test(status || '')

const SaintMiracles = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const { slug } = await props.params

  const data = await getSaint(slug)
  if (!data) notFound()

  const base = `/saints/${slug}`
  const { intro, groups, backMatter } = getMiracleBook(
    data.miracles?.[0]?.miracles,
  )
  const entries = groups.flatMap((g) => g.entries)
  const approved = entries.filter((e) =>
    isApproved(e.status),
  ).length
  const titledGroups = groups.filter((g) => g.title)
  const chapters = getChapters(data.biography)
  const teachings = getChapters(
    data.teachings?.[0]?.teachings,
  )

  const parts = splitSaintName(data.name)
  const title =
    data.name.length > LONG_NAME ? parts.title : data.name

  const meta = [
    entries.length
      ? plural(entries.length, 'account', 'accounts')
      : '',
    approved ? `${approved} approved by the Church` : '',
    titledGroups.length > 1
      ? `${titledGroups.length} groups`
      : '',
  ].filter(Boolean)

  const contents = [
    ...titledGroups
      .filter((g) => g.id)
      .map((g) => ({
        id: g.id,
        title: `${g.title} (${g.entries.length})`,
      })),
    ...backMatter
      .filter((s) => s.id)
      .map((s) => ({
        id: s.id,
        title: s.title,
        numbered: false,
      })),
  ]

  const next = [
    chapters.length && {
      href: `${base}/biography`,
      label: 'Life',
      detail: plural(
        chapters.length,
        'chapter',
        'chapters',
      ),
    },
    teachings.length && {
      href: `${base}/teachings`,
      label: 'Teachings',
      detail: plural(
        teachings.length,
        'section',
        'sections',
      ),
    },
    { href: base, label: 'Overview', detail: title },
  ].filter(Boolean) as {
    href: string
    label: string
    detail: string
  }[]

  return (
    <div className={styles.page}>
      <SiteHeader
        searchParams={searchParams}
        active="/miracles"
      />
      <main>
        <ReadingHeader
          eyebrow="The miracles of"
          title={title}
          meta={meta}
          image={data.profile_image}
          backHref={base}
        />
        <ReadingLayout
          contents={contents}
          contentsTitle="In this list"
        >
          {intro && (
            <div
              className={styles.prose}
              dangerouslySetInnerHTML={{ __html: intro }}
            />
          )}

          {entries.length >= SEARCH_FROM && (
            <MiracleSearch total={entries.length} />
          )}

          {entries.length > 0 ? (
            <div id="miracle-list">
              {groups.map((group, g) => (
                <section
                  key={group.id || g}
                  className={list.group}
                  data-group
                >
                  {group.title && (
                    <div className={list.groupHeader}>
                      <h2 id={group.id}>{group.title}</h2>
                      <span className={list.groupCount}>
                        {plural(
                          group.entries.length,
                          'account',
                          'accounts',
                        )}
                      </span>
                    </div>
                  )}
                  {group.intro && (
                    <div
                      className={list.groupIntro}
                      dangerouslySetInnerHTML={{
                        __html: group.intro,
                      }}
                    />
                  )}
                  <ol className={list.entries}>
                    {group.entries.map((entry) => (
                      <li
                        key={entry.id || entry.number}
                        className={list.entry}
                        data-miracle
                      >
                        <span
                          className={list.number}
                          aria-hidden="true"
                        >
                          {entry.number}
                        </span>
                        <div>
                          <h3 id={entry.id}>
                            {entry.title}
                          </h3>
                          <div
                            className={list.body}
                            dangerouslySetInnerHTML={{
                              __html: entry.html,
                            }}
                          />
                          {entry.status && (
                            <span
                              className={`${list.status} ${
                                isApproved(entry.status)
                                  ? list.approved
                                  : ''
                              }`}
                            >
                              {entry.status}
                            </span>
                          )}
                          {entry.source && (
                            <p
                              className={list.source}
                              dangerouslySetInnerHTML={{
                                __html: `Source: ${entry.source}`,
                              }}
                            />
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          ) : (
            <p className="emptyState">
              No miracle accounts have been added for this
              saint yet.
            </p>
          )}

          <NotesCard sections={backMatter} />
          <NextCards cards={next} />
        </ReadingLayout>
      </main>
      <SiteFooter />
    </div>
  )
}

export default SaintMiracles
