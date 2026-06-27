/**
 * LOOKBOOK config (doc §7.4 / §2.2). The PDF itself is a [To supply] asset, so
 * the gate is honesty-flagged: while `available` is false it captures interested
 * emails as leads and promises to send the lookbook "when it's ready" (no fake
 * download); flip `available` + set `url` once RGL supplies the PDF, and the same
 * gate instantly returns the download.
 */
export const LOOKBOOK = {
  available: false,
  url: null as string | null,
  title: 'The RGL Lookbook',
  blurb: 'Ten of our favourite homes, our design philosophy and the team behind them — in one PDF.',
}
