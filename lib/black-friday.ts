/**
 * Black Friday 2026 specials on the Nixa homepage.
 *
 * The takeover switches itself off at the cutoff in two places:
 *   - in the browser, the moment the countdown reaches zero, and
 *   - on the server, where the homepage revalidates every few minutes and
 *     stops rendering the specials (and the sale metadata) after `endsAt`.
 *
 * Preview overrides while the sale is running: `?bf=on` forces the specials,
 * `?bf=off` shows the page as it will look after the sale.
 */
export const blackFriday = {
  // Friday, November 27, 2026 at 11:59:59 PM Central (CST = UTC-6).
  endsAt: Date.UTC(2026, 10, 28, 5, 59, 59),
  endsLabel: 'Friday, Nov 27',

  // Nixa tickets are sold through HauntPay (an external site, so links open in a new tab).
  ticketsUrl: 'https://app.hauntpay.com/events/FOSNixa2027-season-pass',

  title: 'Black Friday Specials | Field of Screams Nixa',
  description:
    'Black Friday specials end Friday, November 27 at 11:59 PM CT: $20 general admission at Field of Screams Nixa and the $99 2027 Season Pass for Nixa and Branson.',
  ogImage: {
    url: '/images/black-friday/bf-nixa-ga-20.jpg',
    width: 1200,
    height: 1200,
    alt: 'Field of Screams Nixa Black Friday Special: $20 general admission ticket',
  },
} as const

/** Title restored in the browser if the sale ends while the page is open. */
export const comingSoonTitle = 'Field of Screams Nixa | 2027 Season Coming Soon'

export const isBlackFridayLive = (now: number = Date.now()) => now < blackFriday.endsAt

/**
 * Runs before the page paints and sets the state classes on <html>:
 * .bf-live while the sale runs, plus .bf-intro when the smoke intro should play.
 */
export const blackFridayStateScript = `(function(d){
var c=d.documentElement.classList,q=location.search,END=${blackFriday.endsAt};
var live=/[?&]bf=on\\b/.test(q)||(!/[?&]bf=off\\b/.test(q)&&Date.now()<END);
if(!live){c.add('bf-ended');return;}
c.add('bf-live');
if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
c.add('bf-intro');
/* Never leave the specials hidden if the effects code fails to load. */
setTimeout(function(){if(!window.__bfStarted)c.remove('bf-intro');},5000);
}
})(document);`
