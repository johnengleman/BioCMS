import { getSaintSlugs } from '../../../../queries/getSaintSlugs'
import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../../utils/saintMetadata'
import { getSaint } from '../../../../queries/getSaint'
import {
  getChapters,
  getMiracleBook,
  isApproved,
  splitSaintName,
} from '../../../../utils/saintContent'
import { LuBookMarked, LuInfo } from 'react-icons/lu'
import StatusPill from '../../../../components/candle/StatusPill/StatusPill'
import GroupMore from '../../../../components/candle/GroupMore/GroupMore'
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

import { NextPageProps } from '../../../../types/nextjs'

// Built ahead of time and refreshed every four minutes. Saints not
// built yet are built on the first visit.
export const revalidate = 240
export const generateStaticParams = async () =>
  (await getSaintSlugs()).map((slug) => ({ slug }))

export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug } = await props.params
  return saintMetadata(slug, 'miracles')
}

const LONG_NAME = 28
// Short lists need no search box.
const SEARCH_FROM = 10

// Long groups show this many accounts until opened.
const GROUP_SHOWN = 6

const SaintMiracles = async (props: NextPageProps) => {
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
      <SiteHeader active="/miracles" />
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
          aside={
            entries.some((e) => e.status) && (
              <div className={list.legend}>
                <p className={list.legendTitle}>
                  What the labels mean
                </p>
                <div>
                  <StatusPill
                    status="approved"
                    short
                  />
                  Examined and approved by the Church.
                </div>
                <div>
                  <StatusPill
                    status="sworn at a Church process"
                    short
                  />
                  Given under oath at a Church process.
                </div>
                <div>
                  <StatusPill
                    status="reported"
                    short
                  />
                  A report. The label says who made it.
                </div>
              </div>
            )
          }
        >
          {intro && (
            <div className={list.note}>
              <span
                className={list.noteIcon}
                aria-hidden="true"
              >
                <LuInfo />
              </span>
              <div>
                <b>How to read this list</b>
                <div dangerouslySetInnerHTML={{ __html: intro }} />
              </div>
            </div>
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
                      <div>
                        {titledGroups.length > 1 && (
                          <p className={list.groupEyebrow}>
                            Group {g + 1} of {groups.length}
                          </p>
                        )}
                        <h2 id={group.id}>{group.title}</h2>
                      </div>
                      <span
                        className={list.groupCount}
                        aria-label={plural(
                          group.entries.length,
                          'account',
                          'accounts',
                        )}
                      >
                        {group.entries.length}
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
                    {group.entries.map((entry, e) => (
                      <li
                        key={entry.id || entry.number}
                        className={`${list.entry} ${
                          isApproved(entry.status)
                            ? list.approvedEntry
                            : ''
                        } ${e >= GROUP_SHOWN ? list.extra : ''}`}
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
                            <div className={list.status}>
                              <StatusPill status={entry.status} />
                            </div>
                          )}
                          {entry.source && (
                            <p className={list.source}>
                              <LuBookMarked aria-hidden="true" />
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: `<span class="visually-hidden">Source: </span>${entry.source}`,
                                }}
                              />
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  {group.entries.length > GROUP_SHOWN && (
                    <GroupMore total={group.entries.length} />
                  )}
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
