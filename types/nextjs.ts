export type NextPageProps<T = {}> = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    [key: string]: string | undefined
  }>
} & T

export type searchParams = {
  [key: string]: string | undefined
}
