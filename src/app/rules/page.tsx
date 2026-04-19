import Link from "next/link";

export const metadata = {
  title: "Rules & Regulations | Sugar Sands Hunting Preserve | South Walton FL",
  description: "Rules, regulations, and safety guidelines for members of Sugar Sands Hunting Preserve — a private hunting club in Watersound, South Walton, Florida.",
};

const HUNTSTAND_URL = "https://app.huntstand.com/dl2/share_huntarea?guid=8fd9b03b-35ff-4558-ba81-17656047bc77&huntarea_name=Sugar%20Sands%20Hunting%20Preserve&inviter=heathporter2155@gmail.com";

export default function RulesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 bg-pine-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-earth-400 tracking-[0.3em] uppercase text-sm font-body font-medium mb-4">
            Member Guidelines
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-50 tracking-tight">
            Rules & Regulations
          </h1>
          <p className="mt-4 font-display text-xl text-cream-200/80 italic">
            Safety, respect, and stewardship guide everything we do
          </p>
        </div>
      </section>

      {/* Huntstand Sign-In CTA */}
      <section className="bg-earth-700 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-cream-50 font-display font-semibold text-lg">
              📋 Virtual Sign-In Board
            </p>
            <p className="text-cream-200/80 text-sm">
              All members must sign in before entering the preserve
            </p>
          </div>
          <a
            href={HUNTSTAND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-pine-800 text-cream-50 font-display font-semibold rounded-sm hover:bg-pine-700 transition-colors whitespace-nowrap"
          >
            Sign In on HuntStand
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* Rules Content */}
      <section className="aged-paper py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="section-heading mb-8">Club Rules</h2>
            <div className="space-y-4">
              {[
                "Gates must be kept locked at all times — no exceptions. If you have a guest or family member en route, meet them at the gate. Do not leave gates open or unlocked.",
                "Do not drive around gates or make new trails leading into or off our lease. Our boundaries are our first line of defense.",
                "During hunting season, all members are required to sign in via our virtual sign-in board on the HuntStand app.",
                "We will follow all FWC rules and regulations pertaining to hunting whitetail deer. We do not enforce antler restrictions above and beyond FWC guidelines as to improve the quality of the hunt for our guests and children. Having said that, it is the responsibility of the primary members to lead by example and strive to harvest quality whitetail. Turkey hunting is only allowed during spring season, shotgun only, and no baiting.",
                "All members, guests, and family members must have in possession a valid Florida hunting license and appropriate permits if applicable.",
                "All guests and family members must be accompanied by the respective primary member at all times while on the property. No member shall bring more than one guest per visit. Members are responsible for the conduct of their guests at all times.",
                "All game must be checked on the website within 24 hours of harvest. Uploaded pictures to our photo album are encouraged.",
                "No hunting under the influence of drugs or alcohol.",
                "Know your target and what lies beyond!",
                "Respect fellow hunters, be safe, and have fun!",
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 p-4 bg-cream-100 border border-earth-200 rounded-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-pine-700 text-cream-50 rounded-full flex items-center justify-center font-display font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-bark-700 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Requirements */}
          <div className="mb-16">
            <h2 className="section-heading mb-8">Safety Requirements</h2>
            <div className="bg-red-50 border border-red-200 rounded-sm p-6 mb-6">
              <p className="text-red-800 font-display font-semibold text-lg mb-2">
                ⚠️ Safety is Non-Negotiable
              </p>
              <p className="text-red-700 text-sm">
                Violation of any safety rule may result in immediate and permanent revocation of membership.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Hunter orange must be worn during all gun seasons as required by FWC regulations.",
                "All firearms must be unloaded when transported in vehicles on the property.",
                "Know your target and what is beyond it. No shooting toward roads, structures, or other stands.",
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 p-4 bg-cream-100 border border-earth-200 rounded-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-700 text-cream-50 rounded-full flex items-center justify-center font-display font-bold text-sm">
                    !
                  </span>
                  <p className="text-bark-700 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Property & Stewardship */}
          <div className="mb-16">
            <h2 className="section-heading mb-8">Property & Stewardship</h2>
            <div className="space-y-4">
              {[
                "No littering. Pack out everything you bring in.",
                "No cutting of live trees without administrator approval.",
                "Food plots are maintained for wildlife — no unauthorized planting or modification.",
                "All gates must be closed and locked after entry and exit.",
                "Report any property damage, trespassing, or suspicious activity to the administrator immediately.",
              ].map((rule, i) => (
                <div key={i} className="flex gap-4 p-4 bg-cream-100 border border-earth-200 rounded-sm">
                  <span className="flex-shrink-0 w-8 h-8 bg-earth-600 text-cream-50 rounded-full flex items-center justify-center font-display font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-bark-700 leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Huntstand CTA */}
      <section className="bg-pine-950 py-16 px-4 text-center">
        <h2 className="font-display text-3xl font-bold text-cream-50 mb-4">
          Ready to Head Out?
        </h2>
        <p className="text-cream-200/70 mb-8">
          Don&apos;t forget to sign in before you enter the preserve.
        </p>
        <a
          href={HUNTSTAND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-lg"
        >
          Open HuntStand Sign-In Board →
        </a>
      </section>
    </>
  );
}
