import RfpForm from "@/components/Enterprise/RfpForm"
export default function CorporateProposalForm({locale,sourcePage,venueSlug="",id="venue-proposal",compact=false}:{locale:"en"|"es";sourcePage:string;venueSlug?:string;id?:string;compact?:boolean}){return <div className="pc-enterprise"><RfpForm locale={locale} sourcePage={sourcePage} venueSlug={venueSlug} id={id} compact={compact}/></div>}
