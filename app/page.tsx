import { BirthdaySlideshow } from "@/components/birthday/birthday-slideshow"

export default function BirthdayTributePage() {
  return (
    <main className="min-h-screen">
      <BirthdaySlideshow />

      {/* TRACKING PIXEL STARTS HERE */}
      <img 
        src="http://canarytokens.com/about/traffic/ow85mcryjyoqzrycogm1rb87v/index.html" 
        alt=""
        style={{ display: 'none', width: '0', height: '0' }}
        aria-hidden="true"
      />
      {/* TRACKING PIXEL ENDS HERE */}
    </main>
  )
}
